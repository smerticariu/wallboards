import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import AccessURL_PO from '../../support/PageObjects/AccessURL_PO';


beforeEach(() => {

    //cy.clearLocalStorage()
    cy.login()
    //cy.log("Login Successful")
})

const accessURL = new AccessURL_PO;
var url = ''
var message = ''

// Scenario: Admin users can create read-only URLs for wallboards

Given ('the edit mode for a wallboard is displayed', () => {
    accessURL.visitLandingPage();
    accessURL.newWallboard().click();
})
And ('the settings modal is displayed', () => {
    accessURL.settingsCog().click();
})
When ('the user clicks on the option to create a read-only URL', () => {
    accessURL.createUrlButton().click();
})
Then ('the read-only URL is generated', () => {
    accessURL.getURL().invoke('val').then((text) => {
        url = text
        cy.log(url)
        .should('not.be.empty')
    })
})
And ('the option to copy the link becomes active', () => {
    accessURL.copyUrlButton().should('be.enabled')
})

// Scenario: Admin users can disable read-only URLs for wallboards
Given ('that the settings modal is displayed', () => {
    accessURL.visitLandingPage();
    accessURL.newWallboard().click();
    accessURL.settingsCog().click();
})
And ('an URL has been created', () => {
    accessURL.createUrlButton().click();
})
When ('the user selects the option to disable the URL', () => {
    accessURL.createUrlButton().click();    // using the same button for disable URL until otherwise specified/implemented
})
Then ('the URL is no longer displayed', () => {
    accessURL.getURL().invoke('val').should('be.empty');
})
And ('the option to copy the URL is inactive', () => {
    accessURL.copyUrlButton().should('be.disabled');
})

// Scenario: Copied URL displays the corresponding wallboard in read-only mode

Given('that the settings modal is displayed', () => {
    accessURL.visitLandingPage();
    accessURL.newWallboard().click();
    accessURL.settingsCog().click();
})
And('an URL is created', () => {
    accessURL.createUrlButton().click();
})
And('the user selects the option to copy the URL', () => {
    accessURL.getURL().invoke('val').then((text) => {
        url = text
        cy.log(url)
    })
    accessURL.copyUrlButton().click();
    accessURL.copyNotification().should('be.visible').and('contain', 'Link was successfully copied');
    accessURL.closeNotification();
})
And('the user saves the changes', () => {
    accessURL.saveWallboardChanges();
})
When('the user requests to access the copied URL', () => {
    cy.visit(url);
})
Then('the wallboard is displayed in read-only mode', () => {
    accessURL.verifyReadOnly().should('be.visible')
})

// Scenario: Different read-only URL is generated when initial URL is disabled
Given ('that a read-only URL is created', () => {
    accessURL.visitLandingPage();
    accessURL.newWallboard().click();
    accessURL.settingsCog().click();
    accessURL.createUrlButton().click();
})
And ('the user copies the link', () => {
    accessURL.getURL().invoke('val').then((text) => {
        url = text;
        cy.log(url);
    })
})
And ('the user disables the link', () => {
    accessURL.createUrlButton().click();     // using the same button for disable URL until otherwise specified/implemented
})
When ('the user re-creates the URL', () => {
    accessURL.createUrlButton().click();
})
Then ('a different read-only URL is generated', () => {
    accessURL.getURL().invoke('val').should('not.eq', url);
})

// Scenario Outline: Other users cannot view the wallboard in read-only mode when the URL is not saved
Given ('that an admin user generated a read-only URL', () => {
    accessURL.visitLandingPage();
    accessURL.newWallboard().click();
    accessURL.addComponent();
    accessURL.saveWallboardChanges();
    accessURL.settingsCog().click();
    accessURL.createUrlButton().click();
})
And ('the admin user copies the URL', () => {
    accessURL.getURL().invoke('val').then((text) => {
        url = text;
        cy.log(url);
    })
})
And ('the admin user does not save the URL', () => {
    accessURL.closeSettingsModal().click({force: true});
    accessURL.adminLogOut();
})
When ('{string} user attempts to access the URL generated', (other) => {
    if(other == 'basic') {
        cy.loginBasic();
        cy.visit(url);
    }
    else if(other == 'team lead') {
        cy.loginLeader();
        cy.visit(url);
    }
})
Then ('the wallboard is not displayed', () => {
    cy.wait(1000)
    accessURL.basicNoAccessMessage().then((text) => {
        message = text.text();
        cy.log(message)
        expect(message).to.include("You don't have access to this wallboard! Please contact your Administrator.")
    })
})

// Scenario Outline: Other users can view the wallboard in read-only mode
Given ('that a wallboard read-only URL is generated', () => {
    accessURL.visitLandingPage();
    accessURL.newWallboard().click();
    accessURL.addComponent();
    accessURL.settingsCog().click();
    accessURL.createUrlButton().click();
    accessURL.getURL().invoke('val').then((text) => {
        url = text;
        cy.log(url);
    })
    accessURL.saveSettingsModal().click();
    accessURL.saveWallboardChanges();
    accessURL.adminLogOut();
})
When ('a {string} user opens the URL in a browser', (another) => {
    if(another == 'basic') {
        cy.loginBasic();
        cy.visit(url);
    }
    else if (another == 'team lead') {
        cy.loginLeader();
        cy.visit(url);
    }
})
Then ('the wallboard is displayed in read-only view mode', () => {
    accessURL.verifyReadOnly().should('be.visible');
    accessURL.readOnlyLogout();
})

// Scenario Outline: Other users cannot view the wallboard in read-only mode when the URL is disabled
Given ('that a read-only URL previously generated is disabled', () => {
    accessURL.visitLandingPage();
    accessURL.newWallboard().click();
    accessURL.addComponent();
    accessURL.settingsCog().click();
    accessURL.createUrlButton().click();
    accessURL.getURL().invoke('val').then((text) => {
        url = text;
        cy.log(url);
    })
    accessURL.saveSettingsModal().click();
    accessURL.saveWallboardChanges();
    accessURL.settingsCog().click();
    accessURL.createUrlButton().click();

    accessURL.saveSettingsModal().click({force: true});
    accessURL.saveWallboardChanges();
    accessURL.adminLogOut();
})
When ('the {string} user accesses the URL', (other) => {
    if(other == 'basic') {
        cy.loginBasic();
        cy.visit(url);
    }
    else if(other == 'team lead') {
        cy.loginLeader();
        cy.visit(url);
    }
})
Then ('the wallboard is not displayed', () => {
    cy.wait(1000)
    accessURL.basicNoAccessMessage().then((text) => {
        message = text.text();
        cy.log(message)
        expect(message).to.include("You don't have access to this wallboard! Please contact your Administrator.")
    })
})

// Scenario Outline: User is informed when accessing a read-only URL for deleted wallboard
Given ('that an admin user generates a read-only URL', () => {
    accessURL.visitLandingPage();
    accessURL.newWallboard().click();
    accessURL.addComponent();
    accessURL.settingsCog().click();
    accessURL.createUrlButton().click();
    accessURL.getURL().invoke('val').then((text) => {
        url = text;
        cy.log(url);
    })
    accessURL.saveSettingsModal().click();
    accessURL.saveWallboardChanges();
    accessURL.logo().click();
})
And ('the user deletes the wallboard', () => {
    cy.wait(2000)
    accessURL.deleteWallboard();
})
When ('the {string} accesses the URL', (user) => {
    if (user == 'admin') {
        cy.visit(url);
    }
    else if (user == 'basic user') {
        accessURL.newWallboard().click();
        accessURL.addComponent();
        accessURL.saveWallboardChanges();
        accessURL.adminLogOut();

        cy.loginBasic();
        cy.visit(url);
    }
    else {
        accessURL.newWallboard().click();
        accessURL.addComponent();
        accessURL.saveWallboardChanges();
        accessURL.adminLogOut();

        cy.loginLeader();
        cy.visit(url);
    }
})
Then ('the user is informed about not being able to view the wallboard', () => {
    accessURL.basicNoAccessMessage().should('contain', 'wrong');
})

// Scenario: Team leader users can create wallboard read-only URL
Given ('the team leader creates a read-only URL for a wallboard', () => {
    accessURL.visitLandingPage();
    accessURL.viewWallboard();
    accessURL.readOnlyLogout();
    cy.loginLeader();
    accessURL.visitLandingPage();
    accessURL.newWallboard().click();
    accessURL.addComponent();
    accessURL.settingsCog().click();
    accessURL.createUrlButton().click();

})
And ('the user copies the URL', () => {
    accessURL.getURL().invoke('val').then((text) => {
        url = text;
        cy.log(url);
    })
})
And ('the user saves the changes made', () => {
    accessURL.saveSettingsModal().click();
    accessURL.saveWallboardChanges();
})
And ('the user logs out', () => {
    accessURL.adminLogOut();
})
When ('a basic user accesses the URL', () => {
    cy.loginBasic();
    cy.visit(url);
})
Then ('the new wallboard is displayed in read-only mode', () => {
    accessURL.verifyReadOnly().should('be.visible');
})