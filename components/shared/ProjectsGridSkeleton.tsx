import React from 'react';

const ProjectSkeleton = () => (
  <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 animate-pulse overflow-hidden">
    <div className="w-full h-full flex flex-col justify-end p-4 2xl:p-12">
      <div className="w-3/4 h-6 bg-gray-300 dark:bg-gray-600 mb-2"></div>
      <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-600"></div>
    </div>
  </div>
);

const ProjectsGridSkeleton = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 mx-auto pb-16 mt-8">
      {[...Array(6)].map((_, index) => (
        <ProjectSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProjectsGridSkeleton;
