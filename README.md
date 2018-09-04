# desktop-integration-tests
[![CircleCI](https://circleci.com/gh/nteract/desktop-integration-tests.svg?style=svg)](https://circleci.com/gh/nteract/desktop-integration-tests)

Testing nteract for desktop on the regular with a full test suite

The plan will be to run integration tests for desktop via this repository nightly.

Plan:

0. Enable this repository on CircleCI
1. Provide scripts to
  * clone the monorepo locally
  * run the `dist` build for desktop
2. Use [Spectron](https://electronjs.org/spectron) to run against the built app
3. Open multiple different notebooks
4. Issue menu events (using spectron's access to the electron API) for running cells
