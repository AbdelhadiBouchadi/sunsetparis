import { getUserById } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getAllProjects } from '@/lib/actions/project.actions';
import { UnauthorizedAccess } from '@/components/shared/admin/UnauthorizedAccess';
import { AdminDashboard } from '@/components/shared/admin/AdminPage';

export default async function AdminPage() {
  const activeUser = await currentUser();

  if (!activeUser) {
    redirect('/sign-in');
    return null;
  }

  const currentUserFromDb = await getUserById(activeUser.id);

  if (!currentUserFromDb) {
    redirect('/sign-in');
    return null;
  }

  if (!currentUserFromDb.isAdmin) {
    return <UnauthorizedAccess />;
  }

  const projects = await getAllProjects();

  return <AdminDashboard projects={projects} />;
}
