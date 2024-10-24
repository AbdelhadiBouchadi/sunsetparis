import { getUserById } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';
import { LogIn, ShieldX, User } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { getAllProjects } from '@/lib/actions/project.actions';
import { DataTable } from './DataTable';
import columns from './columns';
import { StatCard } from './StatCard';
import { cn } from '@/lib/utils';

const AdminPage = async () => {
  const activeUser = await currentUser();

  if (!activeUser) {
    redirect('/sign-in');
    return null; // Ensure no component renders if redirecting
  }

  const currentUserFromDb = await getUserById(activeUser.id);
  const isAdmin = currentUserFromDb.isAdmin;

  if (!currentUserFromDb) {
    redirect('/sign-in');
    return null;
  }

  const projects = await getAllProjects();

  const projectCounts = projects.reduce(
    (counts, project) => {
      if (counts[project.artist] !== undefined) {
        counts[project.artist]++;
      }
      return counts;
    },
    {
      'arthur paux': 0,
      'gabriel porier': 0,
      'kevin le dortz': 0,
      'mathieu caplanne': 0,
      'nicolas gautier': 0,
      'romain loiseau': 0,
      'thomas canu': 0,
    }
  );

  return (
    <>
      {isAdmin ? (
        <main className="p-8 w-full mx-auto">
          <section className="mb-8">
            <h1 className="text-3xl font-bold text-zinc-100 mb-2">
              Welcome 👋
            </h1>
            <p className="text-zinc-400">
              Start the day with managing new projects.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            <StatCard
              type="arthur paux"
              count={projectCounts['arthur paux']}
              label="Arthur Paux"
              icon={User}
            />
            <StatCard
              type="gabriel porier"
              count={projectCounts['gabriel porier']}
              label="Gabriel Porier"
              icon={User}
            />
            <StatCard
              type="kevin le dortz"
              count={projectCounts['kevin le dortz']}
              label="Kevin Le Dortz"
              icon={User}
            />
            <StatCard
              type="mathieu caplanne"
              count={projectCounts['mathieu caplanne']}
              label="Mathieu Caplanne"
              icon={User}
            />
            <StatCard
              type="nicolas gautier"
              count={projectCounts['nicolas gautier']}
              label="Nicolas Gautier"
              icon={User}
            />
            <StatCard
              type="romain loiseau"
              count={projectCounts['romain loiseau']}
              label="Romain Loiseau"
              icon={User}
            />
            <StatCard
              type="thomas canu"
              count={projectCounts['thomas canu']}
              label="Thomas Canu"
              icon={User}
            />
          </section>

          <div className="space-y-6">
            <DataTable columns={columns} data={projects} />

            <Link
              href="/sunsetparis-admin/create"
              className={cn(
                'inline-flex items-center justify-center w-full py-3 px-4 rounded-lg bg-green-700 hover:bg-green-400 text-white font-medium transition-colors',
                buttonVariants({ variant: 'link' })
              )}
            >
              Create a new project
            </Link>
          </div>
        </main>
      ) : (
        <div className="w-[80%] flex justify-center items-center ">
          <Card className="w-full max-w-md bg-dark-300 border-red-700">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto  w-12 h-12 rounded-full flex items-center justify-center mb-2">
                <ShieldX className="size-10 " color="Red" />
              </div>
              <CardTitle className="text-2xl font-bold text-red-700">
                You Are Not An Admin
              </CardTitle>
              <CardDescription className="">
                Our Team has checked your current status , unfortunately you are
                not allowed to access this page . Please feel free to browse our
                website content as a visitor. Thank you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                asChild
                className="w-full bg-red-700 bg-gradient-to-b hover:from-[#FCBB54] hover:via-[#FB65A4] hover:to-[#A67DD2]"
              >
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Go Back
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default AdminPage;
