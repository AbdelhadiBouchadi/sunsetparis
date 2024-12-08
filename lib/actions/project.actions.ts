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

export const createProject = async (project: CreateProjectParams) => {
  try {
    await connectToDatabase();

    const newProject = await Project.create({
      ...project,
    });

    revalidatePath('/sunsetparis-admin');
    revalidatePath('/arthur-paux');
    revalidatePath('/gabriel-porier');
    revalidatePath('/kevin-le-dortz');
    revalidatePath('/mathieu-caplanne');
    revalidatePath('/nicolas-gautier');
    revalidatePath('/romain-loiseau');
    revalidatePath('/thomas-canu');
    return parseStringify(newProject);
  } catch (error) {
    console.error('Error creating a new project', error);
    handleError(error);
  }
};

export async function updateProject(
  projectId: string,
  projectData: any,
  currentOrder: number
) {
  try {
    await connectToDatabase();

    const session = await Project.startSession();
    let updatedProject;

    await session.withTransaction(async () => {
      const projectToUpdate = await Project.findById(projectId).session(
        session
      );
      if (!projectToUpdate) {
        throw new Error('Project not found');
      }

      const newOrder = projectData.order;

      if (newOrder !== currentOrder) {
        // Find all projects by the same artist
        const artistProjects = await Project.find({
          artist: projectData.artist,
          _id: { $ne: projectId },
        }).session(session);

        // Adjust orders
        if (newOrder > currentOrder) {
          // Moving down the list
          for (let project of artistProjects) {
            if (project.order > currentOrder && project.order <= newOrder) {
              project.order--;
              await project.save({ session });
            }
          }
        } else {
          // Moving up the list
          for (let project of artistProjects) {
            if (project.order >= newOrder && project.order < currentOrder) {
              project.order++;
              await project.save({ session });
            }
          }
        }
      }

      // Update the current project
      updatedProject = await Project.findByIdAndUpdate(projectId, projectData, {
        new: true,
        session,
      });
    });

    await session.endSession();

    return JSON.parse(JSON.stringify(updatedProject));
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

export const deleteProject = async ({ projectId }: DeleteProjectParams) => {
  try {
    await connectToDatabase();

    const deletedProject = await Project.findByIdAndDelete(projectId);
    if (deletedProject) {
      revalidatePath('/sunsetparis-admin');
      revalidatePath('/');
    }
  } catch (error) {
    handleError(error);
  }
};

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
