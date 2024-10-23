import React from 'react';
import AdminHeader from '@/components/shared/AdminHeader';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex  flex-col space-y-14 bg-dark-300 min-h-screen">
      <AdminHeader />
      {children}
    </div>
  );
};

export default Layout;
