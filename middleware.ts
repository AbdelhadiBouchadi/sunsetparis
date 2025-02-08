import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { getAllProjects } from '@/lib/actions/project.actions';

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

export default clerkMiddleware(async (auth, request) => {
  try {
    // Get all projects to check artist visibility
    const projects = await getAllProjects();

    // Create a map of artist visibility status
    const artistVisibility = projects.reduce(
      (acc: Record<string, boolean>, project) => {
        if (!acc.hasOwnProperty(project.artist)) {
          // If artist has no visibility status yet, set it based on the first project
          acc[project.artist] = !project.artistIsHidden;
        }
        return acc;
      },
      {}
    );

    // Convert artist paths to visibility-aware routes
    const artistRoutes = [
      { path: '/arthur-paux', artist: 'arthur paux' },
      { path: '/gabriel-porier', artist: 'gabriel porier' },
      { path: '/kevin-le-dortz', artist: 'kevin le dortz' },
      { path: '/mathieu-caplanne', artist: 'mathieu caplanne' },
      { path: '/nicolas-gautier', artist: 'nicolas gautier' },
      { path: '/romain-loiseau', artist: 'romain loiseau' },
      { path: '/thomas-canu', artist: 'thomas canu' },
      { path: '/evy-roselet', artist: 'evy roselet' },
      { path: '/salman-laudier', artist: 'salman laudier' },
    ];

    // Build dynamic public routes based on artist visibility
    const publicRoutes = [
      ...basePublicRoutes,
      ...artistRoutes
        .filter(({ artist }) => artistVisibility[artist])
        .map(({ path }) => path),
    ];

    const isPublicRoute = createRouteMatcher(publicRoutes);

    if (!isPublicRoute(request)) {
      auth().protect();
    }
  } catch (error) {
    console.error('Error in middleware:', error);
    // If there's an error, default to protecting the route
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
