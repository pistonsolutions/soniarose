import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define routes that should be protected (require authentication)
const isProtectedRoute = createRouteMatcher([
    '/crm/dashboard(.*)',
    '/crm/contacts(.*)',
    '/crm/inbox(.*)',
    '/crm/forms(.*)',
    '/crm/workflows(.*)',
    '/crm/media(.*)',
    '/crm/compliance(.*)',
    '/crm/settings(.*)',
]);

// Define routes that should be public (no auth required)
const isPublicRoute = createRouteMatcher([
    '/',
    '/crm',
    '/crm/login(.*)',
    '/about(.*)',
    '/buyers(.*)',
    '/sellers(.*)',
    '/contact(.*)',
    '/blog(.*)',
    '/api/tally/webhook(.*)',
    '/api/telnyx/webhook(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    // Protect CRM authenticated routes
    if (isProtectedRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
