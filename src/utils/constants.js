export const MOBILE_VIEW_WIDTH = 800
export const P_BG = '#022a70'

export const LAYOUT = {
  STATIC: 'STATIC',
  USER: 'USER',
}

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
}

export const AUTH_PROVIDERS = {
  GOOGLE: 'google',
  JWT: 'jwt',
}

export const API_PATHS = {
  GOOGLE_SIGN_UP: '/auth/google',
  GOOGLE_SIGN_IN: '/auth/google',

  GITHUB_SIGN_UP: '/auth/google',
  GITHUB_SIGN_IN: '/auth/google',

  AUTH_SIGN_OUT: '/auth/logout',
  PROFILE: '/auth/profile',
  USERS_LIST: '/user',

  SIGN_UP: '/auth/sign-up',
  SIGN_IN: '/auth/sign-in',

  USER_UPDATE: '/user',
  PASSWORD_UPDATE: '/auth/password-update'
}

export const ROUTES = {
  HOME: {
    link: '/',
    label: 'Home',
  },
  SIGN_IN: {
    link: '/sign-in',
    label: 'Sign In',
  },
  SIGN_UP: {
    link: '/sign-up',
    label: 'Sign Up',
  },
  PROFILE: {
    link: '/profile',
    label: 'Profile',
  },
}

export const NAV_LIST = [
  {
    link: '/',
    label: 'Home',
  },
  {
    link: '/profile',
    label: 'Profile',
    protection: {
      roles: [USER_ROLES.ADMIN, USER_ROLES.USER]
    }
  },
  {
    link: '/users',
    label: 'Users',
    protection: {
      roles: [USER_ROLES.ADMIN]
    }
  },
]

export const epochStandard = (epochTime) => {
  if (epochTime.toString().length === 13) {
    return Math.floor(epochTime / 1000);
  }
  return epochTime;
};