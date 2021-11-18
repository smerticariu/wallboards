import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import CreateWallboard from "../../support/PageObjects/CreateWallboard";



const wallboard = new CreateWallboard();
var init_url = ''


beforeEach(()=>{
    cy.login()
    cy.log('Login successful')
})

// Scenario: The user is redirected to wallboard creation page when requesting to create a new wallboard

Given ('the landing page is displayed', () => {
    wallboard.visitLandingPage();
})

When ('the user clicks on the button for new wallboard', () => {
    wallboard.newWallButton().click();
    
})

Then ('the new wallboard creation page is displayed', () => {
    wallboard.wallboardPageText1()
    .contains('This wallboard has no components.')
    wallboard.wallboardPageText2()
    .contains('To start adding components, click the button below.')
})


// Scenario: The new wallboard name allows alphanumeric characters
Given ('the wallboard creation page is displayed', () => {
    wallboard.visitLandingPage();
    wallboard.newWallButton().click();

})

When ('the user clicks on the “My New Wallboard” field', () => {
    wallboard.wallboardTitle().clear()
})

And('the user inputs the desired wallboard name consisting of alphanumeric characters', () =>{
    wallboard.wallboardTitle().type('The first automated test for Title321')
})

And('the user saves the wallboard', () =>{
    wallboard.saveButton().click()
    wallboard.saveButtonAlert().click();
    cy.intercept('PUT').as('request')
    cy.wait(1000)
})


Then ('the desired wallboard name is displayed for the new wallboard created', () => {
    wallboard.visitLandingPage();
    wallboard.firstcolumntext().contains('The first automated test for Title321')
})


// Scenario: The new wallboard name does not allow invalid characters
Given ('the wallboard creation page is displayed', () => {
    wallboard.visitLandingPage();
    wallboard.newWallButton().click();

})

When ('the user clicks on the “My New Wallboard” field', () => {
    wallboard.wallboardTitle().clear()
})

And('the user types in special characters', () =>{
    wallboard.wallboardTitle().type('#$@$#@e')
})

And('the user saves the wallboard', () =>{
    wallboard.saveButton().click()
})


Then ('the user is informed that the wallboard name allows only alphanumeric characters', () => {
    wallboard.alert().should('contain', 'name must contain only alphanumeric characters')
})

// Scenario: The new wallboard name cannot be empty
Given ('the wallboard creation page is displayed', () => {
    wallboard.visitLandingPage();
    wallboard.newWallButton().click();

})

When ('the user clicks on the “My New Wallboard” field', () => {
    wallboard.wallboardTitle()
})

And('the user deletes the content of the wallboard name field', () =>{
    wallboard.wallboardTitle().clear()
})

And('the user saves the wallboard', () =>{
    wallboard.saveButton().click()
})


Then ('the user is informed that the wallboard name cannot be empty', () => {
    wallboard.alert().should('contain', 'name must contain only alphanumeric characters')
})

// Scenario: A new agent list wallboard can be created using default options
Given('the wallboard creation page is displayed', () => {
    wallboard.visitLandingPage();

})

And('the user clicks the new wallboard button', () =>{
    wallboard.newWallButton().click();

})

And('the user clicks the add component button', () =>{
    wallboard.addComponent().click();
    cy.url().then(($URL) => {
        init_url = $URL
    })
})

And('the user selects the agent list component', () =>{
    wallboard.selectAgentList().click();
})

And('the user clicks on the add component button', () =>{
    wallboard.selectButton().click();
    wallboard.addButton().click();
})

When('the user saves the wallboard', () => {
    wallboard.saveButton().click();
})

Then('the new wallboard is saved', () => {
    wallboard.notificationMessage().contains('The Wallboard was successfully saved')
})

And('the user remains on the same page', () => {
    cy.url().then(($URL) => {
        expect($URL).to.include(init_url)
    })
})

// Scenario: Wallboard can be run from edit mode
Given('the wallboard creation page is displayed', () => {
    wallboard.visitLandingPage();
    wallboard.newWallButton();

})

And('the user adds a component', () =>{
    wallboard.addComponent().click();
    wallboard.selectAgentList().click();
    wallboard.selectButton().click();
    wallboard.addButton().click();

})

And('the user saves the new wallboard', () =>{
    wallboard.saveButton().click()
    wallboard.alert().contains('Changes made so far will be lost and this version will be the final version')
    wallboard.saveButtonAlert().click()
})

When('the user clicks on the run button', () => {
    wallboard.runButton()

})

Then('the wallboard opens in a new browser window', () => {
    wallboard.runButton().should('have.attr', 'target', '_blank')
})


// Scenario: Blank wallboard cannot be run
Given('the landing page is displayed', () => {
    wallboard.visitLandingPage();
    

})

And('the user clicks on the button for new wallboard', () =>{
    wallboard.newWallButton();

})

And('the user saves the wallboard that has been created', () =>{
    wallboard.saveButton().click()
    wallboard.alert().contains('Changes made so far will be lost and this version will be the final version')
    wallboard.saveButtonAlert().click()
})

When('the user inspects the run button', () => {
    wallboard.runButton()

})

Then('the run button is greyed out', () => {
    wallboard.runButton().should('have.css', 'background-color', 'rgb(204, 204, 204)')
})