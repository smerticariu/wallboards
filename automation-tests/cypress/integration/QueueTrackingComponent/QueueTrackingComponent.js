import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import QueueTracking_PO from '../../support/PageObjects/QueueTracking_PO';

const queueTracking = new QueueTracking_PO();
var content = ''
var total = ''
var maxWait = ''
var average = ''
var columns = 0


// Scenario: The queue tracking preview dynamically updates when associated configuration options are changed
Given ('the user is logged in', () => {
    cy.login();
    queueTracking.visitLandingPage();
    queueTracking.loggedInTitle().should('contain', 'Recent Wallboards');
})
And ('the wallboard creation page is displayed', () => {
    queueTracking.newWallboardButton().click();
})
And ('the user navigates to add a new queue tracking component', () => {
    queueTracking.addComonentButton().click();
    queueTracking.queuesCategory().click();
    queueTracking.componentCategsTitle().contains('Queue tracking').click();
    queueTracking.selectButton().click();
})
When ('the user changes the default component configuration options', () => {
    queueTracking.inputComponentTitle().clear().type('Edited Component Name');
    queueTracking.selectCallQ().select('T00000069');
    queueTracking.callQSelected().then(($el) => {
        content = $el.text()
        cy.log(content)
    })
})
Then ('the preview updates to reflect the selected options', () => {
    queueTracking.widgetTitle().then(($el) => {
        expect($el.text()).to.include('Edited Component Name');
        expect($el.text()).to.include(content);
    })

    queueTracking.showColumns().each(($el) => {
        cy.wrap($el).uncheck({force: true})
    })

    queueTracking.rowTitle().should('not.exist');
})

// Scenario: Queue tracking component name does not allow invalid characters
Given ('that the user is logged in', () => {
    cy.login();
    queueTracking.visitLandingPage();
    queueTracking.loggedInTitle().should('contain', 'Recent Wallboards');
})
And ('a wallboard with a queue tracking component is created', () => {
    queueTracking.createDefaultQTracking();
    queueTracking.saveWB();
})
When ('the user navigates to edit component name by entering invalid characters', () => {
    queueTracking.editComponent().click();
    queueTracking.componentModalTitle().clear().type('*(^%');
    queueTracking.saveModal().click();
})
Then ('the user is informed that invalid characters are not allowed', () => {
    queueTracking.error().should('contain', 'Title must be alphanumeric');
})

// Scenario: Queue tracking component name cannot be empty
Given ('that the user is logged in', () => {
    cy.login();
    queueTracking.visitLandingPage();
    queueTracking.loggedInTitle().should('contain', 'Recent Wallboards');
})
And ('a wallboard with one queue tracking component is already created', () => {
    queueTracking.createDefaultQTracking();
})
When ('the user navigates to edit component name by removing all characters in the name field', () => {
    queueTracking.editComponent().click();
    queueTracking.componentModalTitle().clear();
    queueTracking.saveModal().click();
})
Then ('the user is informed that component name cannot be empty', () => {
    queueTracking.error().should('contain', 'Title must be alphanumeric');
})

// Scenario Outline: Existing queue tracking component configuration can be edited
Given ('the {string} is logged in', (user) => {
    if(user == 'admin user') {
        cy.login();
        queueTracking.visitLandingPage();
        queueTracking.loggedInTitle().should('contain', 'Recent Wallboards');
    }
    else if(user == 'team leader user') {
        cy.loginLeader();
        queueTracking.visitLandingPage();
        queueTracking.loggedInTitle().should('contain', 'Recent Wallboards');
    }
})
And ('a wallboard with a default queue tracking component is displayed', () => {
    queueTracking.createDefaultQTracking();
    queueTracking.saveWB();
})
And ('the user navigates to edit component configuration options', () => {
    queueTracking.editComponent().click();
    queueTracking.modalTitle().should('contain', 'Edit Component');

    queueTracking.componentModalTitle().clear().type('1st edited name');

    queueTracking.selectCallQ().select('T00000069');
    queueTracking.callQSelected().then(($el) => {
        content = $el.text()
        cy.log(content)
    })

    queueTracking.totalCalls().uncheck({force: true});
    queueTracking.maxWait().uncheck({force: true});
})
When ('the user saves the changes made', () => {
    queueTracking.saveModal().click();
})
Then ('the new configuration is displayed on the wallboard component', () => {
    queueTracking.widgetTitle().should('contain', '1st edited name').and('contain', content);
    queueTracking.rowTitle().should('not.contain', 'Total Calls').and('not.contain', 'Max Wait');
})

// Scenario: Queue tracking component metrics update when changing the configured time zone
Given ('the wallboard for a queue tracking component is displayed', () => {
    cy.login();
    queueTracking.visitLandingPage();
    queueTracking.createDefaultQTracking();
})

And ('the user sets to view calls made today', () => {
    queueTracking.editComponent().click();
    queueTracking.period().select('today');
    queueTracking.saveModal().click();
    cy.wait(1000);
    queueTracking.totalNumberCalls().then(($el) => {
        content = $el.text();
        cy.log(content + ' initial total number of calls')
    })
})
And ('the user navigates to edit the time zone option', () => {
    queueTracking.editComponent().click();
    queueTracking.timeZone().select('-660');
})
When ('the change is saved', () => {
    queueTracking.saveModal().click();
    cy.wait(1000);
})
Then ('the data displayed on the component updates reflecting the new time zone', () => {
    queueTracking.totalNumberCalls().then(($el) => {
        expect($el.text()).to.not.eq(content)
    })
})

// Scenario Outline: Queue tracking component metrics update when changing the configured period
Given ('the wallboard for a default queue tracking component is displayed', () => {
    cy.login();
    queueTracking.visitLandingPage();
    queueTracking.createDefaultQTracking();
    queueTracking.totalNumberCalls().then(($el) => {
        total = $el.text();
        cy.log(total + ' initial total # of calls')
    })

    queueTracking.totalMaxWait().then(($el) => {
        maxWait = $el.text();
        cy.log(maxWait + ' initial total max of waiting time')
    })
})
And ('the user navigates to change the period to {string} option', (option) => {
    queueTracking.editComponent().click();
    queueTracking.period().select(option);
})
When ('the change is saved', () => {
    queueTracking.saveModal().click();
})
Then ('the data displayed on the component updates reflecting the new {string} period selected', (option) => {

    if(option == 'hour') {
        queueTracking.totalNumberCalls().then(($el) => {
            expect($el.text()).eq(total);
        })
        queueTracking.totalMaxWait().then(($el) => {
            expect($el.text()).eq(maxWait);
        })
    }
    else {
        queueTracking.totalNumberCalls().then(($el) => {
            expect($el.text()).not.eq(total);
        })
        queueTracking.totalMaxWait().then(($el) => {
            expect($el.text()).not.eq(maxWait);
        })
    }
})

// Scenario: Only selected columns to view are displayed on the queue tracking component
Given ('that the wallboard with a queue tracking component is created', () => {
    cy.login();
    queueTracking.visitLandingPage();
    queueTracking.createDefaultQTracking();
    queueTracking.saveWB();

    queueTracking.rowTitle().then(($el) => {
        columns = $el.length;
        cy.log(columns + ' initial number of columns displayed')
    })
})
And ('the user opens the component configuration options', () => {
    queueTracking.editComponent().click();
})
And ('the user disables 3 of the column options to view', () => {
    queueTracking.totalCalls().uncheck({force: true});
    queueTracking.solidCalls().uncheck({force: true});
    queueTracking.maxWait().uncheck({force: true});
})
When ('the column changes are saved', () => {
    queueTracking.saveModal().click();
})
Then ('the disabled columns are not displayed on the component', () => {
    queueTracking.rowTitle().should('not.contain', 'Total Calls').and('not.contain', 'Solid Calls').and('not.contain', 'Max Wait');
    queueTracking.rowTitle().then(($el) => {
        expect($el.length).to.eq(columns - 3);
    })
})

// Scenario Outline: Queue tracking component can be removed
Given ('the {string} logs in', (user) => {
    if(user == 'admin user') {
        cy.login();
        queueTracking.visitLandingPage();
        queueTracking.loggedInTitle().should('contain', 'Recent Wallboards');
    }
    else if(user == 'team leader user') {
        cy.loginLeader();
        queueTracking.visitLandingPage();
        queueTracking.loggedInTitle().should('contain', 'Recent Wallboards');
    }
})
And ('a wallboard with a queue tracking component is displayed', () => {
    queueTracking.createDefaultQTracking();
})
When ('the user requests to have the component removed', () => {
    queueTracking.removeComponent();
})
Then ('the component is no longer displayed on the wallboard', () => {
    queueTracking.component().should('not.exist');
})

// Scenario Outline: Abandoned calls panel does not turn red when SLA breaks and associated configuration option is disabled
Given ('that a wallboard with a default queue tracking component is displayed', () => {
    cy.login();
    queueTracking.visitLandingPage();
    queueTracking.createDefaultQTracking();
})
And ('the user selects period to {string}', (option) => {
    queueTracking.editComponent().click();
    queueTracking.period().select(option);
})
And ('the abandoned call SLA option is disabled', () => {
    queueTracking.abandonedCheckbox().uncheck({force: true});
})
And ('the user sets the abandoned call SLA to 1%', () => {
    queueTracking.inputAbandoned().clear().type('1');
})
When ('the user saves the changes made', () => {
    queueTracking.saveModal().click();
})
Then ('the abandoned calls associated panel in the queue tracking component does not turn red', () => {
    queueTracking.abandonedPanel().should('have.css', 'background-color', 'rgb(190, 194, 198)');
})

// Scenario Outline: Abandoned calls panel turns red when SLA breaks and associated configuration option is enabled
Given ('a wallboard with a default queue tracking component is created', () => {
    cy.login();
    queueTracking.visitLandingPage();
    queueTracking.createDefaultQTracking();
})
And ('the user selects the period to {string}', (option) => {
    queueTracking.editComponent().click();
    queueTracking.period().select(option);
})
And ('the abandoned call SLA option is enabled', () => {
    queueTracking.abandonedCheckbox().check({force: true});
})
And ('the user sets the abandoned call SLA to 1%', () => {
    queueTracking.inputAbandoned().clear().type('1');
})
When ('the user saves the changes made', () => {
    queueTracking.saveModal().click();
})
Then ('the abandoned calls associated panel in the queue tracking component turns red', () => {
    queueTracking.abandonedPanel().should('have.css', 'background-color', 'rgb(248, 72, 94)');
})