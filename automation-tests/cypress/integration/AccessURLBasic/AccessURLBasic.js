import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import AccessURL_PO from '../../support/PageObjects/AccessURL_PO';
import CreateGroup_PO from "../../support/PageObjects/CreateGroup_PO";


const accessURL = new AccessURL_PO;
const group = new CreateGroup_PO();

beforeEach(function () {
    cy.fixture('readOnlyUrl.json').then((url) => {
       cy.wrap(url).as('accessUrl');
    })
})

// Scenario Outline: Other users can view the wallboard in read-only mode
Given ('that {string} user is logged in', (other) => {
    if(other == 'basic') {
        cy.loginBasic();
    }
    else if(other == 'team lead') {
        cy.loginLeader();
    }
})
When ('the user opens the saved URL in a browser', () => {
    cy.get('@accessUrl').then((accessURL) => {
        cy.log(accessURL.savedWB)
        cy.visit(accessURL.savedWB);
    })
})
Then ('the wallboard is displayed in read-only view mode', () => {
    accessURL.verifyReadOnly().should('be.visible');
})

// Scenario Outline: Other users cannot view the wallboard in read-only mode when the URL is not saved
Given ('{string} user is logged in', (other) => {
    if(other == 'basic') {
        cy.loginBasic();
    }
    else if(other == 'team lead') {
        cy.loginLeader();
    }
})
When ('the user attempts to access the unsaved URL', () => {
    cy.get('@accessUrl').then((accessURL) => {
        cy.log(accessURL.unsavedWB)
        cy.visit(accessURL.unsavedWB);
    })
})

Then ('the wallboard is not displayed', () => {
    cy.wait(2000)
    accessURL.basicNoAccessMessage().then((text) => {
        cy.wrap(text.text()).should('contain', "You don't have access")
    })
})

// Scenario Outline: Other users cannot view the wallboard in read-only mode when the URL is disabled
Given ('that {string} user is logged in', (other) => {
    if(other == 'basic') {
        cy.loginBasic();
    }
    else if(other == 'team lead') {
        cy.loginLeader();
    }
})
When ('the user attempts to access the disabled URL', () => {
    cy.get('@accessUrl').then((accessURL) => {
        cy.log(accessURL.disabledWB)
        cy.visit(accessURL.disabledWB);
    })
})
Then ('the wallboard is not displayed', () => {
    cy.wait(2000)
    accessURL.basicNoAccessMessage().then((text) => {
        cy.wrap(text.text()).should('contain', "You don't have access")
    })
})

// Scenario Outline: User is informed when accessing a read-only URL for deleted wallboard
Given ('that the {string} logs in', (user) => {
    if(user == 'basic user') {
        cy.loginBasic();
    }
    else if(user == 'team lead') {
        cy.loginLeader();
    }
})
When ('the user accesses the URL for a deleted wallboard', () => {
    cy.get('@accessUrl').then((accessURL) => {
        cy.log(accessURL.deletedUrl)
        cy.visit(accessURL.deletedUrl);
    })
})
Then ('the user is informed about not being able to view the wallboard', () => {
    accessURL.basicNoAccessMessage().should('contain', 'Something went wrong');
})

// -----------------------------------------------------------------------------------------------
// Scenario Outline: Other users can view the group in read-only mode
Given ('that the {string} logs in', (user) => {
    if(user == 'basic user') {
        cy.loginBasic();
    }
    else if(user == 'team lead') {
        cy.loginLeader();
    }
})
When ('the user accesses the read-only URL for a saved group', () => {
    cy.get('@accessUrl').then((accessURL) => {
        cy.log(accessURL.savedGroup)
        cy.visit(accessURL.savedGroup);
    })
})
Then ('the group is displayed in read-only view mode', () => {
    accessURL.verifyReadOnly().should('be.visible');
    group.readOnlyBar().should('not.contain', 'Error');
})

// Scenario Outline: Wallboard group cannot be opened in read-only mode when the URL is disabled
Given ('that the {string} logs in', (user) => {
    if(user == 'basic user') {
        cy.loginBasic();
    }
    else if(user == 'team lead') {
        cy.loginLeader();
    }
})
When ('the user accesses a disabled read-only URL for a saved group', () => {
    cy.get('@accessUrl').then((accessURL) => {
        cy.log(accessURL.disabledGroup)
        cy.visit(accessURL.disabledGroup);
    })
})
Then ('the user is informed that access is denied', () => {
    accessURL.basicNoAccessMessage().should('contain', "You don't have access")
})

// Scenario Outline: Wallboard group cannot be opened in read-only mode when shared URL is not saved
Given ('that the {string} logs in', (user) => {
    if(user == 'basic user') {
        cy.loginBasic();
    }
    else if(user == 'team lead') {
        cy.loginLeader();
    }
})
When ('the user attempts to access an unsaved read-only URL', () => {
    cy.get('@accessUrl').then((accessURL) => {
        cy.log(accessURL.unsavedGroup)
        cy.visit(accessURL.unsavedGroup);
    })
})
Then ('the user is informed that access is denied', () => {
    accessURL.basicNoAccessMessage().should('contain', "You don't have access")
})

// Scenario Outline: The user is informed when accessing a read-only URL for deleted group
Given ('that the {string} is logging in', (user) => {
    if(user == 'basic user') {
        cy.loginBasic();
    }
    else if(user == 'admin user') {
        cy.login();
        cy.wait(2000)
    }
    else if(user == 'team lead') {
        cy.loginLeader();
    }
})
When ('the user accesses a read-only URL for a deleted group', () => {
    cy.get('@accessUrl').then((accessURL) => {
        cy.log(accessURL.deletedGroupUrl)
        cy.visit(accessURL.deletedGroupUrl);
    })
})
Then ('no wallboard is displayed', () => {
    cy.wait(2000)
    accessURL.basicNoAccessMessage().should('contain', "Something went wrong");
})