import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <main className="auth py-16 min-h-screen">{children}</main>;
};

export default Layout;
