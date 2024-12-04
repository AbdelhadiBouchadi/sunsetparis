/* eslint-disable no-unused-vars */

import { z } from 'zod';

export const VideoSourceType = z.enum(['vimeo', 'youtube', 'direct']);
export type VideoSourceTypeEnum = z.infer<typeof VideoSourceType>;

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== PROJECT PARAMS
export interface CreateProjectParams {
  title: string;
  description?: string;
  artist:
    | 'arthur paux'
    | 'gabriel porier'
    | 'kevin le dortz'
    | 'mathieu caplanne'
    | 'nicolas gautier'
    | 'romain loiseau'
    | 'thomas canu';
  imageUrl: string;
  videoSource?: string;
  place?: string;
  date?: string;
  real: string;
  dop: string;
}

export interface UpdateProjectParams {
  _id: string;
  title: string;
  description?: string;
  artist:
    | 'arthur paux'
    | 'gabriel porier'
    | 'kevin le dortz'
    | 'mathieu caplanne'
    | 'nicolas gautier'
    | 'romain loiseau'
    | 'thomas canu';
  imageUrl: string;
  videoSource?: string;
  place?: string;
  date?: string;
  real: string;
  dop: string;
}

export interface DeleteProjectParams {
  projectId: string;
}

export interface VideoSourceData {
  type: VideoSourceTypeEnum;
  url: string;
  originalUrl: string;
}
