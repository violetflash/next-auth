import {
  AUTH_ERROR_ROUTE, DEFAULT_LOGIN_REDIRECT,
  DEFAULT_ROOT_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  VERIFICATION_ROUTE
} from '@/lib/routes-constants';

/**
 * An array of public routes.
 * These routes are accessible without authentication
 * @type {string[]}
 * **/
export const publicRoutes = [
  DEFAULT_ROOT_ROUTE,
  VERIFICATION_ROUTE
];

/**
 * An array of authentication routes. These routes are used for authentication.
 * These routes will redirect logged users to /settings
 * @type {string[]}
 **/
export const authRoutes: string[] = [
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  AUTH_ERROR_ROUTE
]

/**
 * An array of protected routes.
 * These routes are accessible with authentication
 * @type {string[]}
 */
export const protectedRoutes = [
  DEFAULT_LOGIN_REDIRECT
];
