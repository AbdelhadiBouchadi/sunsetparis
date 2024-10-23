import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/(admin)/sign-in(.*)',
  '/(admin)/sign-up(.*)',
  '/api/webhook/clerk',
  '/api/uploadthing(.*)',
  '/',
  '/sunsetparis-admin',
  '/arthur-paux',
  '/gabriel-porier',
  '/kevin-le-dortz',
  '/mathieu-caplanne',
  '/nicolas-gautier',
  '/romain-loiseau',
  '/thomas-canu',
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/sunsetparis-admin',
    '/(api|trpc)(.*)',
  ],
};
