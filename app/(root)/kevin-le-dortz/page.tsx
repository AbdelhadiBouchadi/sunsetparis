import { AccessDenied } from '@/components/shared/admin/users/AccessDenied';
import PageHeader from '@/components/shared/PageHeader';
import ProjectsGrid from '@/components/shared/ProjectsGrid';
import { getKevinProjects } from '@/lib/actions/project.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { canViewHiddenContent } from '@/lib/permissions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
  const projects = await getKevinProjects();

  // Check if artist should be hidden
  const isHidden = projects.length === 0 ? true : projects[0].artistIsHidden;

  // If artist is hidden, check authentication
  if (isHidden) {
    const user = await currentUser();
    if (!user) {
      redirect('/sign-in');
    }

    const currentUserFromDb = await getUserById(user.id);

    if (!currentUserFromDb) {
      redirect('/sign-in');
    }

    if (!canViewHiddenContent(currentUserFromDb)) {
      return <AccessDenied />;
    }
  }

  return (
    <>
      <PageHeader artistName="Kevin Le Dortz" />
      <ProjectsGrid projects={projects} />
    </>
  );
};

export default page;
