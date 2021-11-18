import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import RemoveComponent_PO from '../../support/PageObjects/RemoveComponent_PO';

beforeEach(() => {

        //cy.clearLocalStorage()
        cy.login()
        //cy.log("Login Successful")
})
const removeComponent_PO = new RemoveComponent_PO
let numberOfComponents = 0
let newNumberOfComponents = 0

//Scenario Outline: The user is asked to confirm component removal
Given('the wallboard creation page is displayed', () => {
        removeComponent_PO.visitLandingPage();
        removeComponent_PO.newWallboardButton().click();
})
And("the user adds a new component of {string} view", (type) => {
        removeComponent_PO.addComonentButton().click();
        removeComponent_PO.selectAgentList();
        removeComponent_PO.selectType(type);
        removeComponent_PO.addComponentModal().click();
})
When('the user removes the component', () => {
        removeComponent_PO.removeButton().click();
})
Then('a confirmation pop-up is displayed', () => {
        removeComponent_PO.removalConfirmation().should('be.visible').and('contain', 'sure you want to delete')
})

//Scenario: Removing components is only available from wallboard edit mode1

Given('the page for wallboard creation is displayed', () => {
        removeComponent_PO.visitLandingPage();
        removeComponent_PO.newWallboardButton().click();
})
And('the user adds component', () => {
        removeComponent_PO.addComonentButton().click();
        removeComponent_PO.selectAgentList();
        removeComponent_PO.addComponentModal().click();
})
And('the user saves the wallboard', () => {
        removeComponent_PO.saveWallboard();
})
When('the user runs the wallboard', () => {
        removeComponent_PO.runButton().invoke('removeAttr', 'target').click();
})
Then('the option to remove the component is not available', () => {
        removeComponent_PO.removeButton().should('not.exist');
})

//Scenario: Wallboard component is removed after removal confirmation

Given('the wallboard edit mode view is displayed', () => {
        removeComponent_PO.visitLandingPage();
        removeComponent_PO.firstEditButton().invoke('removeAttr', 'target').click();
})
And('the user adds a new component', () => {
        removeComponent_PO.addComonentButton().click();
        removeComponent_PO.selectAgentList();
        removeComponent_PO.addComponentModal().click();
        removeComponent_PO.wallboardComponents().then((component) => {
                numberOfComponents = component.length;
                cy.log(numberOfComponents);
        })
})
And('the component is removed', () => {
        removeComponent_PO.removeButton().first().click();
})
When('the user confirms deleting the component', () => {
        removeComponent_PO.deleteButton().click();
})
Then('the component is no longer displayed', () => {
        removeComponent_PO.wallboardComponents().then((newComponent) => {
                newNumberOfComponents = newComponent.length;
                expect(newNumberOfComponents).to.eq(numberOfComponents - 1);
        })
})

//Scenario: Component is not removed when confirmation message is dismissed

Given('the edit mode view for a wallboard is displayed', () => {
        removeComponent_PO.visitLandingPage();
        removeComponent_PO.firstEditButton().invoke('removeAttr', 'target').click();
})
And('the user adds a component', () => {
        removeComponent_PO.addComonentButton().click();
        removeComponent_PO.selectAgentList();
        removeComponent_PO.addComponentModal().click();
        removeComponent_PO.wallboardComponents().then((component) => {
                numberOfComponents = component.length;
                cy.log(numberOfComponents);
        })
})
And('the user requests to remove the component', () => {
        removeComponent_PO.removeButton().first().click();
})
When('the user cancels the message for deleting the component', () => {
        removeComponent_PO.cancelRemovalButton().click();
})
Then('the component remains displayed', () => {
        removeComponent_PO.wallboardComponents().then((newComponent) => {
                newNumberOfComponents = newComponent.length;
                expect(newNumberOfComponents).to.eq(numberOfComponents);
        })
})