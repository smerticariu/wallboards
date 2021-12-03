import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import CallStatusComponent from "../../support/PageObjects/CallStatusComponent_PO";

const callStatus = new CallStatusComponent()
var content = ''

// Scenario Outline: Inbound, Outbound, Internal, Relayed, Feature, Uncategorized call categories are displayed on the call status component
Given ('the {string} is logged in', (user) => {
    if(user == 'admin user') {
        cy.login();
        callStatus.visitLandingPage();
    }
    else {
        cy.loginLeader()
        callStatus.visitLandingPage(); 
    }

    callStatus.loggedInTitle().should('contain', 'Recent Wallboards');
})
And ('the user navigates to create e new wallboard', () => {
    callStatus.newWallboard().click();
})
When ('the user adds a call status component', () => {
    callStatus.addComponent().click();
    callStatus.callCategory().click();
    callStatus.componentTitle().contains('Call status').click();
    callStatus.selectButton().click();
    callStatus.saveButton().click();
})
Then('the call status component displays the following call categories: Inbound, Outbound, Internal, Relayed, Feature, Uncategorized', () => {
    var categories1 = ['inbound', 'outbound', 'internal', 'relayed', 'feature', 'uncategorised']
    var i = 0
    callStatus.callStatusTitle().each((title) => {
        expect(title.text().toLowerCase()).to.eq(categories1[i])
        i = i+1
    })
})

// Scenario: Call status component name does not allow invalid characters
Given ('the user is logged in', () => {
    cy.login();
    callStatus.visitLandingPage();
    callStatus.loggedInTitle().should('contain', 'Recent Wallboards');
})
And ('a wallboard with a call status component is displayed', () => {
    callStatus.newWallboard().click();
    callStatus.addComponent().click();
    callStatus.callCategory().click();
    callStatus.componentTitle().contains('Call status').click();
    callStatus.selectButton().click();
    callStatus.saveButton().click();
})
When ('the user navigates to edit component name by entering invalid characters', () => {
    callStatus.editComponentButton().click();
    callStatus.modalTitle().type('!@#');
    callStatus.saveButton().click();
})
Then ('the user is informed that invalid characters are not allowed', () => {
    callStatus.error().should('contain', 'Title must be alphanumeric');
})

// Scenario: Call status component name cannot be empty
Given ('that the user is logged in', () => {
    cy.login();
    callStatus.visitLandingPage();
    callStatus.loggedInTitle().should('contain', 'Recent Wallboards');
})
And ('a wallboard with one call status component is displayed', () => {
    callStatus.newWallboard().click();
    callStatus.addComponent().click();
    callStatus.callCategory().click();
    callStatus.componentTitle().contains('Call status').click();
    callStatus.selectButton().click();
    callStatus.saveButton().click();
})
When ('the user navigates to edit component name by removing all characters in the name field', () => {
    callStatus.editComponentButton().click();
    callStatus.modalTitle().clear();
    callStatus.saveButton().click();
})
Then ('the user is informed that component name must be alphanumeric', () => {
    callStatus.error().should('contain', 'Title must be alphanumeric');
})

// Scenario Outline: Call status component can be removed
Given ('that the {string} is logged in', (user) => {
    if(user == 'admin user') {
        cy.login();
        callStatus.visitLandingPage();
    }
    else {
        cy.loginLeader()
        callStatus.visitLandingPage(); 
    }
    callStatus.loggedInTitle().should('contain', 'Recent Wallboards');
})
And ('a wallboard with one call status component is displayed', () => {
    callStatus.newWallboard().click();
    callStatus.addComponent().click();
    callStatus.callCategory().click();
    callStatus.componentTitle().contains('Call status').click();
    callStatus.selectButton().click();
    callStatus.saveButton().click();
})
When ('the user navigates to remove the component', () => {
    callStatus.removeComponent().click();
    callStatus.confirmDeletion();
})
Then ('the component is no longer displayed on the wallboard', () => {
    callStatus.callStatusBody().should('not.exist');
})

// Scenario Outline: Internal calls are displayed on the call status component
Given ('that the {string} is logged in', (user) => {
    if(user == 'admin user') {
        cy.login();
        callStatus.visitLandingPage();
    }
    else {
        cy.loginLeader()
        callStatus.visitLandingPage(); 
    }
    callStatus.loggedInTitle().should('contain', 'Recent Wallboards');
})
And ('the user creates a wallboard', () => {
    callStatus.newWallboard().click();
})
And ('the user adds an agent list component with all interactivity options enabled', () => {
    callStatus.addComponent().click();
    callStatus.defaultAgentList();
    cy.wait(3000)
    callStatus.agentListBody().then((message) => {
        content = message.text();
        cy.log(content);
    })
})
And ('the user adds a call status component', () => {
    callStatus.addComponent().click();
    callStatus.callCategory().click();
    callStatus.componentTitle().contains('Call status').click();
    callStatus.selectButton().click();
    callStatus.saveButton().click();
})
When('the user calls the first agent displayed on the agent list component', () => {
    if (content == 'No agents') {
        cy.log('There are no agents in the selected queue')
    }
    else {
        callStatus.callAgent();
    }
})
Then ('the call status component reflects the internal call', () => {
    callStatus.internalCateg().then(($el) => {
        expect($el.text()).to.eq('1');
    })
})