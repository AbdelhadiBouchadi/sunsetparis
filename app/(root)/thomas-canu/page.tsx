import { UnauthorizedAccess } from '@/components/shared/admin/UnauthorizedAccess';
import PageHeader from '@/components/shared/PageHeader';
import ProjectsGrid from '@/components/shared/ProjectsGrid';
import { getThomasProjects } from '@/lib/actions/project.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
  const projects = await getThomasProjects();

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
      return null;
    }

    if (!currentUserFromDb.isAdmin) {
      return <UnauthorizedAccess />;
    }
  }

  return (
    <>
      <PageHeader artistName="Thomas Canu" />
      <ProjectsGrid projects={projects} />
    </>
  );
};

export default page;
