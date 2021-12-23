import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import AgentListComponent from "../../support/PageObjects/AgentListComponent";
import AgentStatus from "../../support/PageObjects/AgentStatus_PO";

const agentStatus = new AgentStatus()
const agent = new AgentListComponent()
var name = ''
var status = ''
var current_value, current_value2
var period = ''
var results = 0
var dateTime = ''
var today = ''

// Scenario: The agent status modal preview dynamically updates when associated configuration options are changed
Given ('the user is logged in', () => {
    cy.login()
    agentStatus.visitLandingPage();
    agentStatus.loggedInTitle().should('contain', 'Recent Wallboards');
})
And ('the wallboard creation page is displayed', () => {
    agentStatus.newWallboard().click();
})
And ('the user navigates to add a new agent status component', () => {
    agentStatus.addComponent().click();
    agentStatus.usersCategory().click();
    agentStatus.agentStatus().contains('Agent status').click();
    agentStatus.selectButton().click()
})
When ('the user changes the default component configuration options', () => {
    agentStatus.modalTitle().clear().type('This is a test');
    agentStatus.modalLimit().clear().type('5');
    agentStatus.modalPeriod().select('month');
    agentStatus.showBoxOne().uncheck({force: true});
})

Then ('the preview updates to reflect the configured options', () => {
    agentStatus.title().should('contain', 'This is a test')
    agentStatus.title().should('contain', 'This Month')
    agentStatus.resultsRow().then(($el) => {
        expect($el.length).to.eq(parseInt('5'))
    })

    agentStatus.previwTitle().should('not.contain', 'State Name');
    agentStatus.previwTitle().should('contain', 'State Display Name');
})


// Scenario: Agent status component name does not allow invalid characters

Given ('that the user is logged in', () => {
    cy.login();
    agentStatus.visitLandingPage();
    agentStatus.loggedInTitle().should('contain', 'Recent Wallboards');
})

And ('a wallboard with an agent status component is created', () => {
    agentStatus.newWallboard().click();
    agentStatus.addComponent().click();
    agentStatus.usersCategory().click();
    agentStatus.agentStatus().contains('Agent status').click();
    agentStatus.selectButton().click();
    agentStatus.addButton().click()
})
When ('the user navigates to edit component name by entering invalid characters', () => {
   agentStatus.editModalButton().click()
   agentStatus.modalTitle().type('$#')
   agentStatus.saveModalButton().contains('Save').click()
})

Then ('the user is informed that invalid characters are not allowed', () => {
    agentStatus.modalAlert().contains('Title must be alphanumeric')
})

// Scenario: Agent status component name cannot be empty

Given ('that the user is logged in', (user) => {
    cy.login();
    agentStatus.visitLandingPage();
    agentStatus.loggedInTitle().should('contain', 'Recent Wallboards');
})

And ('a wallboard with one agent status component is created', () => {
    agentStatus.newWallboard().click();
    agentStatus.addComponent().click();
    agentStatus.usersCategory().click();
    agentStatus.agentStatus().contains('Agent status').click();
    agentStatus.selectButton().click();
    agentStatus.addButton().click();
})
When ('the user navigates to edit component name by removing all characters in the name field', () => {
    agentStatus.editModalButton().click();
    agentStatus.modalTitle().clear();
    agentStatus.saveModalButton().contains('Save').click();
})

Then ('the user is informed that component name cannot be empty', () => {
    agentStatus.modalAlert().contains('Title must be alphanumeric')
})

// Scenario Outline: Existing agent status component configuration can be edited 
Given ('the {string} is logged in', (user) => {
    cy.login();
    agentStatus.visitLandingPage();
    agentStatus.loggedInTitle().should('contain', 'Recent Wallboards');
})
And ('the user creates a wallboard with a default agent status component', () => {
    agentStatus.newWallboard().click();
    agentStatus.addComponent().click();
    agentStatus.usersCategory().click();
    agentStatus.agentStatus().contains('Agent status').click();
    agentStatus.selectButton().click()
    agentStatus.addButton().click()
})
And ('the user navigates to edit component configuration options', () => {
    agentStatus.editModalButton().click();
})
When ('the user saves the changes made', () => {
    agentStatus.modalTitle().clear().type('Changed text')
    agentStatus.modalLimit().clear().type('5')
    agentStatus.modalPeriod().select('month')
    agentStatus.saveModalButton().contains('Save').click()
})

Then ('the new component configuration is displayed', () => {
    agentStatus.title().contains('Changed text')
    agentStatus.title().contains('This Month')
    const today = new Date()
    var month = today.getMonth()+1
    var table_time = ''
    cy.wait(5000)
    agentStatus.time().each(($time)=>{
        table_time = $time.text().split('-')[1]
        expect(table_time).to.be.eql(month.toString())
    })
    agentStatus.resultsRow().then(($el) => {
        expect($el.length).to.eq(parseInt('5'))
    })

})

// Scenario Outline: Agent status component can be removed 
Given ('that the {string} is logged in', () => {
    cy.login();
    agentStatus.visitLandingPage();
    agentStatus.loggedInTitle().should('contain', 'Recent Wallboards');
})

And ('a wallboard with one agent status component is created', () => {
    agentStatus.newWallboard().click();
    agentStatus.addComponent().click();
    agentStatus.usersCategory().click();
    agentStatus.agentStatus().contains('Agent status').click();
    agentStatus.selectButton().click()
    agentStatus.addButton().click()
})

When ('the user navigates to remove the component', () => {
    agentStatus.removeModalButton().first().click()
    agentStatus.deleteButton().click()
})

Then ('the component is no longer displayed on the wallboard', () => {
    agentStatus.title().should('not.exist')
})


// Scenario Outline: Agent status component updates when agent status changes
Given ('that the {string} is logged in', (user) => {
    cy.login();
    agentStatus.visitLandingPage();
    agentStatus.loggedInTitle().should('contain', 'Recent Wallboards');
})

And ('a wallboard with one default agent status component and one default agent list component is created', () => {
    agentStatus.newWallboard().click();
    agentStatus.addComponent().click();
    agentStatus.usersCategory().click();
    agentStatus.agentStatus().contains('Agent status').click();
    agentStatus.selectButton().click()
    agentStatus.modalPeriod().select('month')
    agentStatus.addButton().click()
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
    agentStatus.addButton().click()

})

When ('the user changes the availability state of the first agent disaplyed on the agent list component', () => {
    agentStatus.cardName().first().then(($el)=>{
        name = $el.text()
        cy.wrap(name).as('name')
    })
    cy.wait(2000)
    agentStatus.cardStatus().click().then(() =>{
    agentStatus.cardStatus().then(($status)=>{
        if($status.text() == 'Working'){
            agentStatus.cardStatusSelectlast().click({force:true}).then($status=>{
                status = $status.text()
            cy.wrap(status).as('status')
            })
        }
        else{
            agentStatus.cardStatusSelectfirst().click({force:true}).then($status=>{
                status = $status.text()
            cy.wrap(status).as('status')
            })            
        }
        })
    })
    

})

Then ('the agent status component updates reflecting the new record expected', () => {
    cy.wait(5000)
    agentStatus.agentTitle().then(($name)=>{
        cy.get('@name').then($cardName =>{
            expect($cardName).to.eql($name.text())
        })
    })
    agentStatus.statusAgent().then(($status)=>{
        cy.get('@status').then($cardStatus=>{
            expect($cardStatus).to.eql($status.text())
        })
    })
})

// Scenario Outline: Min 1 and max 100 records are displayed on the Agent status component

Given ('a wallboard with one agent status component is displayed', () => {
    cy.login();
    agentStatus.visitLandingPage();
    agentStatus.loggedInTitle().should('contain', 'Recent Wallboards');
    agentStatus.newWallboard().click();
    agentStatus.addComponent().click();
    agentStatus.usersCategory().click();
    agentStatus.agentStatus().contains('Agent status').click();
    agentStatus.selectButton().click();
    agentStatus.addButton().click();

})

And ('the user navigates to edit the configuration options', () => {
    agentStatus.editModalButton().click();
})

And ('the user sets the period to this month', () => {
    agentStatus.modalPeriod().select('month');
})

And ('the user enters {string} for the limit results field', (value) => {
    agentStatus.modalLimit().clear().type(value);
})

When ('the user saves the edits', () => {
    agentStatus.saveModalButton().click();
    cy.wait(3000);
})

Then ('the corresponding {string} number of records is displayed', (value) => {
    agentStatus.resultsRow().then(($el) => {
        results = $el.length;
        if(value == 1) {
            expect(results).to.eq(1);
        }
        else if(value == 100) {
            expect(results).to.eq(100);
        }
    })
})

// Scenario Outline: Selecting to view results outside the available limit range is not allowed 

Given ('the wallboard with one agent status component is displayed', () => {
    cy.login();
    agentStatus.visitLandingPage();
    agentStatus.loggedInTitle().should('contain', 'Recent Wallboards');
    agentStatus.newWallboard().click();
    agentStatus.addComponent().click();
    agentStatus.usersCategory().click();
    agentStatus.agentStatus().contains('Agent status').click();
    agentStatus.selectButton().click()
    agentStatus.modalPeriod().select('month')
    agentStatus.addButton().click()

})

And ('the user edits the configuration options', () => {
    agentStatus.editModalButton().click()
})

And ('the user enters {string} in the limit results field', (value) => {
    agentStatus.modalLimit().clear().type(value)
    current_value = value
})

When ('the user attempts to save the new configuration', () => {
    agentStatus.saveModalButton().click()
})

Then ('the user is informed about the result allowed limits', () => {
    if(current_value == '0'){
        agentStatus.modalAlert().contains('Min value is 1')
    }
    else{
        agentStatus.modalAlert().contains('Max value is 100')
    }
})

// Scenario: The time displayed on the agent status component updates when the time zone option is edited

Given ('the wallboard for an agent status component is displayed', () => {
    cy.login();
    agentStatus.visitLandingPage();
    agentStatus.newWallboard().click();
    agentStatus.addComponent().click();
    agentStatus.usersCategory().click();
    agentStatus.agentStatus().contains('Agent status').click();
    agentStatus.selectButton().click();
    agentStatus.modalPeriod().select('month');
    agentStatus.addButton().click();
})

And ('the user changes the current time zone option', () => {
    agentStatus.resultDateTime().then(($el) => {
        dateTime = $el.text();
        cy.log(dateTime + ' initial date and time')
    })

    agentStatus.editModalButton().click();
    agentStatus.modalTime().select('0')
})

When ('the user saves the new configuration', () => {
    agentStatus.saveModalButton().click();
    cy.wait(2000);
})

Then ('the time displayed updates', () => {
   agentStatus.resultDateTime().then(($el) => {
       expect($el.text()).not.to.eq(dateTime);
   })
})

// Scenario Outline: The agent status records are filtered based on the time period selected

Given ('that a wallboard with a default agent status component is displayed', () => {
    cy.login();
    agentStatus.visitLandingPage();
    agentStatus.newWallboard().click();
    agentStatus.addComponent().click();
    agentStatus.usersCategory().click();
    agentStatus.agentStatus().contains('Agent status').click();
    agentStatus.selectButton().click();
    agentStatus.modalLimit().clear().type('5');
    agentStatus.addButton().click();
})

And ('an agent list component is added', () => {
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
    agentStatus.addButton().click();
    cy.wait(3000);
})

And ('the user changes the availability status for the first agent displayed on the agent list component', () => {
    agentStatus.cardStatus().then(($status) => {
        if ($status.text() == 'Working') {
            agentStatus.cardStatus().click();
            agentStatus.cardStatusSelectlast().click({ force: true }).then($status => {
                status = $status.text()
                cy.wrap(status).as('status')
            })
        }
        else {
            agentStatus.cardStatus().click();
            agentStatus.cardStatusSelectfirst().click({ force: true }).then($status => {
                status = $status.text()
                cy.wrap(status).as('status')
            })
        }
    })
})

And ('the user edits agent status component configured period to {string} period', (another) => {
    agentStatus.editModalButton().click()
    period = another
    agentStatus.modalPeriod().select(another)
    agentStatus.saveModalButton().click()
    cy.wait(3000)
})

When ('the new configuration is saved', () => {
    if(period == 'month'){
        agentStatus.title().contains('This Month')
    }
    else if(period == 'week'){
        agentStatus.title().contains('This Week')
    }
    else if(period == 'today'){
        agentStatus.title().contains('Today')
    }
    else if(period == 'hour'){
        agentStatus.title().contains('This Hour')
    }
    else if(period == 'rolling-hour'){
        agentStatus.title().contains('Rolling Hour')
    }
    
})

Then ('the records displayed fit the time period selected', () => {
    today = new Date();
    agentStatus.modal().invoke('text').then(($el)=>{
        if($el.includes('No agents')){
            agentStatus.modal().then(($el)=>{
                expect($el.text()).to.include('No agents')
            })
        }
        else{
            if(period == 'hour'){
                agentStatus.resultsRow().each(($time)=>{
                    var date = $time.text().split('-')[2].split(' ')[1].split(':')[0]
                    expect(parseInt(date)).to.eq(parseInt(today.getHours()))
                })
            }
            else if(period == 'rolling-hour'){
                agentStatus.resultsRow().each(($time)=>{
                    var date = $time.text().split('-')[2].split(' ')[1].split(':')[0]
                    expect(parseInt(date)).to.be.greaterThan(parseInt(today.getHours()-2))
                })
            }
            else if(period == 'today'){
                agentStatus.resultsRow().each(($time)=>{
                    var date = $time.text().split('-')[2].split(' ')[0]
                    expect(parseInt(date)).to.be.eq(parseInt(today.getDate()))
                })
            }
            else if(period == 'week'){
                agentStatus.resultsRow().each(($time)=>{
                    var date = $time.text().split('-')[2].split(' ')[0]
                    expect(parseInt(date)).to.be.greaterThan(parseInt(today.getDate()-7))
                })
            }
            else if(period == 'month'){
                agentStatus.resultsRow().each(($time)=>{
                    var date = $time.text().split('-')[1]
                    expect(parseInt(date)).to.eq(parseInt(today.getMonth()+1))
                })
            }
        }
})
})

// Scenario: No file is generated when there are no events recorded for the interval selected
Given ('the wallboard with an agent status component is displayed', () => {
    cy.login();
    agentStatus.visitLandingPage();
    agentStatus.newWallboard().click();
    agentStatus.addComponent().click();
    agentStatus.usersCategory().click();
    agentStatus.agentStatus().contains('Agent status').click();
    agentStatus.selectButton().click();
    agentStatus.addButton().click();
})
And ('the user navigates to edit configuration options', () => {
    agentStatus.editModalButton().click();
})
When ('the user enters dates for an interval export with no events', () => {
    var today = new Date();
    current_value = (today.getFullYear()-100)+'-'+(today.getMonth()+1)+'-'+today.getDate();
    current_value2 = (today.getFullYear()-99)+'-'+(today.getMonth()+1)+'-'+today.getDate();
    agentStatus.dateFrom().type(current_value);
    agentStatus.dateTo().type(current_value2);

    agentStatus.export().click();
})
Then ('the user is informed that there are no records', () => {
    agentStatus.error().should('be.visible').and('contain', 'No data');
})

// Scenario: Export results option is unavailable if the interval end date requested is before interval start date
Given ('the wallboard with an agent status component is displayed', () => {
    cy.login();
    agentStatus.visitLandingPage();
    agentStatus.newWallboard().click();
    agentStatus.addComponent().click();
    agentStatus.usersCategory().click();
    agentStatus.agentStatus().contains('Agent status').click();
    agentStatus.selectButton().click();
    agentStatus.addButton().click();
})
And ('the user edits configuration options', () => {
    agentStatus.editModalButton().click();
})
When ('the user enters an interval end date which is before the interval start date', () => {
    var today = new Date();
    current_value = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    dateTime = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1);
    cy.log(current_value);
    agentStatus.dateFrom().invoke('attr', 'value', current_value);
    agentStatus.dateTo().invoke('attr', 'value', dateTime);
})
Then ('the option to export results is unavailable', () => {
    agentStatus.export().should('not.exist');
})