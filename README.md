<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://skillicons.dev/icons?i=react" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest 'https://skillicons.dev'

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,js,react,redux,github,npm" />
  </a>
</p>
<p align="center">Basic <a href="https://github.com/nestjs/nest" target="_blank">Nest.js</a> service for users authorization and authentication using OAuth protocols.</p>

## Description

This repository features a User Management System developed with React and Redux, providing functionality for user registration, login, and profile management. Built with the React framework and OAuth protocol, the project ensures a modular, scalable architecture and supports OAuth2 for authentication. Social sign-ins are implemented using the OAuth2 protocol, including Sign in with Google and GitHub authentication flows.

## Features

- User Sign-Up.
  - Username and Password
  - Register with Google (<a href="https://www.passportjs.org/packages/passport-google-oauth20" target="_blank">passport-google-oauth20</a>)
  - Register with Github (<a href="https://www.passportjs.org/packages/passport-github2" target="_blank">passport-github2</a>)
- User Sign-In.
  - Username and Password
  - Sign-In with Google (<a href="https://www.passportjs.org/packages/passport-google-oauth20" target="_blank">passport-google-oauth20</a>)
  - Sign-In with Github (<a href="https://www.passportjs.org/packages/passport-github2" target="_blank">passport-github2</a>)
- Access and Refresh Token management using JWT tokens and auto-refresh access tokens.
- Profile Management
  - Edit/update profile
  - Change password
  - Reset Password with email link (<a href="https://nodemailer.com/" target="_blank">Nodemailer</a>)
  - Forgot Password with email link (<a href="https://nodemailer.com/" target="_blank">Nodemailer</a>)
- Admin operations
  - Users list with pagination and search filter
  - Edit user
  - Block user
  - Delete User
  - Change Password

## Installation

- Clone / Download this repository.
```bash
$ git clone <repo-link>
```
- Node version is required as per the .nvmrc file.
```bash
$ nvm use <node_version>
```
- Create a .env file and copy required environment variables from the .env.example
- Run the below command to install all the project dependencies.

```bash
$ npm install
```

## Running the app

```bash
$ npm run dev
```