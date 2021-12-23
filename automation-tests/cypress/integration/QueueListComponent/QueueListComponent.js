import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import QueueList_PO from '../../support/PageObjects/QueueList_PO';

const queueList = new QueueList_PO()

var selectedQ = ''

// Scenario: Selecting the queue list component type displays the modal with default configuration
Given ('the user is logged in', () => {
    cy.login();
    queueList.visitLandingPage();
    queueList.loggedInTitle().should('contain', 'Recent Wallboards');
})
And ('the wallboard creation page is displayed', () => {
    queueList.newWallboardButton().click();
})
When ('the user navigates to add a component for queue list', () => {
    queueList.addComonentButton().click();
    queueList.queuesCategory().click();
    queueList.componentModalTitle().contains('Queue list').click();
    queueList.selectButton().click();
})
Then ('the queue list component modal with default configuration is displayed', () => {
    queueList.displayConnected().should('be.checked');
    queueList.displayWaiting().should('be.checked');

    queueList.showCallerNumber().should('be.checked');
    queueList.showCallerName().should('be.checked');
    queueList.showPriority().should('be.checked');
    queueList.showPosition().should('be.checked');
    queueList.showTimeWaiting().should('be.checked');
    queueList.showAgent().should('be.checked');
    queueList.showTimeatHead().should('be.checked');

    queueList.sortBy().should('have.text', 'Position in Queue');

    queueList.showSkills().should('not.be.checked');
    queueList.showSkillsShortage().should('not.be.checked');

    queueList.listenLive().should('not.be.checked');
})

// Scenario Outline: Queue list component can be removed
Given ('the {string} is logged in', (user) => {
    if(user == 'admin user') {
        cy.login();
        queueList.visitLandingPage();
        queueList.loggedInTitle().should('contain', 'Recent Wallboards');
    }
    else if(user == 'team leader user') {
        cy.loginLeader();
        queueList.visitLandingPage();
        queueList.loggedInTitle().should('contain', 'Recent Wallboards');
    }
})
And ('the wallboard with a queue list component is displayed', () => {
    queueList.createDefaultQListWB();
    queueList.wbTitle().clear().type('Default Queue List');
    queueList.saveWB();
})
When ('the user removes the queue list component', () => {
    queueList.removeComponent();
})
Then ('the queue list component is no longer displayed on the wallboard', () => {
    cy.get('.widget').should('not.exist');
})

// Scenario: The queue list preview dynamically updates when associated configuration options are changed
Given ('the user is logged in', () => {
    cy.login();
    queueList.visitLandingPage();
    queueList.loggedInTitle().should('contain', 'Recent Wallboards');
})
And ('the user navigates to the wallboard creation page', () => {
    queueList.newWallboardButton().click();
})
And ('the user adds a new queue list component', () => {
    queueList.addComonentButton().click();
    queueList.queuesCategory().click();
    queueList.componentModalTitle().contains('Queue list').click();
    queueList.selectButton().click();
})
And ('the user changes the component name', () => {
    queueList.componentTitle().clear().type('Edited Component Name');
})
And ('the user selects another queue to monitor', () => {
    queueList.selectQueue().select('T00000069');
    queueList.selectedQueueText().then(($el) => {
        selectedQ = $el.text();
        cy.log(selectedQ)
    })
})
And ('the user disables the call statuses options', () => {
    queueList.displayConnected().uncheck({force: true});
    queueList.displayWaiting().uncheck({force: true});
})
And ('the user disables all show columns except the caller number column', () => {
    queueList.allCheckboxes().uncheck({force: true});
    queueList.showCallerNumber().check({force: true});
})
And ('the user enables the listen live option', () => {
    queueList.listenLive().check({force: true});
})
When ('the user inspects the component preview', () => {
    // action implemented in step below
})
Then ('the changes are displayed in the component preview', () => {
    queueList.widgetTitle().then(($el) => {
        expect($el.text()).to.contain('Edited Component Name');
        expect($el.text()).to.contain(selectedQ);
        expect($el.text()).not.to.contain('Connected');
        expect($el.text()).not.to.contain('Waiting');
    })
    queueList.columnsPreviewTitles().should('contain', 'Caller number');
    queueList.listenLiveIcon().should('exist');
})

// Scenario: Queue list component name does not allow invalid characters
Given ('the user is logged in', () => {
    cy.login();
    queueList.visitLandingPage();
    queueList.loggedInTitle().should('contain', 'Recent Wallboards');
})
And ('a wallboard with a queue list component is displayed', () => {
    queueList.createDefaultQListWB();
})
And ('the user navigates to edit component name by entering invalid characters', () => {
    queueList.editComponent().click();
    queueList.componentTitle().clear().type('#$%^');
})
When ('the user attempts to save the edits made', () => {
    queueList.saveModal().click();
})
Then ('the user is informed that invalid characters are not allowed', () => {
    queueList.error().should('contain', 'Title must be alphanumeric');
})

// Scenario: Queue list component name cannot be empty
Given ('that the user is logged in', () => {
    cy.login();
    queueList.visitLandingPage();
    queueList.loggedInTitle().should('contain', 'Recent Wallboards');
})
And ('a wallboard with one queue list component is already created', () => {
    queueList.createDefaultQListWB();
})
And ('the user navigates to edit component name by removing all characters in the name field', () => {
    queueList.editComponent().click();
    queueList.componentTitle().clear();
})
When ('the user attempts to save the new edits', () => {
    queueList.saveModal().click();
})
Then ('the user is informed that component name cannot be empty', () => {
    queueList.error().should('contain', 'Title must be alphanumeric');
})

// Scenario Outline: Setting a SLA time value outside the valid range is not allowed
Given ('the wallboard containing a default queue list component is displayed', () => {
    cy.login();
    queueList.visitLandingPage();
    queueList.createDefaultQListWB();
    queueList.saveWB();
})
And ('the user navigates to edit the time in queue SLA by typing {string}', (value) => {
    queueList.editComponent().click();
    queueList.inputTimeinQueue().clear().type(value);
})
And ('the user navigates to edit the time at head of queue SLA by typing {string}', (value) => {
    queueList.inputTimeHeadQueue().clear().type(value);
})
When ('the user attempts to save the new configuration', () => {
    queueList.saveModal().click();
})
Then ('the user is informed about the allowed range for selected {string}', (value) => {
    if(value == 0) {
        queueList.error().should('contain', 'Min value is 1')
    }
    else if(value == 99999) {
        queueList.error().should('contain', 'Max value is xyz')
    }
})