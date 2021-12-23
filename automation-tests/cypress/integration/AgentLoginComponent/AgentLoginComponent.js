import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import AgentLogin_PO from "../../support/PageObjects/AgentLogin_PO";

const agentLogin = new AgentLogin_PO()
var timezone = ''
var period = ''
var name = ''
var date = ''
var logDate = ''
var elapsedTime = 0
var avState = ''

// Scenario: Selecting the agent login component type displays the modal with default configuration
Given ('the user is logged in', () => {
    cy.login();
    agentLogin.visitLandingPage();
    agentLogin.loggedInTitle().should('contain', 'Recent Wallboards');
})
And ('the wallboard creation page is displayed', () => {
    agentLogin.newWallboard().click();
})
When ('the user navigates to add a component for agent login', () => {
    agentLogin.addComponent().click();
    agentLogin.usersCategory().click();
    agentLogin.componentTitle().contains('Agent login').click();
    agentLogin.selectButton().click();
})
Then ('the agent login component modal with default configuration is displayed', () => {
    agentLogin.modalTitle().invoke('val').then((content) => {
        expect(content).to.eq('Agent Login');
    })
    agentLogin.modalGroup().should('have.text', 'All Groups*');
    agentLogin.modalLimitResults().invoke('val').then((content) => {
        expect(content).to.eq('10');
    })
    agentLogin.modalTimeZone().find(':selected').should('have.text', 'UTC + 02');
    agentLogin.modalPeriod().find(':selected').should('have.text', 'This Hour');
    agentLogin.modalIntervalExport().should('exist');
})


// Scenario: The agent login preview dynamically updates when associated configuration options are changed
Given ('the user is logged in', () => {
    cy.login();
    agentLogin.visitLandingPage();
    agentLogin.loggedInTitle().should('contain', 'Recent Wallboards');
})
And ('the user navigates to the wallboard creation page', () => {
    agentLogin.newWallboard().click();
})
And ('the user adds a new agent login type component', () => {
    agentLogin.addComponent().click();
    agentLogin.usersCategory().click();
    agentLogin.componentTitle().contains('Agent login').click();
    agentLogin.selectButton().click();
})
When ('the user changes the configuration', () => {
    agentLogin.modalTitle().clear().type('Agent login test')
    agentLogin.modalGroup().select('6743414')
    agentLogin.modalLimitResults().clear().type('5')
    agentLogin.modalTimeZone().select('-660')
    agentLogin.modalPeriod().select('today')
})

Then ('the changes are displayed in the component preview', () => {
    agentLogin.previewTitle().contains('Agent login test')
    agentLogin.previewGroup().contains('test')
    agentLogin.agentLoginRecords().then(($el) => {
        expect($el.length).to.eq(parseInt('5'))
    })
})

// Scenario Outline: Agent login component displays the options configured in the component modal

Given ('the {string} is logged in', (user) => {
    if( user == 'admin user'){
        cy.login();
        agentLogin.visitLandingPage();
        agentLogin.loggedInTitle().should('contain', 'Recent Wallboards');
    }
    else{
        cy.loginLeader()
    }
})
And ('the user navigates to create a new wallboard', () => {
    agentLogin.newWallboard().click();
})
And ('the user navigates to add a new agent login component', () => {
    agentLogin.addComponent().click();
    agentLogin.usersCategory().click();
    agentLogin.componentTitle().contains('Agent login').click();
    agentLogin.selectButton().click();
})
And ('the user configures the component options', () => {
    agentLogin.modalTitle().clear().type('Agent login test')
    agentLogin.modalGroup().select('6743414')
    agentLogin.modalLimitResults().clear().type('12')
    agentLogin.modalTimeZone().select('-660')
    agentLogin.modalPeriod().select('month')
})
When ('the component is saved', () => {
    agentLogin.addButton().click()
})

Then ('the configured options are displayed on the component', () => {
    agentLogin.component_title().contains('Agent login test')
    agentLogin.componentGroup().contains('test')
    agentLogin.agentLoginRecords().then(($el) => {
        expect($el.length).to.eq(parseInt('12'))
    })
})

// Scenario: Existing agent login component configuration can be edited

Given ('the user is logged in', (user) => {
    cy.login();
    agentLogin.visitLandingPage();
    agentLogin.loggedInTitle().should('contain', 'Recent Wallboards');
})
And ('a wallboard with one agent login component type is created', () => {
    agentLogin.newWallboard().click();
    agentLogin.addComponent().click();
    agentLogin.usersCategory().click();
    agentLogin.componentTitle().contains('Agent login').click();
    agentLogin.selectButton().click();
    agentLogin.modalPeriod().select('month');
    agentLogin.addButton().click();

    agentLogin.agentLoginRecords().then(($el) => {
        logDate = $el.text().split('-')[2].split(' ')[1].split(':')[0]
    })
})

And ('the user edits the configuration options', () => {
    agentLogin.editModal().click();
    agentLogin.modalTitle().clear().type('Agent login 123');
    agentLogin.modalLimitResults().clear().type('3');
    agentLogin.modalTimeZone().select('0');
})
When ('the edits are saved', () => {
    agentLogin.saveModal().click();
    cy.wait(2000);
})

Then ('the new configuration is displayed on the saved component', () => {
    agentLogin.component_title().contains('Agent login 123');
    agentLogin.agentLoginRecords().then(($el) => {
        expect($el.length).to.eq(parseInt('3'))
    })
    agentLogin.agentLoginRecords().first().then(($el) => {
        expect($el.text().split('-')[2].split(' ')[1].split(':')[0]).to.not.eq(logDate)
    })
})

// Scenario Outline: Agent login component updates when agent login status changes
       
Given ('that the {string} is logged in', (user) => {
    if( user == 'admin user'){
        cy.login();
        agentLogin.visitLandingPage();
        agentLogin.loggedInTitle().should('contain', 'Recent Wallboards');
    }
    else{
        cy.loginLeader()
        agentLogin.visitLandingPage();
        agentLogin.loggedInTitle().should('contain', 'Recent Wallboards');
    }
})
And ('a wallboard with one agent login and one agent list component is displayed', () => {
    agentLogin.newWallboard().click();
    agentLogin.addComponent().click();
    agentLogin.usersCategory().click();
    agentLogin.componentTitle().contains('Agent login').click();
    agentLogin.selectButton().click();
    agentLogin.modalTitle().clear().type('Agent login test')
    agentLogin.modalLimitResults().clear().type('5')
    agentLogin.modalPeriod().select('month')
    agentLogin.addButton().click();

    agentLogin.addComponent().click();
    agentLogin.queuesCategory().click();
    agentLogin.componentTitle().contains('Agent list').click();
    agentLogin.selectButton().click();
    agentLogin.addButton().click();
    agentLogin.saveButton().click();
    agentLogin.saveAlert().click();
    cy.wait(2000)
})

When('the user changes the login status of the first agent displayed on the agent list component', () => {
    agentLogin.agentName().first().then(($el) => {
        name = $el.text();
        cy.log(name)
    })

    agentLogin.availabilityState().first().then(($el) => {
        avState = $el.text();
        cy.log(avState + ' original state')

        if (avState !== 'Working') {
            agentLogin.availabilityState().first().click();
            agentLogin.avOption().contains('Working').click();
        }
        else if (avState == 'Working') {
            agentLogin.availabilityState().first().click();
            agentLogin.avOption().contains('Off Shift').click();
        }
    })
})

Then('the agent login component data is updated reflecting the change of agent login status', () => {
    agentLogin.nameResult().then(($el) => {
        expect($el.text()).to.contain(name)
    })

    if (avState !== 'Working') {
        agentLogin.eventResult().first().invoke('text').should('contain', 'LOGIN');
    }
    else if (avState == 'Working') {
        agentLogin.eventResult().first().invoke('text').should('contain', 'LOGOUT');
    }

    var today = new Date();
    logDate = today.getFullYear() + '-' + today.getDate() + '-' + (today.getMonth()+1);
    cy.log(logDate)
    agentLogin.dateResult().first().invoke('text').should('contain', logDate)

    agentLogin.elapsedResult().then(($el) => {
        elapsedTime = parseInt($el.text().split(':').slice(-1));
        expect(elapsedTime).to.be.lessThan(60);
    })
})

// Scenario Outline: Agent login component can be removed

Given ('that the {string} is logged in', (user) => {
    if( user == 'admin user'){
        cy.login();
        agentLogin.visitLandingPage();
        agentLogin.loggedInTitle().should('contain', 'Recent Wallboards');
    }
    else{
        cy.loginLeader()
        agentLogin.visitLandingPage();
        agentLogin.loggedInTitle().should('contain', 'Recent Wallboards');
    }
})
And ('a wallboard with one agent login component exists', () => {
    agentLogin.newWallboard().click();
    agentLogin.addComponent().click();
    agentLogin.usersCategory().click();
    agentLogin.componentTitle().contains('Agent login').click();
    agentLogin.selectButton().click();
    agentLogin.addButton().click();
})

When ('the user navigates to remove the component', () => {
    agentLogin.removeComponent().click()
    agentLogin.deleteButton().click()
})

Then ('the component is no longer displayed on the wallboard', () => {
   agentLogin.nowallboardText()
})

// Scenario: Agent login component name does not allow invalid characters

Given ('that the user is logged in', () => {
    cy.login();
    agentLogin.visitLandingPage();
    agentLogin.loggedInTitle().should('contain', 'Recent Wallboards');
})
And ('a wallboard with an agent login component exists', () => {
    agentLogin.newWallboard().click();
    agentLogin.addComponent().click();
    agentLogin.usersCategory().click();
    agentLogin.componentTitle().contains('Agent login').click();
    agentLogin.selectButton().click();
    agentLogin.addButton().click();
})

When ('the user navigates to edit component name by entering invalid characters', () => {
    agentLogin.editModalSetting().click({force:true})
    agentLogin.modalTitle().clear().type('#@')
    agentLogin.saveModal().click()
})

Then ('the user is informed that invalid characters are not allowed', () => {
    agentLogin.errorMessage().contains('Title must be alphanumeric')
})

// Scenario: Agent login component name cannot be empty


Given ('that the user is logged in', () => {
    cy.login();
    agentLogin.visitLandingPage();
    agentLogin.loggedInTitle().should('contain', 'Recent Wallboards');
})
And ('a wallboard with one agent login component is already created', () => {
    agentLogin.newWallboard().click();
    agentLogin.addComponent().click();
    agentLogin.usersCategory().click();
    agentLogin.componentTitle().contains('Agent login').click();
    agentLogin.selectButton().click();
    agentLogin.addButton().click();
})

When ('the user navigates to edit component name by removing all characters in the name field', () => {
    agentLogin.editModalSetting().click({force:true})
    agentLogin.modalTitle().clear()
    agentLogin.saveModal().click()
})

Then ('the user is informed that component name cannot be empty', () => {
    agentLogin.errorMessage().contains('Title must be alphanumeric')
})

// Scenario: The time displayed on the agent login component updates when the time zone option is edited

Given ('the wallboard for an agent login component is displayed', () => {
    cy.login();
    agentLogin.visitLandingPage();
    agentLogin.loggedInTitle().should('contain', 'Recent Wallboards');

    agentLogin.newWallboard().click();
    agentLogin.addComponent().click();
    agentLogin.usersCategory().click();
    agentLogin.componentTitle().contains('Agent login').click();
    agentLogin.selectButton().click();
    agentLogin.modalPeriod().select('month')
    agentLogin.addButton().click()

    agentLogin.componentTimeZone().then(($element)=>{
        timezone = $element.text()
    })

    agentLogin.editModal().click()
})
And ('the user changes the current time zone option', () => {
    agentLogin.modalTimeZone().select('-420')
})

When ('the user saves the new configuration', () => {
    agentLogin.saveModal().click();
    cy.wait(1000)
})

Then ('the time displayed updates', () => {
    agentLogin.componentTimeZone().then(($element)=>{
        expect($element.text()).to.not.eq(timezone)
    })
})

// Scenario Outline: The agent login records are filtered based on the time period selected


Given ('that a wallboard with a default agent login component and a default agent list component is displayed', () => {
    cy.login();
    agentLogin.visitLandingPage();
    agentLogin.newWallboard().click();
    agentLogin.addAgentList();

    agentLogin.addComponent().click();
    agentLogin.usersCategory().click();
    agentLogin.componentTitle().contains('Agent login').click();
    agentLogin.selectButton().click();
    agentLogin.addButton().click();
})

And ("the user changes the first agent's log in state", () => {
    agentLogin.agentName().first().then(($el) => {
        name = $el.text();
        cy.log(name)
    })

    agentLogin.availabilityState().first().then(($el) => {
        avState = $el.text();
        cy.log(avState + ' original state')

        if (avState !== 'Working') {
            agentLogin.availabilityState().first().click();
            agentLogin.avOption().contains('Working').click();
        }
        else if (avState == 'Working') {
            agentLogin.availabilityState().first().click();
            agentLogin.avOption().contains('Off Shift').click();
        }
    })
})
And ('the user changes the agent login component current period to {string} period', (another) => {
    if(another == 'This Hour'){
        agentLogin.editLogin().click();
        agentLogin.modalPeriod().select('hour')
        period = another
    }
    else if(another == 'Rolling Hour'){
        agentLogin.editLogin().click();
        agentLogin.modalPeriod().select('rolling-hour')
        period = another

    }
    else if(another == 'This Week'){
        agentLogin.editLogin().click();
        agentLogin.modalPeriod().select('week')
        period = another

    }
    else if(another == 'This Month'){
        agentLogin.editLogin().click();
        agentLogin.modalPeriod().select('month')
        period = another

    }
})

When ('the new configuration is saved', () => {
    agentLogin.saveModal().click();
})

Then('the records displayed fit the time period selected', () => {
    var today = new Date();
    cy.wait(3000)

    if (period == 'This Hour') {
        agentLogin.agentLoginRecords().each(($time) => {
            var date = $time.text().split(' ')[2].split(':')
            expect(date[0]).to.include(today.getHours())
        })
    }
    else if (period == 'Rolling Hour') {
        agentLogin.agentLoginRecords().each(($time) => {
            var date = $time.text().split(' ')[2].split(':')
            expect(date[0]).to.be.greaterThan(today.getHours() - 2)
        })
    }
    else if (period == 'This Week') {
        agentLogin.agentLoginRecords().each(($time) => {
            var date = $time.text().split('-')
            expect(parseInt(date[2])).to.be.greaterThan(parseInt(today.getDate() - 7))
        })
    }
    else if (period == 'This Month') {
        agentLogin.agentLoginRecords().each(($time) => {
            var time = $time.text().split('-')
            expect(time[1]).to.include(today.getMonth() + 1)
        })
    }
})

// Scenario: No file is generated when there are no events recorded for the interval selected

Given('the wallboard with an agent list component is displayed', () =>{
    cy.login()
    agentLogin.visitLandingPage();
    agentLogin.loggedInTitle().should('contain', 'Recent Wallboards');

    agentLogin.newWallboard().click();
    agentLogin.addComponent().click();
    agentLogin.usersCategory().click();
    agentLogin.componentTitle().contains('Agent login').click();
    agentLogin.selectButton().click();
    agentLogin.addButton().click()
})

And ('the user navigates to edit configuration options', () => {
    agentLogin.editModal().click();
})

When ('the user enters dates for an interval export with no events', () => {
    date = new Date()
    var today = new Date()
    date = (today.getFullYear()-50)+'-'+(today.getMonth())+'-'+today.getDate()
    cy.log(date)
    agentLogin.intervalFrom().type(date);
    agentLogin.intervalTo().type(date);
})

Then ('the user is informed that there are no records', () => {
    agentLogin.export().click();
    agentLogin.notification().should('be.visible').and('contain', 'No data for the selected interval.')
})

// Scenario Outline: Min 1 and max 100 records are displayed on the Agent login component
Given ('a wallboard with one agent login component is displayed', () => {
    cy.login()
    agentLogin.visitLandingPage();
    agentLogin.newWallboard().click();
    agentLogin.addComponent().click();
    agentLogin.usersCategory().click();
    agentLogin.componentTitle().contains('Agent login').click();
    agentLogin.selectButton().click();
    agentLogin.modalPeriod().select('month');
    agentLogin.addButton().click();
})
And ('the user navigates to edit the configuration options', () => {
    agentLogin.editModal().click();
})
When ('the user enters {string} for the limit results field', (value) => {
    agentLogin.modalLimitResults().clear().type(value);
    agentLogin.saveModal().click();
})
Then ('the corresponding {string} number of records is displayed', (value) => {
    agentLogin.agentLoginRecords().then(($el) => {
        expect($el.length.toString()).to.eq(value)
    })
})

// Scenario Outline: Selecting to view results outside the available limit range is not allowed
Given ('the wallboard with one agent login component is displayed', () => {
    cy.login()
    agentLogin.visitLandingPage();
    agentLogin.newWallboard().click();
    agentLogin.addComponent().click();
    agentLogin.usersCategory().click();
    agentLogin.componentTitle().contains('Agent login').click();
    agentLogin.selectButton().click();
    agentLogin.addButton().click();
})
And ('the user edits the configuration options', () => {
    agentLogin.editModal().click();
})
And ('the user enters {} in the limit results field', (value) => {
    agentLogin.modalLimitResults().clear().type(value);
})
When ('the user attempts to save the new configuration', () => {
    agentLogin.saveModal().click();
})
Then ('the user is informed about the result allowed limits', () => {
    agentLogin.modalLimitResults().invoke('val').then(($el) => {
        if($el < 1) {
            agentLogin.errorMessage().should('contain', 'Min value is 1')
        }
        else if($el > 100) {
            agentLogin.errorMessage().should('contain', 'Max value is 100')
        }
    })
})

// Scenario: Export results option is unavailable if the interval dates requested are in the future
Given ('the wallboard with an agent list component is displayed', () => {
    cy.login()
    agentLogin.visitLandingPage();
    agentLogin.loggedInTitle().should('contain', 'Recent Wallboards');

    agentLogin.newWallboard().click();
    agentLogin.addComponent().click();
    agentLogin.usersCategory().click();
    agentLogin.componentTitle().contains('Agent login').click();
    agentLogin.selectButton().click();
    agentLogin.addButton().click()
})
And ('the user navigates to edit configuration options', () => {
    agentLogin.editModal().click();
})
When ('the user enters dates in the future for the interval export', () => {
    date = new Date()
    var today = new Date()
    date = (today.getFullYear())+'-'+(today.getMonth()+2)+'-'+today.getDate()
    cy.log(date)
    agentLogin.intervalFrom().invoke('attr', 'value', date);
    agentLogin.intervalTo().invoke('attr', 'value', date);
})
Then ('the option to export results is unavailable', () => {
    agentLogin.export().should('not.exist');
})
