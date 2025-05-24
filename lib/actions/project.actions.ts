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

    // Increment all existing projects' order by 1
    await Project.updateMany(
      { artist: project.artist },
      { $inc: { order: 1 } }
    );

    // Create new project with order 1
    const newProject = await Project.create({
      ...project,
      order: 1, // Always set new projects to order 1
      thumbnailIndex:
        typeof project.thumbnailIndex === 'number' ? project.thumbnailIndex : 0,
    });

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

    const existingProject = await Project.findById(projectId);
    if (!existingProject) throw new Error('Project not found');

    // If no order change, just update the project normally
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { ...project },
      { new: true }
    );

    if (!updatedProject) throw new Error('Project update failed');

    revalidatePath('/sunsetparis-admin');
    revalidatePath('/');

    return JSON.parse(JSON.stringify(updatedProject));
  } catch (error) {
    handleError(error);
    throw error; // Re-throw to allow the client to handle it
  }
}

export async function updateProjectsOrder(
  projects: { _id: string; order: number }[]
) {
  try {
    await connectToDatabase();

    console.log('[updateProjectsOrder] Incoming reorder payload:', projects);

    const bulkOps = projects.map((project) => ({
      updateOne: {
        filter: { _id: project._id },
        update: { $set: { order: project.order } },
      },
    }));

    console.log('[updateProjectsOrder] Prepared bulk operations:', bulkOps);

    if (bulkOps.length > 0) {
      const result = await Project.bulkWrite(bulkOps);
      console.log('[updateProjectsOrder] Bulk write result:', result);
      revalidatePath('/sunsetparis-admin');
      revalidatePath('/');
    }

    return { success: true };
  } catch (error) {
    console.error('[updateProjectsOrder] ERROR:', error);
    throw new Error('Failed to update project order');
  }
}

/**
 * Helper function to normalize project order
 * This ensures all projects have sequential ordering without gaps
 */
export async function normalizeProjectOrder(artist: string) {
  try {
    await connectToDatabase();

    // Get all projects for the artist, sorted by current order
    const projects = await Project.find({ artist }).sort({ order: 1 });

    // Create bulk write operations for updating orders sequentially
    const bulkOps = projects.map((project, index) => ({
      updateOne: {
        filter: { _id: project._id },
        update: { $set: { order: index + 1 } },
      },
    }));

    if (bulkOps.length > 0) {
      await Project.bulkWrite(bulkOps);
      revalidatePath('/sunsetparis-admin');
      revalidatePath('/');
    }

    return { success: true, message: 'Project order normalized' };
  } catch (error) {
    console.error('Error normalizing project order:', error);
    throw error;
  }
}

export async function deleteProject(projectId: string) {
  try {
    await connectToDatabase();

    // First, get the project to be deleted
    const projectToDelete = await Project.findById(projectId);
    if (!projectToDelete) throw new Error('Project not found');

    const { artist, order } = projectToDelete;

    // Delete the project
    await Project.findByIdAndDelete(projectId);

    // Decrease order of all projects that came after the deleted one
    await Project.updateMany(
      { artist, order: { $gt: order } },
      { $inc: { order: -1 } }
    );

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
      order: 'desc',
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

// Artist visibility toggle
export const toggleArtistVisibility = async (artist: string) => {
  try {
    await connectToDatabase();

    // Get one project to check current visibility state
    const sampleProject = await Project.findOne({ artist });
    if (!sampleProject) throw new Error('No projects found for this artist');

    // Toggle visibility for all projects of this artist
    const newVisibilityState = !sampleProject.artistIsHidden;
    await Project.updateMany(
      { artist },
      { $set: { artistIsHidden: newVisibilityState } }
    );

    revalidatePath('/sunsetparis-admin');
    revalidatePath('/');
    return { success: true, isHidden: newVisibilityState };
  } catch (error) {
    console.error('Error toggling artist visibility:', error);
    throw error;
  }
};
