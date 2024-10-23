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

export const createProject = async (project: CreateProjectParams) => {
  try {
    await connectToDatabase();

    const newProject = await Project.create({
      ...project,
    });

    revalidatePath('/sunsetparis-admin');
    return parseStringify(newProject);
  } catch (error) {
    console.error('Error creating a new project', error);
    handleError(error);
  }
};

export const updateProject = async (project: UpdateProjectParams) => {
  try {
    await connectToDatabase();

    const projectToUpdate = await Project.findById(project._id);
    if (!projectToUpdate) {
      throw new Error('Project not found');
    }

    const updatedProject = await Project.findByIdAndUpdate(
      project._id,
      { ...project },
      { new: true }
    );

    revalidatePath('/sunsetparis-admin');
    return parseStringify(updatedProject);
  } catch (error) {
    console.error('Error updating the project', error);
    handleError(error);
  }
};

export const deleteProject = async ({ projectId }: DeleteProjectParams) => {
  try {
    await connectToDatabase();

    const deletedProject = await Project.findByIdAndDelete(projectId);
    if (deletedProject) revalidatePath('/sunsetparis-admin');
  } catch (error) {
    handleError(error);
  }
};

export async function getAllProjects(): Promise<IProject[]> {
  try {
    await connectToDatabase();

    // Fetch all projects as Project documents
    const projects = await Project.find().sort({ createdAt: 'desc' });

    return projects.map((project) => {
      return {
        ...project.toObject(), // Convert to plain object
        _id: project._id.toString(), // Convert _id to string
        createdAt: project.createdAt.toISOString(), // Convert createdAt to string
      } as IProject;
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }
}

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

// Helper function to fetch projects by category
const getProjectsByArtist = async (artist: string) => {
  try {
    await connectToDatabase();

    const projects = await Project.find({ artist }).exec();
    return parseStringify(projects);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch projects');
  }
};

// Arthur Paux Projects
const getArthurProjects = async () => {
  return getProjectsByArtist('arthur paux');
};

// Gabriel Porier
const getGabrielProjects = async () => {
  return getProjectsByArtist('gabriel porier');
};

// Kevin Projects
const getKevinProjects = async () => {
  return getProjectsByArtist('kevin le dortz');
};

// Nicolas Gautier
const getNicolasProjects = async () => {
  return getProjectsByArtist('nicolas gautier');
};

// Romain Projects
const getRomainProjects = async () => {
  return getProjectsByArtist('romain loiseau');
};

// Thomas Projects
const getThomasProjects = async () => {
  return getProjectsByArtist('thomas canu');
};
