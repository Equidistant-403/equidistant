## Developer Documentation

# How to obtain the source code.
All source code is within the root `equidistant` directory, which can be cloned from the [Github Repo](https://github.com/Equidistant-403/equidistant)

# The layout of your directory structure.
## General
The `equidistant/shared` directory holds all documentation (user, developer, and API), and the `equidistant/reports`
directory contains our weekly status reports.

## Frontend
Frontend code is in the `equidistant/frontend/my-app` directory. Upon first time cloning the repo,
it will be necessary to run the `npm install` command from the `my-app` directory in order to install
the dependencies. Within the `src` directory you will find both the application's Typescript source files
and the test files alongside them. For example, the test file for `App.tsx` is the `App.test.tsx` file in the
same directory.

## Backend
Backend code is in the `equidistant/backend` directory.

# How to build the software.
## Frontend
To build the front end, make sure you have installed the dependendencies and then run `npm run build` from
the `equidistant/frontend/my-app` directory.

## Backend


# How to test the software.
## Frontend
To test the front end, make sure you have installed the dependendencies and then run `npm run test` from
the `equidistant/frontend/my-app` directory.

## Backend


# How to add new tests.
## Frontend
Test files are named after the file they are testing. For example, there are tests for `App.tsx` in the `App.test.tsx` file.
Tests in the files can be written inside of a wrapper function that looks like this.
```
test('test name', () => {
    // your test here
})
```

## Backend


# How to build a release of the software.
Version number should be updated in the top level `README.md` file, and again in the `frontend/my-app/package.json` file.
Then, once the changes are merged to main, [go here](https://github.com/Equidistant-403/equidistant/releases/new) and create a new release.
Names should follow the standard versioning control, where `x.0.0` indicates the major version number (major changes, backwards compatibility breakage), `0.y.0` indicates that minor version (features, backwards compatible changes), and `0.0.z` indicates a patch version (patches and bug fixes). The description should have a list of all changes, specifically highlighting anything that is not backwards compatible in the case of a major version bump.
