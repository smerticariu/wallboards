import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import StatusColor_PO from "../../support/PageObjects/StatusColor_PO";


const color = new StatusColor_PO()
var newNumber = 0
var state = ''


beforeEach(()=>{
    cy.login()
    cy.log('Login successful')
})


// Scenario Outline: Correct corresponding colors displayed for the presence states on Card view mode
Given('that the wallboard creation page is displayed', () => {
    color.visitLandingPage();
    color.newWallButton().click();
    color.addComponent().click();
})
And('the user adds a card view component with all presence states enabled', () => {
    color.selectAgentList().click();
    color.selectButton().click();
})
When('the user selects the add button', () => {
    color.addButton().click();
    cy.wait(3000)
})
Then('each {string} has a corresponding {string}', (presence_state, color) => {
    cy.get('.agent-c.agent-c', {timeout: 8000}).then((agents) => {
        newNumber = agents.length
        cy.log(newNumber)

        for (let i = 1; i <= newNumber; i++) {
            cy.get('div.agent-list__body > div:nth-child(' + i + ') > div.agent-c__body > div.agent-c__footer').then((card) => {
                state = card.text();
                cy.log(state);

                if (state == presence_state) {
                    cy.log(i)
                    cy.get('div.agent-list__body > div:nth-child(' + i + ')').then(($el) => {
                        expect($el).to.have.css('background-color', color)
                    })
                }
                else {
                    cy.log('Presence state ' + state + ' not matching current scenario.')
                }
            })
        }
    })
})

// Scenario Outline: Correct corresponding colors displayed for the presence states on Table view mode

Given('the creation wallboard page is displayed', () => {
    color.visitLandingPage();
    color.newWallButton().click();
    color.addComponent().click();
})
And('the user adds a table view component with all presence states enabled', () => {
    color.selectAgentList().click();
    color.selectButton().click();
    color.tableView().click();
})
When('the user adds the configured component', () => {
    color.addButton().click();
})
Then('each {string} has a {string} corresponding', (presence_state, column_color) => {
    cy.get('.agent-t__agent-info.agent-t__agent-info--status', {timeout: 8000}).then((agents) => {
        newNumber = agents.length
        cy.log(newNumber)

        for (let i = 1; i <= newNumber; i++) {
            cy.get('div.agent-t__body > div:nth-child(' + i + ') > div.agent-t__agent-info.agent-t__agent-info--status').then((status) => {
                state = status.text();
                cy.log(state);

                if (state == presence_state) {
                    cy.log(i)
                    cy.get('div:nth-child(' + i + ') > div.agent-t__agent-info.agent-t__agent-info--status > div').then(($el) => {
                        expect($el).to.have.css('background-color', column_color)
                    })
                }
                else {
                    cy.log('Presence state ' + state + ' not matching current scenario.')
                }
            })
        }
    })
})

// Scenario Outline: Correct corresponding colors displayed for the availability states on Card view mode
Given('that the page for wallboard creation is displayed', () => {
    color.visitLandingPage();
    color.newWallButton().click();
    color.addComponent().click();
})
And('the user adds a card view component with all availability states enabled', () => {
    color.selectAgentList().click();
    color.selectButton().click();
    color.cardView().check({ force: true });
    color.availabilityCheckboxCard().check({ force: true });
})
And('all presence states option is enabled', () => {
    color.presenceCheckboxCard().check({ force: true });
})
When('the user adds the component configured', () => {
    color.addButton().click();
    cy.wait(3000)
})
Then('each {string} has a corresponding color {string}', (presence_state, availability_color) => {
    cy.get('.agent-c.agent-c', {timeout: 8000}).then((agents) => {
        newNumber = agents.length
        cy.log(newNumber)

        for (let i = 1; i <= newNumber; i++) {
            cy.get('div.agent-list__body > div:nth-child(' + i + ') > div.agent-c__body > div.agent-c__footer').then((card) => {
                state = card.text();
                cy.log(state);

                if (state == presence_state) {
                    cy.log(i)
                    cy.get('div:nth-child(' + i + ') > div.agent-c__status-time > div.agent-c__status.agent-c__status').then(($el) => {
                        expect($el).to.have.css('background-color', availability_color)
                    })
                }
                else {
                    cy.log('Availability state ' + state + ' not matching current scenario.')
                }
            })
        }
    })
})

// Scenario Outline: Correct corresponding colors displayed for the availability states on Table view mode [NEW]
Given('the page for wallboard creation is displayed', () => {
    color.visitLandingPage();
    color.newWallButton().click();
    color.addComponent().click();
})
And('the user adds a table view component with all availability states enabled', () => {
    color.selectAgentList().click();
    color.selectButton().click();
    color.tableView().click();
    color.availabilityCheckboxCard().check({ force: true });
})
And('the option for all presence states is enabled', () => {
    color.presenceCheckboxTable();

})
When('the user selects the add button for the component', () => {
    color.addButton().click();
    cy.wait(2000);
})
Then('each {string} has a corresponding availability status {string}', (presence_state, colour) => {
    cy.get('.agent-t__agent-info.agent-t__agent-info--status', {timeout: 8000}).then((agents) => {
        newNumber = agents.length
        cy.log(newNumber)

        for (let i = 1; i <= newNumber; i++) {
            cy.get('div.agent-t__body > div:nth-child(' + i + ') > div.agent-t__agent-info.agent-t__agent-info--status').then((status) => {
                state = status.text();
                cy.log(state);

                if (state == presence_state) {
                    cy.log(i)
                    cy.get('div:nth-child(' + i + ') > div.agent-t__agent-info:eq(2)').then(($el) => {
                        expect($el).to.have.css('background-color', colour)
                    })
                }
                else {
                    cy.log('Presence state ' + state + ' not matching current scenario.')
                }
            })
        }
    })
})
