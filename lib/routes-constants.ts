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

export const AUTH_ERROR_ROUTE: string = "/auth/error";

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
export const VERIFICATION_ROUTE = "/auth/new-verification";

/**
 * The prefix of the API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";
export const RESET_PASSWORD_ROUTE = "/auth/reset";
export const NEW_PASSWORD_ROUTE = "/auth/new-password";