'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Link, LogIn, ShieldCheck, UserPlus } from 'lucide-react';
import React from 'react';

const LoginCard = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <Card className="w-[80%] max-w-md bg-dark-300 border-green-700">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto  w-12 h-12 rounded-full flex items-center justify-center mb-2">
            <ShieldCheck className="size-10" color="green" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-700">
            Admin Access Only
          </CardTitle>
          <CardDescription className="">
            This is a page reserved for the Admin of the website. Please sign in
            to continue or sign up if you don't already have an account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/sign-in"
              className={cn(
                'flex items-center justify-center gap-2 w-full bg-green-700 bg-gradient-to-b hover:from-[#FCBB54] hover:via-[#FB65A4] hover:to-[#A67DD2]',
                buttonVariants({ variant: 'secondary' })
              )}
            >
              <p>Sign In</p>
            </Link>
            <Button
              asChild
              className="w-full bg-gray-300 hover:bg-green-700 text-green-700 hover:text-gray-100"
            >
              <Link
                href="/sign-up"
                className="flex items-center justify-center gap-2  z-10"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginCard;
