# Free-Mentors

[![Build Status](https://travis-ci.com/Jajabenit250/Free-Mentors.svg?branch=develop)](https://travis-ci.com/Jajabenit250/Free-Mentors) [![Coverage Status](https://coveralls.io/repos/github/Jajabenit250/Free-Mentors/badge.svg?branch=develop)](https://coveralls.io/github/Jajabenit250/Free-Mentors?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/a21e985fef9bc8e46e93/maintainability)](https://codeclimate.com/github/Jajabenit250/Free-Mentors/maintainability)

Free Mentors is a platform where people (Mentree) to request free mentorship with mentors.

## SETTING UP ENVIRONMENT

```shell
$ brew install node
```

check if it's available

```shell
$ node -v
```

### you must have also git client

```shell
$ git --version
```

### now clone repo

```shell
$ git clone https://github.com/Jajabenit250/Free-Mentors.git
```

### Install dependencies

with npm

```shell
npm install
```

### Start the server

```shell
 $ npm start
```

### Tests & Linting

for running test do

```shell
 $ npm test
```

for linting do

```shell
$ npm lint
```

## API ENDPOINTS

### _BASEURL : `/api/v1/`_

### AUTHENTICATION END POINTS : `/auth/`

| HTTP METHOD | END POINT | AUTHENTICATED | DESCRIPTION           |
| ----------- | --------- | ------------- | --------------------- |
| POST        | `/signup` | `False`       | Create a New User     |
| POST        | `/signin` | `False`       | Authenticate The User |

### USER End POINT

| HTTP METHOD | END POINT   | AUTHENTICATED | DESCRIPTION           |
| ----------- | ----------- | ------------- | --------------------- |
| PATCH       | `/user/:id` | `True`        | Change User To Mentor |

### MENTORS End POINTS

| HTTP METHOD | END POINT      | AUTHENTICATED | DESCRIPTION              |
| ----------- | -------------- | ------------- | ------------------------ |
| GET         | `/mentors`     | `False`       | Get all Mentors          |
| GET         | `/mentors/:id` | `False`       | Get mentor profile by id |

### SESSIONS End POINTS

| HTTP METHOD | END POINT              | AUTHENTICATED | DESCRIPTION                      |
| ----------- | ---------------------- | ------------- | -------------------------------- |
| POST        | `/sessions`            | `True`        | user create mentorship request   |
| GET         | `/sessions`            | `True`        | lists of mentorship requests     |
| PATCH       | `/sessions/:id/accept` | `True`        | mentor accept mentorship session |
| PATCH       | `/sessions/:id/reject` | `True`        | mentor accept mentorship session |
| POST        | `/sessions/:id/review` | `True`        | Add a Review to session          |
| DELETE      | `/sessions/:id/review` | `True`        | Delete a session review          |

### Heroku

The application API is not hosted on Heroku Yet:

### Github Pages

The application UI is hosted on this gh-pages URL: https://jajabenit250.github.io/Free-Mentors/

## Developer

Benit Havugimana `<mail@jajabenit.com>`
