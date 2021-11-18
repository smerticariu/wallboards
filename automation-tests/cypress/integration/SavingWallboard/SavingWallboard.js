import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import SavingWallboard from "../../support/PageObjects/SavingWallboard_PO";



const saving = new SavingWallboard();
var landing_page_url = ''

beforeEach(()=>{
    cy.login()
    cy.log('Login successful')
})


// Scenario Outline: Closing an existing wallboard edit mode redirects the user to the landing page
Given('a wallboard containing at least one component exists', ()=>{
    saving.visitLandingPage();
    cy.url().then(($URL)=>{
        landing_page_url = $URL
    })
    saving.editButton().first().click()
})

And('the edit mode for the wallboard is displayed', ()=>{
    saving.titleWallboard();
})

And('no changes are performed', ()=>{
    saving.addComponent().contains('+ Add Component')
})

When('the user navigates to {string} the edit mode view', (close) =>{
    saving.closeButton(close);
})

Then('the user gets redirected to the landing page', () =>{
    cy.url().then(($URL) => {
        expect($URL).to.include(landing_page_url);
    })
})

// Scenario Outline: User gets notified when closing wallboard edit mode and wallboard name edits are not saved
Given('the wallboard edit mode is displayed', ()=>{
    saving.visitLandingPage();
    cy.url().then(($URL)=>{
        landing_page_url = $URL
    })
    saving.newWallButton().click();
})

And('the user edits the wallboard name', ()=>{
    saving.titleWallboard().clear().type('Hello World');
})


When('the user selects {string} the edit mode for the wallboard', (close) =>{
    saving.closeButton(close);
})

Then('a notification is displayed informing the user that there are unsaved changes', () =>{
    saving.saveAlert();
})

// Scenario Outline: User gets notified when closing wallboard edit mode and wallboard component options edits are not saved
Given('the edit mode for a wallboard is displayed', ()=>{
    saving.visitLandingPage();
    cy.url().then(($URL)=>{
        landing_page_url = $URL
    })
    saving.newWallButton().click();
})
And('the user creates a new wallboard component', () =>{
    saving.addComponent().click();
    saving.selectAgentList().click();
    saving.selectButton().click();
    saving.addButton().click()
})

And('the user edits the wallboard component options', ()=>{
    saving.editComponentButton().click();
    saving.tableView().click();
    saving.editButtonfromComponent().click();
})


When('the user {string} the edit mode for the wallboard', (close) =>{
    saving.closeButton(close);
})

Then('a notification is displayed informing the user there are unsaved changes', () =>{
    saving.saveAlert();
})

// Scenario Outline: User gets notified when closing wallboard edit mode and adding a new component is not saved

Given('the edit mode is displayed', ()=>{
    saving.visitLandingPage();
    saving.newWallButton().click();
})
And('the adds a new component', () =>{
    saving.addComponent().click();
    saving.selectAgentList().click();
    saving.selectButton().click();
    saving.addButton().click()
})

When('the user {string}', (close) =>{
    saving.closeButton(close);
})

Then('a notification is displayed informing that there are unsaved changes', () =>{
    saving.saveAlert();
})

// Scenario Outline: User gets notified when closing wallboard edit mode and removing an existing component is not saved
Given('that the edit mode is displayed', ()=>{
    saving.visitLandingPage();
    saving.newWallButton().click();
})

And('the user add a new component and save it', () =>{
    saving.addComponent().click();
    saving.selectAgentList().click();
    saving.selectButton().click();
    saving.addButton().click()
    saving.saveButton().click()
    saving.saveButtonAlert()
})

And('the user removes an existing component', () =>{
    saving.deleteComponent().click();
    saving.deleteAlertButton().click()
})

When('the user {string} edit mode', (close) =>{
    saving.closeButton(close);
})

Then('a notification is displayed informing there are unsaved changes', () =>{
    saving.saveAlert();
})

// Scenario Outline: User gets notified when closing wallboard edit mode and component position changes is not saved
Given('that the wallboard edit mode is displayed', ()=>{
    saving.visitLandingPage();
    saving.editButton().first().click();
})

And('the user changes component position on the grid', () =>{
    saving.rightBottomCorner().trigger('mousedown', 'bottomRight')
})

When('the user selects to {string}', (close) =>{
    saving.closeButton(close);
})

Then('a notification is displayed that informs the user there are unsaved changes', () =>{
    saving.saveAlert();
})

// Scenario: Selecting Save & Close option in the notification redirects the user to the landing page
Given('the unsaved changes notification is displayed', ()=>{
    saving.visitLandingPage();
    cy.url().then(($URL)=>{
        landing_page_url = $URL
    })
    saving.editButton().first().click();
    saving.rightBottomCorner().trigger('mousedown', 'bottomRight')
    saving.closeButton('div.c-toolbar-right > button:nth-child(4)')
    saving.saveComponentAlert().contains('To preserve your changes, click Save & Close');
})

When('the user selects the option to Save & Close', () =>{
    saving.save_and_close_button();
})

Then('the changes are saved', () =>{
    saving.notification();
})

And('the user is redirected to the landing page', () =>{
    cy.url().then(($URL)=>{
        expect($URL).to.include(landing_page_url)
    })
})

// Scenario: Selecting Discard option in the notification redirects the user to the landing page

Given('the notification for unsaved changes is displayed', ()=>{
    saving.visitLandingPage();
    cy.url().then(($URL)=>{
        landing_page_url = $URL
    })
    saving.editButton().first().click();
    saving.rightBottomCorner().trigger('mousedown', 'bottomRight')
})

When('the user selects the option to Discard', () =>{
    saving.closeButton('div.c-toolbar-right > button:nth-child(4)')
    saving.discardButton();
})

Then('the user gets redirected to the landing page', () => {
    cy.url().then(($URL)=>{
        expect($URL).to.include(landing_page_url)
    })
})

// Scenario Outline: User remains on the edit page when selecting Cancel option in the notification
Given('that the notification for unsaved changes is displayed', ()=>{
    saving.visitLandingPage();
    saving.editButton().first().click();
    cy.url().then(($URL)=>{
        landing_page_url = $URL
    })
    saving.rightBottomCorner().trigger('mousedown', 'bottomRight')
})

When('the user selects the option to Cancel', () =>{
    saving.closeButton('div.c-toolbar-right > button:nth-child(4)')
    saving.cancelButton();
})

Then('the user remains on the edit page', () => {
    cy.url().then(($URL)=>{
        expect($URL).to.include(landing_page_url)
    })
})

// Scenario Outline: Closing a new wallboard edit mode redirects the user to the landing page
Given('the edit mode for a new wallboard is displayed', ()=>{
    saving.visitLandingPage();
    cy.url().then(($URL)=>{
        landing_page_url = $URL
    })
    saving.newWallButton().click();
})

And('no changes are done', () =>{

})

When('the user {string} the wallboard edit mode', (closes) =>{
    saving.closeButton(closes)
})

Then('the user is redirected to the landing page', () => {
    cy.url().then(($URL)=>{
        expect($URL).to.include(landing_page_url)
    })
})