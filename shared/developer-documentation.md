## Developer Documentation

# How to obtain the source code.
All source code is within the root `equidistant` directory, which can be cloned from the [Github Repo](https://github.com/pandabear15/equidistant)

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
Provide clear instructions for how to run the system’s test cases. In some cases, the instructions may need to include information such as how to access data sources or how to interact with external systems. You may reference the user documentation (e.g., prerequisites) to avoid duplication.

# How to add new tests.
Are there any naming conventions/patterns to follow when naming test files? Is there a particular test harness to use?

# How to build a release of the software.
Describe any tasks that are not automated. For example, should a developer update a version number (in code and documentation) prior to invoking the build system? Are there any sanity checks a developer should perform after building a release?
