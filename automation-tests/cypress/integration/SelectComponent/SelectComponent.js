import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import SelectComponent_PO from '../../support/PageObjects/SelectComponent_PO';

beforeEach(() => {

    //cy.clearLocalStorage()
    cy.login()
    //cy.log("Login Successful")
})

const selectComponent_PO = new SelectComponent_PO();
var text = ''


Given ('the wallboard creation page is displayed', () => {
    selectComponent_PO.getToCreationPage();
})
When ('the user clicks on the button to add component', () => {
    selectComponent_PO.addComponentButton().click();
})
Then ('a modal is displayed for selecting the following component categories: Queues, Calls, Users', () => {
    selectComponent_PO.selectComponentModal().should('be.visible');
    selectComponent_PO.selectComponentModal().should('contain', 'Queues').and('contain', 'Calls').and('contain', 'Users');
    
})
//----------------------------------------------------------
Given('the modal for selecting a component is displayed', () => {
    selectComponent_PO.getToSelectComponentModal();
})
When('the user selects the Queues category', () => {
    selectComponent_PO.componentCategories().contains('Queues').click();
})
Then('the following elements are displayed on the right modal side: Agent list, Queue list, Queue tracking, Queue status', () => {
    selectComponent_PO.componentType().should('contain', 'Agent list').and('contain', 'Queue list').and('contain', 'Queue tracking').and('contain', 'Queue status');
})
//----------------------------------------------------------
Given('the modal to select a component is displayed', () => {
    selectComponent_PO.getToSelectComponentModal();
})
When('the user selects the Calls category', () => {
    selectComponent_PO.componentCategories().contains('Calls').click();
})
Then('the following elements are displayed on the right modal side: Call status, Call tracking', () => {
    selectComponent_PO.componentType().should('contain', 'Call status').and('contain', 'Call tracking');
})
//----------------------------------------------------------
Given ('the modal to select component is displayed', () => {
    selectComponent_PO.getToSelectComponentModal();
})
When ('the user selects the Users category', () => {
    selectComponent_PO.componentCategories().contains('Users').click();
})
Then ('the following elements are displayed on the right modal side: Agent login, Agent status', () => {
    selectComponent_PO.componentType().should('contain', 'Agent login').and('contain', 'Agent status');
})
//---------------------------------------------------------
Given ('the select a component modal is displayed', () => {
    selectComponent_PO.getToSelectComponentModal();
})

And ('the Queues category is selected', () => {
    selectComponent_PO.componentCategories().contains('Queues').click();
})

When ('the user fills in search criteria', () => {
    selectComponent_PO.getFirstComponent().then((firstComponentName) => {
        text = firstComponentName.text();
        selectComponent_PO.searchComponent().type(text);
    })
})

Then ('the results matching the search criteria are displayed', () => {
    selectComponent_PO.getAllComponents().contains(text);
})
//--------------------------------------------------------------
Given ('the select component modal is displayed', () => {
    selectComponent_PO.getToSelectComponentModal();
})
And ('the Calls category is selected', () => {
    selectComponent_PO.componentCategories().contains('Calls').click();

})
When ('the user fills in desired search criteria', () => {
    selectComponent_PO.getFirstComponent().then((firstComponentName) => {
        text = firstComponentName.text();
        selectComponent_PO.searchComponent().type(text);
    })
})
Then ('the results matching the desired search criteria are displayed', () => {
    selectComponent_PO.getAllComponents().contains(text);
})
//-------------------------------------------------------------
Given ('the selecting a component modal is displayed', () => {
    selectComponent_PO.getToSelectComponentModal();
})
And ('the Users category is selected', () => {
    selectComponent_PO.componentCategories().contains('Users').click();
})
When ('the user fills in desired keyword', () => {
    selectComponent_PO.getFirstComponent().then((firstComponentName) => {
        text = firstComponentName.text();
        selectComponent_PO.searchComponent().type(text);
    })
})
Then ('the results matching the search keyword are displayed', () => {
    selectComponent_PO.getAllComponents().contains(text);
})
//-------------------------------------------------------------
Given ('that the select a component modal is displayed', () => {
    selectComponent_PO.getToSelectComponentModal();
})
When ('the user fills in the first character of the search keyword', () => {
    selectComponent_PO.getFirstComponent().then((firstComponentName) => {
        text = firstComponentName.text()[0];
        text = text.toLowerCase();
        selectComponent_PO.searchComponent().type(text);
    })
})
Then ('the results start filtering', () => {
    selectComponent_PO.getAllComponents().each((allComponentsNames) => {
        allComponentsNames = allComponentsNames.text().toLowerCase()
        expect(allComponentsNames).to.include(text, {matchCase: false});
        })
})
//--------------------------------------------------------------
Given ('that an element is selected', () => {
    selectComponent_PO.getToSelectFirstComponent();
})
When ('the user clicks on the select button', () => {
    selectComponent_PO.selectComponentButton().click();
})
Then ('the modal for selecting component closes', () => {
    selectComponent_PO.selectComponentModal().should('not.have.focus');
})
And ('the add component modal is displayed', () => {
    selectComponent_PO.addComponentModal().should('be.visible')
})
//---------------------------------------------------------------
Given ('that the select component modal is displayed', () => {
    selectComponent_PO.getToSelectComponentModal();
})
When ('the user clicks on the cancel button', () => {
    selectComponent_PO.cancelSelectComponentModal().click();
})
Then ('the modal for selecting a component closes', () => {
    selectComponent_PO.selectComponentModal().should('not.exist');
})