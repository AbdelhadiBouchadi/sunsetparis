import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogIn, ShieldX } from 'lucide-react';
import Link from 'next/link';

export function UnauthorizedAccess() {
  return (
    <div className="w-full flex justify-center items-center">
      <Card className="w-[80%] max-w-md bg-dark-300 border-red-700">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-2">
            <ShieldX className="size-10" color="Red" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-700">
            You Are Not An Admin
          </CardTitle>
          <CardDescription>
            Our Team has checked your current status, unfortunately you are not
            allowed to access this page. Please feel free to browse our website
            content as a visitor. Thank you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            asChild
            className="w-full bg-red-700 bg-gradient-to-b hover:from-[#FCBB54] hover:via-[#FB65A4] hover:to-[#A67DD2]"
          >
            <Link href="/" className="flex items-center justify-center gap-2">
              <LogIn className="w-4 h-4" />
              Go Back
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
