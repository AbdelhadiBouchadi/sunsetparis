import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AdminHeader = () => {
  return (
    <div>
      <header className="admin-header mt-8 ">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/logo.png"
            height={80}
            width={80}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-xl text-gray-300 ">Admin Dashboard</p>
      </header>
    </div>
  );
};

export default AdminHeader;
