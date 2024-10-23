import ProjectForm from '@/components/shared/admin/ProjectForm';
import { getProjectById } from '@/lib/actions/project.actions';
import React from 'react';

type UpdateProjectProps = {
  params: {
    projectId: string;
  };
};

const UpdateProject = async ({ params: { projectId } }: UpdateProjectProps) => {
  const project = await getProjectById(projectId);

  return (
    <main className="admin-main">
      <section className="w-full space-y-4">
        <h1 className="header text-dark-700">Welcome Again Adélia 👋</h1>
        <p className="text-dark-700">Start editing your project.</p>
      </section>

      <div className="wrapper my-8 w-full">
        <ProjectForm type="Update" projectId={project._id} project={project} />
      </div>
    </main>
  );
};

export default UpdateProject;
