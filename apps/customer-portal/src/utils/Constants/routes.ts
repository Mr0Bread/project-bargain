export const MY_ACCOUNT_PREFIX = '/my-account'

export const MY_ACCOUNT_ROUTES = {
  PERSONAL_DETAILS: `${MY_ACCOUNT_PREFIX}/personal-details`,
  SETTINGS: `${MY_ACCOUNT_PREFIX}/settings`,
  APPLICATIONS: `${MY_ACCOUNT_PREFIX}/applications`,
  APPLICATION: `${MY_ACCOUNT_PREFIX}/applications/:id`,
  APPLICATION_NEW: `${MY_ACCOUNT_PREFIX}/applications/new`,
}

export const PROTECTED_ROUTES = [
  ...Object.values(MY_ACCOUNT_ROUTES),
]

export const ALL_ROUTES = {
  HOME: '/',
  MY_ACCOUNT: MY_ACCOUNT_ROUTES,
}
