import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Base public routes that are always accessible
const basePublicRoutes = [
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/(admin)/sign-in(.*)',
  '/(admin)/sign-up(.*)',
  '/api/webhook/clerk',
  '/api/uploadthing(.*)',
  '/',
  '/sunsetparis-admin',
];

// Define artist routes
const artistRoutes = [
  '/arthur-paux',
  '/gabriel-porier',
  '/kevin-le-dortz',
  '/mathieu-caplanne',
  '/nicolas-gautier',
  '/romain-loiseau',
  '/thomas-canu',
  '/evy-roselet',
  '/salman-laudier',
];

// Combine all public routes
const publicRoutes = [...basePublicRoutes, ...artistRoutes];

export default clerkMiddleware((auth, request) => {
  const isPublicRoute = createRouteMatcher(publicRoutes);

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
