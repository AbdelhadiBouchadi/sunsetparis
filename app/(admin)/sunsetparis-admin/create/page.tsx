import ProjectForm from '@/components/shared/admin/ProjectForm';
import React from 'react';

const CreateProject = () => {
  return (
    <main className="admin-main">
      <section className="w-full space-y-4">
        <h1 className="header text-dark-700">Welcome Again Adélia 👋</h1>
        <p className="text-dark-700">Start creating your new project.</p>
      </section>

      <div className="wrapper my-8 w-full">
        <ProjectForm type="Create" />
      </div>
    </main>
  );
};

export default CreateProject;
