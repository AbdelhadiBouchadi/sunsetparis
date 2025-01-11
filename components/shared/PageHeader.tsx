import React from 'react';

const PageHeader = ({ artistName }: { artistName: string }) => {
  return (
    <div className="z-40 py-5 md:py-8 h-full w-full flex justify-center items-center mb-8">
      <h1 className=" text-2xl lg:text-4xl font-light text-center uppercase text-transparent bg-clip-text bg-gradient-to-t from-[#FCBB54] via-[#FB65A4] to-[#A67DD2] tracking-tighter">
        {artistName}
      </h1>
    </div>
  );
};

export default PageHeader;
