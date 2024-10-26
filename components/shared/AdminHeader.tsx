import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

const AdminHeader = () => {
  return (
    <div>
      <header className="admin-header mt-8 ">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/logo.png"
            height={80}
            width={120}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Button
            asChild
            className="py-2 px-4  hover:text-transparent bg-clip-text bg-gradient-to-t from-[#FCBB54] via-[#FB65A4] to-[#A67DD2] transition duration-300"
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </SignedOut>
      </header>
    </div>
  );
};

export default AdminHeader;
