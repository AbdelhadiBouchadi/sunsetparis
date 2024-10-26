import React from 'react';
import AdminHeader from '@/components/shared/AdminHeader';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col space-y-14">
      <AdminHeader />
      {children}
    </div>
  );
};

export default Layout;
