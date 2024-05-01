import authConfig from '@/auth.config';
import { apiAuthPrefix, DEFAULT_LOGIN_REDIRECT, LOGIN_ROUTE } from '@/lib/routes-constants';
import { authRoutes, publicRoutes, } from "@/routes";
import NextAuth from "next-auth";

export const { auth } = NextAuth(authConfig)

// Middleware that runs on every request
export default auth((req) => {
  // we want to know is the user is admin or not here inside the middleware
  const { nextUrl } = req; // nextUrl is the base url to create an absolute url
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // order of all of this "if" clauses is important

  if (isApiAuthRoute) {
    // allow every single api auth route
    // e.g. localhost:3000/api/auth/providers.
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      // if the user is already logged in and trying to access an auth route
      // -> redirect him to the default redirect path instead of
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)); // second param is the base url to create an absolute url
    }
    return;
  }

  if (!isPublicRoute && !isLoggedIn) {

    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    // if the user is not logged in and trying to access a public route
    // -> redirect him to the login page
    return Response.redirect(new URL(
      `${LOGIN_ROUTE}?callbackUrl=${encodedCallbackUrl}`,
      nextUrl
    )); // second param is the base url to create an absolute url
  }

  return;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  // every single rout except from this matcher will invoke the middleware
  // matcher from clerk docs (https://clerk.com/docs/quickstarts/nextjs)
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)"
  ]
};