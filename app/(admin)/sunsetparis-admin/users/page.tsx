import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { getUserById, getAllUsers } from '@/lib/actions/user.actions';
import { UnauthorizedAccess } from '@/components/shared/admin/UnauthorizedAccess';
import { hasAdminAccess } from '@/lib/permissions';
import { UsersTable } from '@/components/shared/admin/users/UsersTable';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function UsersPage() {
  // Check authentication and admin access
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }

  const currentUserFromDb = await getUserById(user.id);
  if (!currentUserFromDb) {
    redirect('/sign-in');
  }

  // Only admins can access user management
  if (!hasAdminAccess(currentUserFromDb)) {
    return <UnauthorizedAccess />;
  }

  // Fetch all users
  const users = await getAllUsers();

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-col items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">
          Manage user accounts and permissions
        </p>
      </div>

      <UsersTable users={users || []} />
    </div>
  );
}
