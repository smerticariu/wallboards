import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import CreateGroup_PO from "../../support/PageObjects/CreateGroup_PO";

const group = new CreateGroup_PO();
var title = ''
var content = ''


beforeEach(()=>{
    cy.login();
})

// Scenario: New wallboard group can be created
Given ('that the user is logged in', () => {
    group.visitLandingPage();
    group.pageTitle().should('contain', 'Recent Wallboards');
})
And ('the user selects the button to create a new wallboard group', () => {
    group.sideMenu();
    group.allGroupsFilter().click();
    group.closeMenu();
    group.pageTitle().should('contain', 'Recent Groups');
    group.newGroupButton().click();
})
And ('the user types in a new wallboard name', () => {
    group.newGroupTitle().clear().type('New Group 123');
})
And ('the user adds a wallboard on the wallboard group', () => {
    group.newStep().click();
    group.newEmptyStep().click();
    group.wallboardNameModal().first().click();
    group.modalButton().contains('Select').click();
})
And ('the user saves the wallboard group', () => {
    group.groupButton().contains('Save').click();
    group.confirmationButton().contains('Save').click();
    cy.wait(1000);
})
When ('the user navigates to the wallboard groups landing page', () => {
    group.logo().click();
    group.sideMenu();
    group.allGroupsFilter().click();
    group.closeMenu();
})
Then ('the newly created wallboard group is displayed', () => {
    group.groupsLanding().should('contain', 'New Group 123')
})

// Scenario Outline: Wallboard group name does not allow invalid characters
Given ('the group creation page is displayed', () => {
    group.visitLandingPage();
    group.newGroupButton().click();
    group.newStep().click();
    group.newEmptyStep().click();
    group.wallboardNameModal().first().click();
    group.modalButton().contains('Select').click();
})
And ('the user edits the wallboard group name by {string} the current name', (changing) => {
    if(changing == 'typing special characters for') {
        group.newGroupTitle().type(' $%&');
    }
    else if(changing == 'leaving empty') {
        group.newGroupTitle().clear();
    }
})
When ('the user attempts to save the changes', () => {
    group.groupButton().contains('Save').click();
    group.confirmationButton().contains('Save').click();
})
Then ('the user is informed that the name allows alphanumeric characters', () => {
    group.modalWarning().should('be.visible').and('contain', ' must contain only alphanumeric characters');
})

// Scenario: An empty wallboard group cannot be run
Given ('that the wallboard group creation page is displayed', () => {
    group.visitLandingPage();
    group.newGroupButton().click();
    group.newGroupTitle().clear().type('Empty Group');
})
And ('the user adds a new step', () => {
    group.newStep().click();
})
And ('no wallboard is added to the step', () => {
    // no action needed
})
When ('the user attempts to run the group', () => {
    group.groupButton().contains('Run');
})
Then ('the option to run the wallboard group is unavailable', () => {
    group.groupButton().contains('Run').should('have.css', 'background-color', 'rgb(204, 204, 204)');
})

// Scenario: Max 10 wallboards can be added to a wallboard groups
Given ('the page for wallboard group creation is displayed', () => {
    group.visitLandingPage();
    group.newGroupButton().click();
})
When ('the user adds 10 steps', () => {
    for(let i = 0; i < 10; i++) {
        group.newStep().click();
    }
})
Then ('the option to add a new step is unavailable', () => {
    group.newStep().should('not.exist');
})

// Scenario: Existing wallboard can be added to a wallboard group
Given ('the user navigates to wallboard group creation page', () => {
    group.visitLandingPage();
    group.newGroupButton().click();
})
And ('the user adds a new step', () => {
    group.newStep().click();
})
And ('the user adds an existing wallboard to the step', () => {
    group.newEmptyStep().click();
    group.wallboardNameModal().first().then(($el) => {
        title = $el.text();
        cy.log(title);
    })
    group.wallboardNameModal().first().click();
    group.modalButton().contains('Select').click();
})
And ('the user saves the wallboard group', () => {
    group.groupButton().contains('Save').click();
    group.confirmationButton().contains('Save').click();
})
When ('the user runs the group', () => {
    group.groupButton().contains('Run').invoke('removeAttr', 'target').click();
})
Then ('the selected wallboard is displayed', () => {
    group.readOnlyBar().should('contain', title);
})

// Scenario: Current wallboard selected can be changed
Given ('a wallboard group containing one wallboard is displayed', () => {
    group.visitLandingPage();
    group.newGroupButton().click();
    group.newStep().click();
    group.newEmptyStep().click();
    group.wallboardNameModal().first().click();
    group.modalButton().contains('Select').click();
})
And ('the user navigates to view the screen options', () => {
    group.screenOptionsCog().click();
})
And ('the user selects the option to change current wallboard', () => {
    group.screenOption().contains('Change Current Wallboard').click();
})
When ('the user selects another wallboard', () => {
    group.wallboardNameModal().last().then(($el) => {
        title = $el.text();
        cy.log(title);
    })
    group.wallboardNameModal().last().click();
    group.modalButton().contains('Select').click();
})
Then ('the selected wallboard is displayed on the step', () => {
    group.stepFooterWB().should('contain', title);
})

// Scenario Outline: Currently selected wallboard can be removed
Given ('that a wallboard group containing one wallboard is displayed', () => {
    group.visitLandingPage();
    group.newGroupButton().click();
    group.newStep().click();
    group.newEmptyStep().click();
    group.wallboardNameModal().first().then(($el) => {
        title = $el.text();
        cy.log(title);
    })
    group.wallboardNameModal().first().click();
    group.modalButton().contains('Select').click();
})
And ('the user navigates to open screen options', () => {
    group.screenOptionsCog().click();
})
And ('the user selects the option to remove current wallboard', () => {
    group.screenOption().contains('Remove Current Wallaboard').click();
    group.removeModalTitle().should('contain', 'Removing Wallboard');
})
When ('the user selects to {string} the modal', (option) => {
    if(option == 'confirm') {
        group.removeButton().contains('Ok').click();
    }
    else if(option == 'cancel') {
        group.removeButton().contains('Cancel').click();
    }
})
Then ('the wallboard is {string} displayed on the group', (option2) => {
    if(option2 == 'no longer') {
        group.step().should('not.contain', title);
    }
    else if(option2 == 'still') {
        group.step().should('contain', title);
    }
})

// Scenario: Wallboard group steps can be removed
Given ('the wallboard group containing one wallboard is displayed', () => {
    group.visitLandingPage();
    group.newGroupButton().click();
    group.newStep().click();
    group.newEmptyStep().click();
    group.wallboardNameModal().first().click();
    group.modalButton().contains('Select').click();
})
And ('the user adds a new empty step', () => {
    group.newStep().click();
})
When('the user removes both steps', () => {
    group.screenOptionsCog().click();
    group.screenOption().contains('Remove this Step').click();
    group.removeModalTitle().should('contain', 'Removing Step');
    group.removeButton().contains('Ok').click();

    group.emptyStepCog().click();
    group.screenOption().contains('Remove this Step').click();
    group.removeModalTitle().should('contain', 'Removing Step');
    group.removeButton().contains('Ok').click();

})
Then ('the steps are no longer displayed on the group', () => {
    group.step().should('not.exist');
})

// Scenario: Speific amount to time can be set for a wallboard to be displayed in a wallboard group
Given ('the wallboard group creation page is displayed', () => {
    group.visitLandingPage();
    group.newGroupButton().click();
})
And ('the user adds 2 steps', () => {
    group.newStep().click();
    group.newStep().click();
})
And ('the user adds a different wallboard to each step', () => {
    group.newEmptyStep().first().click();
    group.wallboardNameModal().first().then(($el) => {
        title = $el.text();
        cy.log(title + ' first wallboard')
    })
    group.wallboardNameModal().first().click();
    group.modalButton().contains('Select').click();

    group.newEmptyStep().last().click();
    group.wallboardNameModal().last().then(($el) => {
        content = $el.text();
        cy.log(content + ' last wallboard')
    })
    group.wallboardNameModal().last().click();
    group.modalButton().contains('Select').click();

})
And ('the user sets the same specific time for the wallboard to be displayed', () => {
    group.seconds().first().clear().type('1');
    group.seconds().last().clear().type('1');
})
And ('the user saves the group configuration', () => {
    group.groupButton().contains('Save').click();
    group.confirmationButton().contains('Save').click();
})
When ('the user runs the group', () => {
    group.groupButton().contains('Run').invoke('removeAttr', 'target').click();
    cy.wait(2000);
})
Then ('the wallboards are displayed one at a time for the amount of time selected by the user', () => {
    group.readOnlyBar().should('contain', title);
    cy.wait(10000);
    group.readOnlyBar().should('contain', content);
})

// Scenario Outline: The user is informed about unsaved changes when leaving group creation page
Given ('the new wallboard group page is displayed', () => {
    group.visitLandingPage();
    group.newGroupButton().click();
})
And ('new changes are made', () => {
    group.newGroupTitle().clear().type('New Name');
    group.newStep().click();
    group.newEmptyStep().click();
    group.wallboardNameModal().first().click();
    group.modalButton().contains('Select').click();
})
When ('the user {string} to leave the page', (navigates) => {
    if(navigates == 'selects the close button') {
        group.groupButton().contains('Close').click();
    }
    else if(navigates == 'selects the Natterbox logo button') {
        group.logo().click();
    }
})
Then ('the user is informed that the changes are unsaved', () => {
    group.modalWarning().should('be.visible').and('contain', 'unsaved changes in your Wallboard Group');
})