/**
 * The default root route.
 * @type {string}
 */
export const DEFAULT_ROOT_ROUTE = "/";

/**
 * The route for login. This route is used for login purposes.
 * @type {string}
 */
export const LOGIN_ROUTE: string = "/auth/login";

/**
 * The route for settings. This route is available only for authenticated users.
 * @type {string}
 */
export const SETTINGS_ROUTE: string = "/settings";

/**
 * The route for register. This route is used for register purposes.
 * @type {string}
 */
export const REGISTER_ROUTE = "/auth/register";

/**
 * The default redirect path after successful login.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = SETTINGS_ROUTE;

/**
 * An array of public routes.
 * These routes are accessible without authentication
 * @type {string[]}
 * **/
export const publicRoutes = [
  DEFAULT_ROOT_ROUTE
];

/**
 * An array of authentication routes. These routes are used for authentication.
 * These routes will redirect logged users to /settings
 * @type {string[]}
 **/
export const authRoutes: string[] = [
  LOGIN_ROUTE,
  REGISTER_ROUTE
]

/**
 * An array of protected routes.
 * These routes are accessible with authentication
 * @type {string[]}
 */
export const protectedRoutes = [
  DEFAULT_LOGIN_REDIRECT
];

/**
 * The prefix of the API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";