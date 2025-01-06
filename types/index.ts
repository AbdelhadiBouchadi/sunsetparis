/* eslint-disable no-unused-vars */

import { z } from 'zod';

export const VideoSourceType = z.enum(['vimeo', 'youtube', 'direct']);
export type VideoSourceTypeEnum = z.infer<typeof VideoSourceType>;

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type TextColor = 'black' | 'white';

export type Artist =
  | 'arthur paux'
  | 'gabriel porier'
  | 'kevin le dortz'
  | 'mathieu caplanne'
  | 'nicolas gautier'
  | 'romain loiseau'
  | 'thomas canu';

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

export interface IProjectForm {
  title: string;
  artist: Artist;
  images: string[];
  real: string;
  description?: string;
  videoSource?: string;
  place?: string;
  date?: string;
  dop: string;
  order: number;
  textColor: TextColor;
}

// ====== PROJECT PARAMS
export interface CreateProjectParams {
  title: string;
  description?: string;
  artist: Artist;
  images: string[];
  videoSource?: string;
  place?: string;
  date?: string;
  real: string;
  order: number;
  dop: string;
  textColor: TextColor;
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
  images: string[];
  videoSource?: string;
  place?: string;
  date?: string;
  real: string;
  order: number;
  dop: string;
  textColor: TextColor;
}

export interface DeleteProjectParams {
  projectId: string;
}

export interface VideoSourceData {
  type: VideoSourceTypeEnum;
  url: string;
  originalUrl: string;
}
