import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import EditCopyDelete_PO from '../../support/PageObjects/EditCopyDelete_PO';
import CreateGroup_PO from "../../support/PageObjects/CreateGroup_PO";


beforeEach(() => {
    cy.login()
})

const group = new CreateGroup_PO();
const editCopyDelete_PO = new EditCopyDelete_PO();
var wallboardText = ''
var deletedWallboard = ''
var notDeletedWallboard = ''
var hrefAttr = ''
var firstURL = ''
var originalDescription = ''
var title = ''

Given('the landing page is displayed', () => {
    editCopyDelete_PO.visitLandingPage();
})

And('the user selects the option to edit the wallboard', () => {
    editCopyDelete_PO.editButton().invoke('removeAttr', 'target').first().click();
    cy.url().then((url) => {
        firstURL = url
        cy.log(firstURL)
      });
})

And('the user adds a new component', () => {
    editCopyDelete_PO.addDefaultAgentList();
})

When('the user saves the changes', () => {
     editCopyDelete_PO.saveChanges();
})

Then('the user is informed that the changes are successfully saved', () => {
    editCopyDelete_PO.deleteMessage().should('contain', 'The Wallboard was successfully saved');
})

And('the user remains on the same page', () => {
    cy.url().then((newUrl) => {
        expect(newUrl).to.contain(firstURL)
      });
})
// --------------------------------------------------
Given ('a wallboard containing at least one component exists', () => {
    editCopyDelete_PO.create1ComponentWallboard();
    cy.wait(3000);
})

And ('the user edits the existing wallboard component options', () => {
    editCopyDelete_PO.editButton().invoke('removeAttr', 'target').first().click();
    cy.url().then((url) => {
        firstURL = url
        cy.log(firstURL)
      });
    editCopyDelete_PO.editComponent();
})

When ('the user navigates to save the edit made', () => {
    editCopyDelete_PO.saveChanges();
})

Then ('the user is informed that the edit is successfully saved', () => {
    editCopyDelete_PO.deleteMessage().should('contain', 'The Wallboard was successfully saved');
})

And ('the edit page remains displayed', () => {
    cy.url().then((newUrl) => {
        expect(newUrl).to.contain(firstURL)
      });

})
And ('the edit mode grid is visible', () => {
    cy.get('.c-grid').should('be.visible');
})

//-----------------------------------------
Given('the landing page is displayed', () => {
    editCopyDelete_PO.visitLandingPage();
})

And('the user clicks the option to edit the wallboard', () => {
    editCopyDelete_PO.editButton().invoke('removeAttr', 'target').first().click()
    cy.url().then((url) => {
        firstURL = url
        cy.log(firstURL)
      });
})

And('the user edits the wallboard name', () => {
    editCopyDelete_PO.wallboardNameInput().clear().type('Edited Name')

})
When('the user saves the name changed', () => {
    editCopyDelete_PO.saveChanges();
})

Then('the user is informed that the new change is successfully saved', () => {
    editCopyDelete_PO.deleteMessage().should('contain', 'The Wallboard was successfully saved');
})

And('the user is still on the same page', () => {
    cy.url().then((newUrl) => {
        expect(newUrl).to.contain(firstURL)
      });
    editCopyDelete_PO.close();
})

//Scenario: Existing wallboard name can be edited from wallboard settings [NEW]

Given('that a wallboard is open in edit mode', () => {
    editCopyDelete_PO.visitLandingPage();
    cy.wait(3000)
    editCopyDelete_PO.firstWallboardName().first().invoke('text').then((text) => {
        wallboardText = text
        cy.log(wallboardText);
    })
    editCopyDelete_PO.editButton().first().invoke('removeAttr', 'target').click();

})
And('the user opens the settings modal', () => {
    editCopyDelete_PO.settingsCog().click();
})
And('the user edits the wallboard name using valid characters', () => {
    editCopyDelete_PO.settingsWallboardName().type(' new edits');
})
And('the user saves the edit', () => {
    editCopyDelete_PO.saveSettings().click();
})
And('the user saves the wallboard change', () => {
    editCopyDelete_PO.saveChanges();
})
When('the user navigates to the landing page', () => {
    cy.wait(3000);
    editCopyDelete_PO.close().click();
})
Then('the edited wallboard name is displayed', () => {
    cy.wait(5000);
    editCopyDelete_PO.firstWallboardName().first().then((newtext) => {
        expect(newtext.text()).to.eq(wallboardText  + ' new edits');
    })
})

// Scenario: Edited wallboard name cannot contain invalid characters [NEW]

Given('a wallboard is open in edit mode', () => {
    editCopyDelete_PO.visitLandingPage();
    editCopyDelete_PO.editButton().first().invoke('removeAttr', 'target').click();
})
And('the settings modal is opened', () => {
    editCopyDelete_PO.settingsCog().click();
})
And('the user edits the wallboard name using invalid characters', () => {
    editCopyDelete_PO.settingsWallboardName().type('!@#');
    editCopyDelete_PO.saveSettings().click();
})
When('the user attempts to save the edit', () => {
    editCopyDelete_PO.saveChanges();
})
Then('the user is warned that the wallboard name must be alphanumeric', () => {
    editCopyDelete_PO.invalidNameWarning().should('be.visible').and('contain', 'name must contain only alphanumeric characters');
})

//-------------------------------------------------------------------------
Given ('the landing page is displayed', () => {
    editCopyDelete_PO.visitLandingPage();
    cy.wait(3000);
})

When('the user selects the option to copy a wallboard', () => {
    editCopyDelete_PO.firstWallboardName().first().invoke('text').then((text) => {
        wallboardText = text
        cy.log(wallboardText);
    })
    editCopyDelete_PO.copyButton().first().click()
})

Then('a new wallboard is created, its name containing the original name + Copy word', () => {
    cy.wait(5000)
    editCopyDelete_PO.firstWallboardName().first().then((newText) => {
        expect(newText.text()).to.contain(wallboardText + ' Copy')
    })
})
//--------------------------------------------------
Given('the landing page is displayed', () => {
    editCopyDelete_PO.visitLandingPage()
})

When ('the user selects the option to delete the wallboard', () => {
    editCopyDelete_PO.deleteButton().first().click()
})

Then ('the user is requested to confirm the deletion', () => {
    editCopyDelete_PO.deleteModal().should('be.visible');
    editCopyDelete_PO.deleteModal().should('contain.text', 'Are you sure you want to delete this wallboard?')
})
//-------------------------------------------------
Given ('the wallboard landing page is displayed', () => {
    editCopyDelete_PO.visitLandingPage();
})
And('the user selects the delete option', () => {
    editCopyDelete_PO.firstWallboardName().first().invoke('text').then((delText) => {
        deletedWallboard = delText
        cy.log(deletedWallboard);
    })
    editCopyDelete_PO.deleteButton().first().click()
})
When('the user confirms deleting the wallboard', () => {
    editCopyDelete_PO.deleteButtonModal().click()
})
Then('the user is informed that the wallboard is deleted', () => {
    editCopyDelete_PO.deleteMessage().should('contain', 'The wallboard was successfully deleted');
})
And ('the wallboard is no longer displayed on the landing page', () => {
    cy.wait(3000)
    editCopyDelete_PO.firstWallboardName().first().then((newDelText) => {
        expect(newDelText.text()).not.to.eq(deletedWallboard)
    })
})
//------------------------------------------------
Given ('the landing page is displayed', () => {
    editCopyDelete_PO.visitLandingPage();

})
And ('the user navigates to delete a wallboard', () => {
    editCopyDelete_PO.firstWallboardName().first().invoke('text').then((notDelText) => {
        notDeletedWallboard = notDelText
        cy.log(notDeletedWallboard);
    })
    editCopyDelete_PO.deleteButton().first().click()
})
When ('the user cancels the confirmation message', () => {
    editCopyDelete_PO.cancelButton().click();
})
Then ('the confirmation message closes', () => {
    editCopyDelete_PO.deleteModal().should('not.exist');
})
And('the wallboard remains displayed on the landing page', () => {
    editCopyDelete_PO.firstWallboardName().first().then((newnotDelText) => {
        expect(newnotDelText.text()).to.eq(notDeletedWallboard);
    })

})
//------------------------------------------------------------------
Given ('the wallboards landing page is displayed', () => {
    editCopyDelete_PO.visitLandingPage();
})
When ('the user clicks a wallboard name', () => {
    editCopyDelete_PO.firstWallboardName().invoke('attr', 'target').then((attribute) => {
        hrefAttr = attribute;
        cy.log(hrefAttr);
    });
    editCopyDelete_PO.firstWallboardName().first().invoke('removeAttr', 'target').click();
    
})
Then ('a new page launches displaying the wallboard in view mode', () => {
    expect(hrefAttr).to.include('blank');
    cy.get('.c-wallboard--read-only').should('be.visible');
})

//Scenario: Read only mode view displays wallboard components as in the edit mode view [NEW]

Given ('the page to create a new wallboard is displayed', () => {
    editCopyDelete_PO.creationPage();
})
And ('the user adds a table type agent list component', () => {
    editCopyDelete_PO.addTableComponent();
})
And ('the user adds a card type agent list component', () => {
    editCopyDelete_PO.addCardComponent();
})
And ('the user saves the wallboard', () => {
    editCopyDelete_PO.saveChanges();
})
When ('the user runs the wallboard', () => {
    editCopyDelete_PO.runButton().invoke('removeAttr', 'target').click();
})
Then ('the table type component is displayed on top of card type component', () => {
    editCopyDelete_PO.componentBodies().first().children().should('have.class', 'widget__body widget__body--table');
})

//Scenario: Wallboard settings is only available in edit mode view [NEW]

Given ('a wallboard is created', () => {
    editCopyDelete_PO.create1ComponentWallboard();
})
When ('the wallboard is opened in read only mode', () => {
    editCopyDelete_PO.firstWallboardName().first().invoke('removeAttr', 'target').click({force:true})
})
Then ('the settings option is not present on the read only mode view', () => {
    editCopyDelete_PO.settingsCog().should('not.exist');
})

//Scenario: New wallboard description can be added [NEW]

Given ('the new wallboard page is displayed', () => {
    editCopyDelete_PO.creationPage();
})
And ('the settings modal is opened', () => {
    editCopyDelete_PO.settingsCog().click();
})
And ('the user added a new wallboard description', () => {
    editCopyDelete_PO.settingsWallboardDescription().clear().type('test description');
})
And ('the user saved the wallboard new settings', () => {
    editCopyDelete_PO.saveSettings().click();
    editCopyDelete_PO.saveChanges();
})
When ('the user goes to the landing page', () => {
    cy.wait(3000);
    editCopyDelete_PO.close().click();
})
Then ('the new wallboard description is displayed', () => {
    editCopyDelete_PO.wallboardDescription().first().invoke('text').then((text) => {
        expect(text).to.eq('test description');
    })
})

//Scenario: Existing wallboard description can be edited [NEW]
Given ('an existing wallboard is opened in edit mode', () => {
    editCopyDelete_PO.visitLandingPage();
    editCopyDelete_PO.wallboardDescription().first().invoke('text').then((text) => {
        originalDescription = text
        cy.log(originalDescription)
    })
    editCopyDelete_PO.editButton().first().invoke('removeAttr', 'target').click();
})
And ('the settings modal is displayed', () => {
    editCopyDelete_PO.settingsCog().click();
})
And ('the user edits the wallboard description', () => {
    editCopyDelete_PO.settingsWallboardDescription().type(' 2nd description');
})
And ('the changes made are saved', () => {
    editCopyDelete_PO.saveSettings().click();
    editCopyDelete_PO.saveChanges();
})
When ('the user clicks on the button to navigate to the landing page', () => {
    cy.wait(3000);
    editCopyDelete_PO.close().click();
})
Then ('the new edited name is displayed', () => {
    editCopyDelete_PO.wallboardDescription().first().invoke('text').then((text) => {
        expect(text).to.eq(originalDescription + ' 2nd description');
    })
})

// Scenario: New wallboard can be added to existing wallboard group
Given ('that the wallboards landing page is displayed', () => {
    group.visitLandingPage();
    group.pageTitle().should('contain', 'Recent Wallboards');
    group.createGroup();
})
And ('the user navigates to view the wallboard groups', () => {
    group.sideMenu();
    group.allGroupsFilter().click();
    group.closeMenu();
    group.pageTitle().should('contain', 'Recent Groups');
})
And ('the user selects the edit option for a group', () => {
    editCopyDelete_PO.editButton().first().invoke('removeAttr', 'target').click();
})
And ('the user adds a new wallboard', () => {
    group.newStep().click();
    group.newEmptyStep().first().click();
    group.wallboardNameModal().first().then(($el) => {
        title = $el.text();
        cy.log(title);
    })
    group.wallboardNameModal().first().click();
    group.modalButton().contains('Select').click();
})
When ('the user saves the changes', () => {
    group.groupButton().contains('Save').click();
    group.confirmationButton().contains('Save').click();
})
Then ('the new wallboard selected is displayed on the group', () => {
    group.stepFooterWB().should('contain', title);
})

// Scenario: Existing wallboard group name can be edited
Given ('the page with all wallboard groups is displayed', () => {
    group.visitLandingPage();
    group.sideMenu();
    group.allGroupsFilter().click();
    group.closeMenu();
    group.pageTitle().should('contain', 'Recent Groups');
})
And ('the user selects the option to edit a group', () => {
    editCopyDelete_PO.editButton().first().invoke('removeAttr', 'target').click();
})
And ('the user edits the group name', () => {
    group.newGroupTitle().clear().type('2nd Group Name');
})
And ('the user saves the change', () => {
    group.groupButton().contains('Save').click();
    group.confirmationButton().contains('Save').click();
    cy.wait(1000);
})
When ('the user navigates to view all groups', () => {
    group.logo().click();
    group.sideMenu();
    group.allGroupsFilter().click();
    group.closeMenu();
})
Then ('the edited name is displayed', () => {
    editCopyDelete_PO.firstWallboardName().first().should('contain', '2nd Group Name');
})

// Scenario: Existing wallboard group description can be edited
Given ('the page with all groups is displayed', () => {
    group.visitLandingPage();
    group.sideMenu();
    group.allGroupsFilter().click();
    group.closeMenu();
    group.pageTitle().should('contain', 'Recent Groups');
})
And ('the user clicks on the option to edit a group', () => {
    editCopyDelete_PO.editButton().first().invoke('removeAttr', 'target').click();
})
And ('the user edits the group description', () => {
    editCopyDelete_PO.settingsCog().click();
    editCopyDelete_PO.settingsWallboardDescription().clear().type('Newest Group Description');
    editCopyDelete_PO.saveSettings().click();
})
And ('the user saves the description changes', () => {
    group.groupButton().contains('Save').click();
    group.confirmationButton().contains('Save').click();
    cy.wait(1000);
})
When ('the user navigates to view all wallboard groups', () => {
    group.logo().click();
    group.sideMenu();
    group.allGroupsFilter().click();
    group.closeMenu();
})
Then ('the edited description is displayed', () => {
    editCopyDelete_PO.wallboardDescription().first().should('contain', 'Newest Group Description')
})

// Scenario: Editing group configuration options is unavailable in read-only mode
Given ('a wallboard group is opened in read-only mode', () => {
    group.visitLandingPage();
    group.sideMenu();
    group.allGroupsFilter().click();
    group.closeMenu();
    editCopyDelete_PO.firstWallboardName().first().invoke('removeAttr', 'target').click();
    cy.wait(2000);
})
When ('the user inspects the options to edit group configuration', () => {
    group.readOnlyContent().should('be.visible');
})
Then ('the option to add a new step, to edit group name, to edit group description are unavailable', () => {
    group.newStep().should('not.exist');
    group.newGroupTitle().should('not.exist');
    editCopyDelete_PO.settingsCog().should('not.exist');
})

// Scenario: Existing wallboard group can be copied
Given ('that all wallboard groups page is displayed', () => {
    group.visitLandingPage();
    group.sideMenu();
    group.allGroupsFilter().click();
    group.closeMenu();
    group.pageTitle().should('contain', 'Recent Groups');
})
When ('the user copies the first wallboard', () => {
    editCopyDelete_PO.firstWallboardName().first().then(($el) => {
        title = $el.text();
    })
    editCopyDelete_PO.copyButton().first().click();
    cy.wait(2000);
})
Then ('a copy of the first wallboard is displayed', () => {
    editCopyDelete_PO.firstWallboardName().first().then(($el) => {
        expect($el.text()).to.contain(title + ' Copy');
    })
})

// Scenario: Existing wallboard group can be deleted
Given ('that the page containing all wallboard groups is displayed', () => {
    group.visitLandingPage();
    group.sideMenu();
    group.allGroupsFilter().click();
    group.closeMenu();
    group.pageTitle().should('contain', 'Recent Groups');
})
When ('the user deletes the first wallboard group displayed', () => {
    editCopyDelete_PO.firstWallboardName().first().then(($el) => {
        title = $el.text();
    })

    editCopyDelete_PO.deleteButton().first().click();
    editCopyDelete_PO.deleteButtonModal().click();
    cy.wait(1000);
})
Then ('the wallboard group is no longer displayed', () => {
    editCopyDelete_PO.firstWallboardName().each(($el) => {
        expect($el).to.not.contain(title);
    })
})

// Scenario: Existing wallboard group can be opened in read-only mode
Given ('that the page for all wallboard groups is displayed', () => {
    group.visitLandingPage();
    group.sideMenu();
    group.allGroupsFilter().click();
    group.closeMenu();
    group.pageTitle().should('contain', 'Recent Groups');
})
When ('the user selects the first group displayed', () => {
    editCopyDelete_PO.firstWallboardName().first().invoke('removeAttr', 'target').click();
})
Then ('the wallboard group opens in read-only mode', () => {
    group.readOnlyContent().should('be.visible');
})