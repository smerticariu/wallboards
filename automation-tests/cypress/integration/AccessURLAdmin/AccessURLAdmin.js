import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import AccessURL_PO from '../../support/PageObjects/AccessURL_PO';
import CreateGroup_PO from "../../support/PageObjects/CreateGroup_PO";


beforeEach(() => {
    cy.login()
})

const accessURL = new AccessURL_PO;
const group = new CreateGroup_PO();
var url, unsavedUrl, disabledUrl, savedUrl, deletedWB = ''
var unsavedUrlGroup, disabledUrlGroup, savedUrlGroup, deletedGroup = ''

// Scenario: Admin users can create read-only URLs for wallboards

Given ('the edit mode for a wallboard is displayed', () => {
    accessURL.visitLandingPage();
    accessURL.newWallboard().click();
    accessURL.newWBTitle().clear().type('Unsaved URL');
    accessURL.saveWallboardChanges();
})
And ('the settings modal is displayed', () => {
    accessURL.settingsCog().click();
})
When ('the user clicks on the option to create a read-only URL', () => {
    accessURL.createUrlButton().click();
})
Then ('the read-only URL is generated', () => {
    accessURL.getURL().invoke('val').then((text) => {
        unsavedUrl = text
        cy.log(unsavedUrl)
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
    accessURL.newWBTitle().clear().type('Disabled URL');
    accessURL.settingsCog().click();
})
And ('an URL has been created', () => {
    accessURL.createUrlButton().click();
    accessURL.getURL().invoke('val').then((text) => {
        disabledUrl = text
        cy.log(disabledUrl)
        .should('not.be.empty')

    })
    accessURL.saveSettingsModal().click();
    accessURL.saveWallboardChanges();
})
When ('the user selects the option to disable the URL', () => {
    accessURL.settingsCog().click();
    accessURL.createUrlButton().click();
})
Then ('the URL is no longer displayed', () => {
    accessURL.getURL().invoke('val').should('be.empty');
})
And ('the option to copy the URL is inactive', () => {
    accessURL.copyUrlButton().should('be.disabled');
    accessURL.saveSettingsModal().click();
    accessURL.saveWallboardChanges();
})

// Scenario: Generated read-only URL can be saved

Given('that a new wallboard is created', () => {
    accessURL.visitLandingPage();
    accessURL.newWallboard().click();
    accessURL.newWBTitle().clear().type('Saved URL');
    accessURL.saveWallboardChanges();
})
And('the user generates a read-only URL', () => {
    accessURL.settingsCog().click();
    accessURL.createUrlButton().click();
})
And('the URL is saved', () => {
    accessURL.getURL().invoke('val').then((text) => {
        savedUrl = text
        cy.log(savedUrl)
    })
    accessURL.copyUrlButton().click();
    accessURL.copyNotification().should('be.visible').and('contain', 'Link was successfully copied');
    cy.wait(1000);
    accessURL.saveSettingsModal().click();
})
And('the wallboard changes are saved', () => {
    accessURL.saveWallboardChanges();
})
When('the user acesses the URL', () => {
    cy.visit(savedUrl);
})
Then('the wallboards is displayed in read-only mode', () => {
    cy.wait(1000);
    accessURL.verifyReadOnly().should('be.visible');
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
    accessURL.createUrlButton().click();
})
When ('the user re-creates the URL', () => {
    accessURL.createUrlButton().click();
})
Then ('a different read-only URL is generated', () => {
    accessURL.getURL().invoke('val').should('not.eq', url);
})

// Scenario: Generate read-only URL and delete the associated wallboard
Given ('a new wallboard is created', () => {
    accessURL.visitLandingPage();
    accessURL.newWallboard().click();
    accessURL.newWBTitle().clear().type('To be deleted');
})
And ('a read-only URL is generated', () => {
    accessURL.settingsCog().click();
    accessURL.createUrlButton().click();
    accessURL.getURL().invoke('val').then((text) => {
        deletedWB = text;
        cy.log(deletedWB);
    })
    cy.wait(1000);
    accessURL.saveSettingsModal().click();
})
And ('the changes made in the wallboard are saved', () => {
    accessURL.saveWallboardChanges();
})
When ('the user navigates to the landing page', () => {
    accessURL.logo().click();
})
Then ('the user can delete the wallboard', () => {
    accessURL.deleteWallboard();
    cy.wait(1000);
})
//  ----------------------------------------------------------------------------------------------

// Scenario: Admin users can create read-only URLs for groups
Given ('a new group is created', () => {
    group.visitLandingPage();
    group.newGroupButton().click();
    group.newGroupTitle().clear().type('Unsaved URL');
    group.newStep().click();
    group.newEmptyStep().click();
    group.wallboardNameModal().first().click();
    group.modalButton().contains('Select').click();
    group.groupButton().contains('Save').click();
    group.confirmationButton().contains('Save').click();
})
And ('the user opens the group settings', () => {
    accessURL.settingsCog().click();
})
When ('the user clicks on the option to create a read-only URL for group', () => {
    accessURL.urlButtonGroup().click();
})
Then ('the group read-only URL is generated', () => {
    accessURL.getURL().invoke('val').then((text) => {
        unsavedUrlGroup = text
        cy.log(unsavedUrlGroup)
        .should('not.be.empty')
    })
})
And ('the option to copy the link for group becomes active', () => {
    accessURL.copyUrlButton().should('be.enabled');
})

// Scenario: Admin users can disable read-only URLs for groups
Given ('that the settings modal for a new group is displayed', () => {
    group.visitLandingPage();
    group.newGroupButton().click();
    group.newGroupTitle().clear().type('Disabled URL');
    group.newStep().click();
    group.newEmptyStep().click();
    group.wallboardNameModal().first().click();
    group.modalButton().contains('Select').click();
    group.groupButton().contains('Save').click();
    group.confirmationButton().contains('Save').click();
    cy.wait(2000);
})
And ('a group URL has been created', () => {
    accessURL.settingsCog().click();
    accessURL.urlButtonGroup().click();
    accessURL.getURL().invoke('val').then((text) => {
        disabledUrlGroup = text
        cy.log(disabledUrlGroup);
    })
})
And ('the user saves the URL and the group', () => {
    accessURL.saveSettingsModal().click();
    group.groupButton().contains('Save').click();
    group.confirmationButton().contains('Save').click();
    cy.wait(2000);
})
When ('the user selects the option to disable the group URL', () => {
    accessURL.settingsCog().click();
    accessURL.urlButtonGroup().click();
})
Then ('the group URL is no longer displayed', () => {
    accessURL.getURL().invoke('val').should('be.empty');
})
And ('the option to copy the group URL is inactive', () => {
    accessURL.copyUrlButton().should('be.disabled');
    accessURL.saveSettingsModal().click();
    group.groupButton().contains('Save').click();
    group.confirmationButton().contains('Save').click();
})


// Scenario: Generated read-only URL for group can be saved
Given ('that a new group is created', () => {
    group.visitLandingPage();
    group.newGroupButton().click();
    group.newGroupTitle().clear().type('Saved URL');
    group.newStep().click();
    group.newEmptyStep().click();
    group.wallboardNameModal().last().click();
    group.modalButton().contains('Select').click();
    group.groupButton().contains('Save').click();
    group.confirmationButton().contains('Save').click();
    cy.wait(2000);
})
And ('the user generates a group read-only URL', () => {
    accessURL.settingsCog().click();
    accessURL.urlButtonGroup().click();
    accessURL.getURL().invoke('val').then((text) => {
        savedUrlGroup = text
        cy.log(savedUrlGroup);
    })

})
And ('URL is saved', () => {
    accessURL.saveSettingsModal().click();
})
And ('the group changes are saved', () => {
    group.groupButton().contains('Save').click();
    group.confirmationButton().contains('Save').click();
})
When ('the user accesses the group URL', () => {
    cy.visit(savedUrlGroup);
})
Then ('the group is displayed in read-only mode', () => {
    cy.wait(1000);
    accessURL.verifyReadOnly().should('be.visible');
})

// Scenario: Generate read-only URL and delete the associated group
Given ('a group is created', () => {
    group.visitLandingPage();
    group.newGroupButton().click();
    group.newGroupTitle().clear().type('Deleted Group');
    group.newStep().click();
    group.newEmptyStep().click();
    group.wallboardNameModal().first().click();
    group.modalButton().contains('Select').click();
})
And ('associated read-only URL is generated', () => {
    accessURL.settingsCog().click();
    accessURL.urlButtonGroup().click();
    accessURL.getURL().invoke('val').then((text) => {
        deletedGroup = text
        cy.log(deletedGroup);
    })
    accessURL.saveSettingsModal().click();
})
And ('the changes made in the wallboard group are saved', () => {
    group.groupButton().contains('Save').click();
    group.confirmationButton().contains('Save').click();
    cy.wait(1000);
})
When ('the user navigates to the groups landing page', () => {
    group.logo().click();
    group.sideMenu();
    group.allGroupsFilter().click();
    group.closeMenu();
})
Then ('the user can delete the group', () => {
    accessURL.deleteWallboard();
    cy.writeFile("cypress/fixtures/readOnlyUrl.json", {unsavedWB: unsavedUrl, disabledWB: disabledUrl, savedWB: savedUrl, deletedUrl: deletedWB, unsavedGroup: unsavedUrlGroup, disabledGroup: disabledUrlGroup, savedGroup: savedUrlGroup, deletedGroupUrl: deletedGroup })
})