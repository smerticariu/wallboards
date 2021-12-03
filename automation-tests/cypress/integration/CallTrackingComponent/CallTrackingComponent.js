import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import CallTracking from "../../support/PageObjects/CallTracking_PO";

const callTracking = new CallTracking()
var titlePreview = ''
var categPreview = ''
var periodPreview = ''
var content = ''



// Scenario Outline: Specific call category metrics are displayed on the call tracking component
Given ('that the user logs in', () => {
    cy.login();
    callTracking.visitLandingPage();
    callTracking.loggedInTitle().should('contain', 'Recent Wallboards');
})

And('the user navigates to wallboard creation page', () => {
    callTracking.newWallboard().click();
    callTracking.addComponent().click();
})
When('the user adds a call tracking component for the {string}', (category) => {
    callTracking.callsCategory().click();
    callTracking.componentCategTitle().contains('Call tracking').click();
    callTracking.selectButton().click();
    callTracking.selectCateg().select(category);
    callTracking.addButton().click();
})
Then('the category specific {string} metrics are displayed', (call) => {
   var i = 0
   callTracking.categoriesTitle().each((title) => {
        expect(title.text().toLowerCase()).to.contain(call.split(', ').slice(i, i+1))
        i = i+1
   })
})

// Scenario Outline: Existing call tracking component can be edited
Given ('the {string} is logged in', (user) => {
    if(user == 'admin user') {
        cy.login();
        callTracking.visitLandingPage();
        callTracking.loggedInTitle().should('contain', 'Recent Wallboards');
    }
    else if(user == 'team leader user') {
        cy.loginLeader();
        callTracking.visitLandingPage();
        callTracking.loggedInTitle().should('contain', 'Recent Wallboards');
    }
 })
And ('the wallboard containing a default call tracking component is displayed', () => {
    callTracking.newWallboard().click();
    callTracking.addComponent().click();
    callTracking.callsCategory().click();
    callTracking.componentCategTitle().contains('Call tracking').click();
    callTracking.selectButton().click();
    callTracking.addButton().click();
})
And ('the user edits the title, call category and period', () => {
    callTracking.editComponent().click();
    callTracking.componentModalTitle().clear().type('New Title 123');
    callTracking.selectCateg().select('inbound');
    callTracking.period().select('Today');
})
When ('the user saves the changes', () => {
    callTracking.saveModalButton().click();
})
Then ('the new edits are displayed on the call tracking component', () => {
    callTracking.componentTitle().should('contain', 'New Title 123');
    callTracking.categoriesTitle().first().should('have.text', 'Un-Connected Calls')
    callTracking.componentPeriod().should('contain', 'Today');
})

// Scenario: Call tracking component name cannot contain invalid characters
Given ('the wallboards creation page is displayed', () => {
    cy.login();
    callTracking.visitLandingPage();
    callTracking.newWallboard().click();
    callTracking.verifyCreationPage();
})
And ('the user navigates to add a call tracking component', () => {
    callTracking.addComponent().click();
    callTracking.callsCategory().click();
    callTracking.componentCategTitle().contains('Call tracking').click();
    callTracking.selectButton().click();
})
When ('the user attempts to save the component title containing special characters', () => {
    callTracking.componentModalTitle().clear().type('!@#');
    callTracking.addButton().click();
})
Then ('the user is informed that the title must contain alphanumeric characters', () => {
    callTracking.error().should('contain', 'Title must be alphanumeric');
})

// Scenario: Call tracking component name cannot be empty
Given ('the creation page for wallboards is displayed', () => {
    cy.login();
    callTracking.visitLandingPage();
    callTracking.newWallboard().click();
    callTracking.verifyCreationPage();
})
And ('the user opens the add a call tracking component modal', () => {
    callTracking.addComponent().click();
    callTracking.callsCategory().click();
    callTracking.componentCategTitle().contains('Call tracking').click();
    callTracking.selectButton().click();
})
And ('the component title is emptied', () => {
    callTracking.componentModalTitle().clear();
})
When ('the user attempt to save the component', () => {
    callTracking.addButton().click();
})
Then ('the user is informed that title must contain alphanumeric characters', () => {
    callTracking.error().should('contain', 'Title must be alphanumeric');
})

// Scenario Outline: Call tracking component can be removed
Given ('the {string} is logged in', (user) => {
    if(user == 'admin user') {
        cy.login();
        callTracking.visitLandingPage();
        callTracking.loggedInTitle().should('contain', 'Recent Wallboards');
    }
    else if(user == 'team leader user') {
        cy.loginLeader();
        callTracking.visitLandingPage();
        callTracking.loggedInTitle().should('contain', 'Recent Wallboards');
    }
})
And ('the wallboard with a call tracking component is displayed', () => {
    callTracking.newWallboard().click();
    callTracking.addComponent().click();
    callTracking.callsCategory().click();
    callTracking.componentCategTitle().contains('Call tracking').click();
    callTracking.selectButton().click();
    callTracking.addButton().click();
})
When ('the user selects the option to delete the component', () => {
    callTracking.deleteComponent().click();
    callTracking.confirmDeletion().click();
})
Then ('the component is no longer displayed', () => {
    callTracking.component().should('not.exist');
})

// Scenario: Call tracking component preview updates when editing configuration options
Given ('the configuration options for call tracking component is displayed', () => {
    cy.login();
    callTracking.visitLandingPage();
    callTracking.newWallboard().click();
    callTracking.addComponent().click();
    callTracking.callsCategory().click();
    callTracking.componentCategTitle().contains('Call tracking').click();
    callTracking.selectButton().click();
    callTracking.componentTitle().should('contain', 'Call Tracking');
})
And ('the user edits the component title', () => {
    callTracking.componentTitle().then(($title) => {
        titlePreview = $title.text();
        cy.log(titlePreview);
    })
    callTracking.componentModalTitle().clear().type('Updated Title');
})
And ('the user selects another call category', () => {
    callTracking.categoriesTitle().first().then(($categTitle) => {
        categPreview = $categTitle.text();
        cy.log(categPreview);
    })
    callTracking.selectCateg().select('inbound');
})
And ('the user selects another period', () => {
    callTracking.componentPeriod().then(($period) => {
        periodPreview = $period.text();
        cy.log(periodPreview);
    })
    callTracking.period().select('today');
})
When ('the user inspects the preview displayed', () => {
    callTracking.preview();
})
Then ('the new options selected are displayed in the component preview', () => {
    callTracking.componentTitle().should('not.contain', titlePreview);
    callTracking.categoriesTitle().first().should('not.have.text', categPreview);
    callTracking.componentPeriod().should('not.contain', periodPreview);
})

// Needs at least one outbound call made prior to executing the test
// Scenario: Call tracking metrics update when changing the time zone selected
Given ('the wallboard with a default outbound call tracking component is displayed', () => {
    cy.login();
    callTracking.visitLandingPage();
    callTracking.newWallboard().click();
    callTracking.addComponent().click();
    callTracking.callsCategory().click();
    callTracking.componentCategTitle().contains('Call tracking').click();
    callTracking.selectButton().click();
    callTracking.selectCateg().select('outbound');
    callTracking.addButton().click();
    callTracking.categoriesTitle().first().invoke('text').should('eq', 'Un-Answered Calls');
})
And ('the user edits the time zone by selecting the first option in the time zone drop down', () => {
    cy.wait(2000);
    callTracking.widgetData().first().then((value) => {
        content = value.text();
        cy.log(content)
    })
    callTracking.editComponent().first().click();
    callTracking.timeZone().select('-660');
})
When ('the user saves the edits', () => {
    callTracking.saveModalButton().click();
})
Then ('the metrics displayed update', () => {
    callTracking.widgetData().first().then((value) => {
        expect(value.text()).to.not.deep.eq(content);
        cy.log(value.text());
    })
})