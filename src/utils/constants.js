import * as yup from 'yup'

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
  GITHUB: 'github',
  CREDENTIAL: 'credential',
}

export const API_PATHS = {
  GOOGLE_SIGN_UP: '/auth/google',
  GOOGLE_SIGN_IN: '/auth/google',

  GITHUB_SIGN_UP: '/auth/github',
  GITHUB_SIGN_IN: '/auth/github',

  AUTH_SIGN_OUT: '/auth/logout',
  PROFILE: '/auth/profile',
  USERS_LIST: '/user',

  SIGN_UP: '/auth/sign-up',
  SIGN_IN: '/auth/sign-in',

  USER_UPDATE: '/user',
  PASSWORD_UPDATE: '/auth/password-update',
  NEW_TOKEN: '/auth/new_access',
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
  USERS: {
    link: '/users',
    label: 'Users',
  },
  OAUTH_REDIRECT: {
    link: '/oauth_redirect',
    label: 'Forgot Password',
  },
  FORGOT_PASSWORD: {
    link: '/forgot_password',
    label: 'Forgot Password',
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
  },
  {
    link: '/users',
    label: 'Users',
    protection: {
      roles: [USER_ROLES.ADMIN],
    },
  },
]

export const FormSchemas = {
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'At least 1 uppercase letter is required')
    .matches(/[a-z]/, 'At least 1 lowercase letter is required')
    .matches(/\d/, 'At least 1 number is required')
    .matches(/[\W_]/, 'At least 1 special character is required')
    .required('Password is required'),
}
