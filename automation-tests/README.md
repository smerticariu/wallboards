# Wallboards Automated Tests
## Running tests with **Cypress**


Cypress is a JavaScript based end-to-end testing framework running in the browser and responsible for executing the test cases collection.

The steps below include instructions about how to install Cypress and use it to run tests.

### 1. **Installation**
System requirements:
* git (for installation and setup, check [Bitbucket Support website](https://support.atlassian.com/bitbucket-cloud/docs/install-and-set-up-git/))
* Node.js 14 or above and npm installed (for download links and installation guide, check [Node.js website](https://nodejs.org/en/download/))

Install Cypress via `npm`: 
```
cd automation-tests
npm install cypress --save-dev
```
Install selenium-webdriver via npm:
```
npm install selenium-webdriver
```
### 2. **How to get the login tokens**
```
cd .\cypress\integration\Login\
Node Login.js
```
### 3. **How to run tests:**
I. Using Cypress Test Runner\
The following command launches the Cypress Test Runner:
```
cd automation-tests
npx cypress open
```
Once launched, select the `.feature` file to be run.

***
II. In headless mode\
The following commands trigger test execution in headless mode:
```
cd automation-tests
npx cypress run // to run all features
npx cypress run --spec 'path to specific.feature' // to run a specific feature
npx cypress run --browser chrome // to run on chrome browser
```
**_Note:_** When running tests in headless mode, Cypress automatically:
- captures a screenshot when a failure happens. To turn it off, set `screenshotOnRunFailure` to `false` in cypress.json
- records a video for each spec file. To turn this off, set `videoRecording`  to `false` in cypress.json