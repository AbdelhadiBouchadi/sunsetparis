'use server';

import {
  CreateProjectParams,
  DeleteProjectParams,
  UpdateProjectParams,
} from '@/types';
import { connectToDatabase } from '../database';
import Project, { IProject } from '../database/models/project.model';
import { revalidatePath } from 'next/cache';
import { handleError, parseStringify } from '../utils';

export const getProjectCountByArtist = async (artist: string) => {
  try {
    await connectToDatabase();
    const count = await Project.countDocuments({ artist });
    return count;
  } catch (error) {
    console.error('Error getting project count:', error);
    return 1; // Default to 1 if there's an error
  }
};

export async function createProject(project: CreateProjectParams) {
  try {
    await connectToDatabase();

    const lastProject = await Project.findOne({ artist: project.artist })
      .sort({ order: -1 })
      .exec();

    const newProject = await Project.create({
      ...project,
      order: lastProject ? lastProject.order + 1 : 1,
      thumbnailIndex:
        typeof project.thumbnailIndex === 'number' ? project.thumbnailIndex : 0,
    });

    // Normalize order numbers after creation
    await normalizeProjectOrder(project.artist);

    revalidatePath('/sunsetparis-admin');
    revalidatePath('/');

    return JSON.parse(JSON.stringify(newProject));
  } catch (error) {
    handleError(error);
  }
}

export async function updateProject(
  projectId: string,
  project: UpdateProjectParams,
  oldOrder?: number
) {
  try {
    await connectToDatabase();

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        ...project,
        thumbnailIndex:
          typeof project.thumbnailIndex === 'number'
            ? project.thumbnailIndex
            : 0,
      },
      { new: true }
    );

    if (!updatedProject) throw new Error('Project update failed');

    // If order changed, normalize all projects' order
    if (oldOrder && oldOrder !== project.order) {
      await normalizeProjectOrder(project.artist);
    }

    revalidatePath('/sunsetparis-admin');
    revalidatePath('/');

    return JSON.parse(JSON.stringify(updatedProject));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteProject(projectId: string) {
  try {
    await connectToDatabase();

    // First, get the project to be deleted
    const projectToDelete = await Project.findById(projectId);
    if (!projectToDelete) throw new Error('Project not found');

    const { artist } = projectToDelete;

    // Delete the project
    await Project.findByIdAndDelete(projectId);

    // Normalize order numbers after deletion
    await normalizeProjectOrder(artist);

    revalidatePath('/sunsetparis-admin');
    revalidatePath('/');

    return { success: true };
  } catch (error) {
    handleError(error);
  }
}

export async function getAllProjects(): Promise<IProject[]> {
  try {
    await connectToDatabase();

    const projects = await Project.find().sort({
      order: 'asc',
      createdAt: 'desc',
    });

    return projects.map((project) => {
      return {
        ...project.toObject(),
        _id: project._id.toString(),
        createdAt: project.createdAt.toISOString(),
      } as IProject;
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
}

async function normalizeProjectOrder(artist: string) {
  try {
    // Get all projects for the artist, sorted by current order
    const projects = await Project.find({ artist }).sort({ order: 1 });

    // Create an array of update operations
    const updates = projects.map((project, index) => ({
      updateOne: {
        filter: { _id: project._id },
        update: { $set: { order: index + 1 } },
        // Add upsert false to prevent creating new documents
        upsert: false,
      },
    }));

    if (updates.length > 0) {
      // Use ordered: false to continue processing even if one update fails
      await Project.bulkWrite(updates, { ordered: false });

      // Verify the updates
      const verifyProjects = await Project.find({ artist }).sort({ order: 1 });
      const hasIssues = verifyProjects.some(
        (project, index) => project.order !== index + 1
      );

      if (hasIssues) {
        // If there are still issues, try one more time with a simpler approach
        for (let i = 0; i < verifyProjects.length; i++) {
          await Project.findByIdAndUpdate(verifyProjects[i]._id, {
            $set: { order: i + 1 },
          });
        }
      }
    }
  } catch (error) {
    console.error('Error normalizing project order:', error);
    throw error;
  }
}

// Helper function to fetch projects by category with ordering
const getProjectsByArtist = async (artist: string) => {
  try {
    await connectToDatabase();

    const projects = await Project.find({ artist })
      .sort({ order: 'asc', createdAt: 'desc' })
      .exec();
    return parseStringify(projects);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch projects');
  }
};

export const getProjectById = async (id: string) => {
  try {
    await connectToDatabase();

    const project = await Project.findById(id);
    if (!project) {
      throw new Error('Project not found');
    }

    return parseStringify(project);
  } catch (error) {
    throw new Error('Error fetching the specified project');
  }
};

export const toggleProjectHidden = async (projectId: string) => {
  try {
    await connectToDatabase();
    const project = await Project.findById(projectId);
    if (!project) throw new Error('Project not found');

    project.isHidden = !project.isHidden;
    await project.save();

    revalidatePath('/sunsetparis-admin');
    revalidatePath('/');
    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.error('Error toggling project visibility:', error);
    throw error;
  }
};

// Arthur Paux Projects
export const getArthurProjects = async () => {
  return getProjectsByArtist('arthur paux');
};

// Gabriel Porier
export const getGabrielProjects = async () => {
  return getProjectsByArtist('gabriel porier');
};

// Kevin Projects
export const getKevinProjects = async () => {
  return getProjectsByArtist('kevin le dortz');
};

// Kevin Projects
export const getMathieuProjects = async () => {
  return getProjectsByArtist('mathieu caplanne');
};

// Nicolas Gautier
export const getNicolasProjects = async () => {
  return getProjectsByArtist('nicolas gautier');
};

// Romain Projects
export const getRomainProjects = async () => {
  return getProjectsByArtist('romain loiseau');
};

// Thomas Projects
export const getThomasProjects = async () => {
  return getProjectsByArtist('thomas canu');
};

// Abdelhadi Projects
export const getAbdelhadiProjects = async () => {
  return getProjectsByArtist('abdelhadi bouchadi');
};

// Evy Projects
export const getEvyProjects = async () => {
  return getProjectsByArtist('evy roselet');
};

// Salman Projects
export const getSalmanProjects = async () => {
  return getProjectsByArtist('salman laudier');
};
