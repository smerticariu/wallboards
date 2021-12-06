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
### 2. **How to run tests:**
I. Using Cypress Test Runner
***
The following command launches the Cypress Test Runner:
```
npx cypress open
```
Once launched, select the `.feature` file to be run.


II. In headless mode\
The following commands trigger test execution in headless mode:
***
```
npx cypress run // to run all features
npx cypress run --spec 'path to specific.feature' // to run a specific feature
npx cypress run --browser chrome // to run on chrome browser
```
