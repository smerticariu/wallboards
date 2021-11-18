import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import UndoRedo_PO from '../../support/PageObjects/UndoRedo_PO';


beforeEach(() => {

    //cy.clearLocalStorage()
    cy.login()
    //cy.log("Login Successful")
})


const undoRedo_PO = new UndoRedo_PO();
var originalName = ''
var originalDescription = ''
var componentsNumber = 0
var editedName = ''
var editedDescription = ''
var element = ''


// Scenario: Original wallboard attributes are displayed when undo button is selected
Given ('the edit mode for a wallboard with one card component view is displayed', () => {
    undoRedo_PO.createWallboard();
    undoRedo_PO.editButton().invoke('removeAttr', 'target').click();
    undoRedo_PO.getWallboardName().invoke('val').then((text) => {
        originalName = text;
        cy.log(originalName);
    })

})
And ('the user edits the wallboard name by adding one valid character', () => {
    undoRedo_PO.editWallboardName();
})
And ('the user edits to switch the component view to table view', () => {
    undoRedo_PO.editComponentView();
})
And ('the user adds a new component', () => {
    undoRedo_PO.addComponent();
})
And ('the user edits the wallboard description', () => {
    undoRedo_PO.settingsButton().click();
    undoRedo_PO.getWallboardDescription().invoke('val').then((text) => {
        originalDescription = text;
        cy.log(originalDescription);
    })
    undoRedo_PO.editDescription();
})
And ('the user creates a read-only URL', () => {
    undoRedo_PO.UrlButton().contains('Create').click();
})
And ('the settings modal is saved', () => {
    undoRedo_PO.saveSettingsModal();
})
And ('the user removes one component', () => {
    undoRedo_PO.removeComponent();
})
When ('the user clicks the undo button 5 times', () => {
    let i = 0;
    for (i; i < 5; i++) {
        undoRedo_PO.undoButton().click();
    }
})
Then ('the original wallboard name, component type view, number of components displayed, wallboard description, and URL state are displayed', () => {
    undoRedo_PO.getWallboardName().invoke('val').then((newtext) => {
        expect(newtext).to.eq(originalName);
    })
    undoRedo_PO.tableBody().should('not.exist');

    undoRedo_PO.getComponents().then((components) => {
        componentsNumber = components.length;
        expect(componentsNumber).to.eq(1);
    })
    undoRedo_PO.settingsButton().click();
    undoRedo_PO.getWallboardDescription().then((description) => {
        expect(description.val()).to.eq(originalDescription);
    })
    undoRedo_PO.UrlButton().should('have.css', 'background-color', 'rgb(11, 92, 171)').and('contain', 'Create');
})

// Scenario: Edited wallboard attributes are displayed when redo button is selected

Given ('that the edit mode for a wallboard with one card component view is displayed', () => {
    undoRedo_PO.visitLandingPage();
    cy.wait(3000)
    undoRedo_PO.editButton().invoke('removeAttr', 'target').click();
})
And ('the wallboard name is edited by adding one valid character', () => {
    undoRedo_PO.editWallboardName();
    undoRedo_PO.getWallboardName().invoke('val').then((text) => {
        editedName = text;
        cy.log(editedName);
    })
})
And ('the component view is switched to table view', () => {
    undoRedo_PO.editComponentView();
})
And ('a new component is added', () => {
    undoRedo_PO.addComponent();
})
And ('the wallboard description is edited', () => {
    undoRedo_PO.settingsButton().click();
    undoRedo_PO.editDescription();
    undoRedo_PO.getWallboardDescription().invoke('val').then((text) => {
        editedDescription = text;
        cy.log(editedDescription);
    })
})
And ('the user creates an URL', () => {
    undoRedo_PO.UrlButton().contains('Create').click();
})
And ('the modal settings are saved', () => {
    undoRedo_PO.saveSettingsModal();
})
And ('one component is removed', () => {
    undoRedo_PO.removeComponent();
})
And ('the user clicks the undo button 5 times', () => {
    let i = 0;
    for (i; i < 5; i++) {
        undoRedo_PO.undoButton().click();
    }
})
When ('the user clicks the redo button 5 times', () => {
    let i = 0;
    for (i; i < 5; i++) {
        undoRedo_PO.redoButton().click();
    }
})
Then ('the edited wallboard name, one component, edited wallboard description, and changed URL state are displayed', () => {
    undoRedo_PO.getWallboardName().invoke('val').then((newtext) => {
        expect(newtext).to.eq(editedName);
    })
    undoRedo_PO.getComponents().then((components) => {
        componentsNumber = components.length;
        expect(componentsNumber).to.eq(1);
    })
    undoRedo_PO.settingsButton().click();
    undoRedo_PO.getWallboardDescription().then((description) => {
        expect(description.val()).to.eq(editedDescription);
    })
    undoRedo_PO.UrlButton().should('have.css', 'background-color', 'rgb(204, 204, 204)').and('contain', 'Disable');
})

// Scenario: Undo and Redo buttons get disabled when the changes are saved

Given ('the wallboard edit mode is displayed', () => {
    undoRedo_PO.visitLandingPage();
    cy.wait(3000)
    undoRedo_PO.editButton().invoke('removeAttr', 'target').click();
})
And ('the user edits the wallboard name', () => {
    undoRedo_PO.editWallboardName();
})
And ('the user adds a component', () => {
    undoRedo_PO.addComponent();
})
And ('the user clicks the undo button once', () => {
    undoRedo_PO.undoButton().click();
})
When ('the user saves the wallboard', () => {
    undoRedo_PO.saveWallboard();
})
Then ('both undo and redo buttons are disabled', () => {
    undoRedo_PO.undoButton().should('be.disabled');
    undoRedo_PO.redoButton().should('be.disabled');
})