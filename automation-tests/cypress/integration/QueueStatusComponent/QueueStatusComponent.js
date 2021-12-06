import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import QueueStatus_PO from '../../support/PageObjects/QueueStatus_PO';

const queueStatus = new QueueStatus_PO()
var content = ''
var title = ''
var statuses = []
var available = 0
var busy = 0
var wrappedup = 0
var loggedOff = 0

// Scenario Outline: Queue status specific metrics are displayed on the queue status component
Given ('the {string} is logged in', (user) => {
    if(user == 'admin user') {
        cy.login();
        queueStatus.visitLandingPage();
        queueStatus.loggedInTitle().should('contain', 'Recent Wallboards');
    }
    else if(user == 'team leader user') {
        cy.loginLeader();
        queueStatus.visitLandingPage();
        queueStatus.loggedInTitle().should('contain', 'Recent Wallboards');
    }
})
And ('the user navigates to create a new wallboard', () => {
    queueStatus.newWallboardButton().click();
})
When ('a new queue status component is added', () => {
    queueStatus.addComonentButton().click();
    queueStatus.queuesCategory().click();
    queueStatus.componentModalTitle().contains('Queue status').click();
    queueStatus.selectButton().click();
    queueStatus.saveModalButton().click();
})
Then ('the following metrics are displayed: Available Agents, Busy Agents, Wrapped Up Agents, Logged Off Agents, Total Agents, Total Calls Queueing, Longest Time in Queue, Most Dial Attempts', () => {
    var categories = ['available agents', 'busy agents', 'wrapped up agents', 'logged off agents', 'total agents', 'total calls queueing', 'longest time in queue', 'most dial attempts'];
    var i = 0
    queueStatus.componentCategTitle().each((title) => {
        expect(title.text().toLowerCase()).to.eq(categories[i])
        i = i+1
    })
})

// Scenario: Queue status component name does not allow invalid characters
Given ('the user is logged in', () => {
    cy.login();
    queueStatus.visitLandingPage();
    queueStatus.loggedInTitle().should('contain', 'Recent Wallboards');
})
And ('a wallboard with a queue status component exists', () => {
    queueStatus.newWallboardButton().click();
    queueStatus.addComonentButton().click();
    queueStatus.queuesCategory().click();
    queueStatus.componentModalTitle().contains('Queue status').click();
    queueStatus.selectButton().click();
    queueStatus.saveModalButton().click();
})
When ('the user navigates to edit component name by entering invalid characters', () => {
    queueStatus.editComponent().click();
    queueStatus.modalTitleInput().clear().type('!@#');
    queueStatus.saveModalButton().click();
})
Then ('the user is informed that invalid characters are not allowed', () => {
    queueStatus.error().should('contain', 'Title must be alphanumeric');
})

// Scenario: Queue status component name cannot be empty
Given ('that the user is logged in', () => {
    cy.login();
    queueStatus.visitLandingPage();
    queueStatus.loggedInTitle().should('contain', 'Recent Wallboards');
})
And ('a wallboard with one queue status component is already created', () => {
    queueStatus.newWallboardButton().click();
    queueStatus.addComonentButton().click();
    queueStatus.queuesCategory().click();
    queueStatus.componentModalTitle().contains('Queue status').click();
    queueStatus.selectButton().click();
    queueStatus.saveModalButton().click();
})
When ('the user navigates to edit component name by removing all characters in the name field', () => {
    queueStatus.editComponent().click();
    queueStatus.modalTitleInput().clear();
    queueStatus.saveModalButton().click();
})
Then ('the user is informed that component name cannot be empty', () => {
    queueStatus.error().should('contain', 'Title must be alphanumeric');
})

// Scenario Outline: Queue status component can be removed
Given ('that the {string} is logged in', (user) => {
    if(user == 'admin user') {
        cy.login();
        queueStatus.visitLandingPage();
        queueStatus.loggedInTitle().should('contain', 'Recent Wallboards');
    }
    else if(user == 'team leader user') {
        cy.loginLeader();
        queueStatus.visitLandingPage();
        queueStatus.loggedInTitle().should('contain', 'Recent Wallboards');
    }
})
And ('a wallboard with one queue status component is displayed', () => {
    queueStatus.newWallboardButton().click();
    queueStatus.addComonentButton().click();
    queueStatus.queuesCategory().click();
    queueStatus.componentModalTitle().contains('Queue status').click();
    queueStatus.selectButton().click();
    queueStatus.saveModalButton().click();
})
When ('the user navigates to remove the component', () => {
    queueStatus.deleteComponent().click();
    queueStatus.confirmDeletion().click();
})
Then ('the component is no longer displayed on the wallboard', () => {
    queueStatus.componentBody().should('not.exist');
})

// Scenario: Selected queue is displayed on the queue status component
Given ('that the user is logged in', () => {
    cy.login();
    queueStatus.visitLandingPage();
    queueStatus.loggedInTitle().should('contain', 'Recent Wallboards');
})
And ('the user navigates to create a new wallboard', () => {
    queueStatus.newWallboardButton().click();
})
And ('the user adds an agent list component for a given call queue', () => {
    queueStatus.addComonentButton().click();
    queueStatus.queuesCategory().click();
    queueStatus.componentModalTitle().contains('Agent list').click();
    queueStatus.selectButton().click();
    queueStatus.addModalButton().click();
    cy.wait(3000);

    queueStatus.componentBody().then(($el) => {
        content = $el.text();
        cy.log(content)
    })

    queueStatus.widgetTitle().then(($title) => {
        title = $title.text().split(':').slice(1)
        cy.log(title)
    })

    queueStatus.agentPresence().each(($el) => {
        statuses.push($el.text());
        cy.wrap(statuses)
    })

})

And ('the user adds a queue status component for the same selected call queue', () => {
    queueStatus.addComonentButton().click();
    queueStatus.queuesCategory().click();
    queueStatus.componentModalTitle().contains('Queue status').click();
    queueStatus.selectButton().click();
    queueStatus.selectCallQ().select(title);
    queueStatus.saveModalButton().click();
})
When('the user inspects the details for the queue status component', () => {
// actions performed in step below
})
Then ('the correct details about the selected call queue are displayed', () => {
    if (content == 'No agents') {
        cy.log('Selected queue has no agents')
        queueStatus.categRowData().each(($el) => {
            cy.wrap($el).then(($text) => {
                expect($text.text()).to.contain('0')
            })
        })
    }
    
    else {
        for (let i = 0; i < statuses.length; i++) {
            if (statuses[i] == 'Inbound Call') { busy = busy + 1; }
            else if (statuses[i] == 'Ringing') { busy = busy + 1; }
            else if (statuses[i] == 'In Wrapup') { wrappedup = wrappedup + 1; }
            else if (statuses[i] == 'Inbound Non-Queue Call') { busy = busy + 1; }
            else if (statuses[i] == 'Outbound Call') { busy = busy + 1; }
            else if (statuses[i] == 'Available') { available = available + 1; }
            else if (statuses[i] == 'Logged Off') { loggedOff = loggedOff + 1; }
        }
        cy.log(available + ' Available')
        cy.log(busy + ' Busy')
        cy.log(wrappedup + ' Wrapping Up')
        cy.log(loggedOff + ' Logged Off')

        queueStatus.availableAgents().then(($el) => {
            expect($el.text()).to.contain(available.toString());
        })
        queueStatus.busyAgents().then(($el) => {
            expect($el.text()).to.contain(busy.toString());
        })
        queueStatus.wrappedupAgents().then(($el) => {
            expect($el.text()).to.contain(wrappedup.toString());
        })
        queueStatus.loggedoffAgents().then(($el) => {
            expect($el.text()).to.contain(loggedOff.toString());
        })
        queueStatus.totalAgents().then(($el) => {
            expect($el.text()).to.contain(statuses.length.toString());
        })
    }
})

// Scenario: Correct queue status metrics are displayed when the selected queue has no agents
Given ('the wallboard creation page is displayed', () => {
    cy.login();
    queueStatus.visitLandingPage();
    queueStatus.newWallboardButton().click();
    queueStatus.verifyCreationPage();
})
And ('the queue status component modal for an empty call queue is open', () => {
    queueStatus.addComonentButton().click();
    queueStatus.queuesCategory().click();
    queueStatus.componentModalTitle().contains('Queue status').click();
    queueStatus.selectButton().click();
    queueStatus.selectCallQ().select(2);
})
When ('the user saves the component', () => {
    queueStatus.saveModalButton().click();
})
Then ('the all queue status metrics indicate there are no agents in the selected queue', () => {
    queueStatus.categRowData().each(($el) => {
        cy.wrap($el).then(($text) => {
            expect($text.text()).to.contain('0')
        })
    })
})

// Scenario: Correct number of total calls queueing is displayed when no calls are made to the selected queue call
Given ('the queue status component is displayed', () => {
    cy.login();
    queueStatus.visitLandingPage();
    queueStatus.newWallboardButton().click();
    queueStatus.addComonentButton().click();
    queueStatus.queuesCategory().click();
    queueStatus.componentModalTitle().contains('Queue status').click();
    queueStatus.selectButton().click();
    queueStatus.saveModalButton().click();
    queueStatus.widgetTitle().should('contain', 'Queue Status');
})
And ('no call is made to the selected call queue', () => {
    // no action needed
})
When ('the user inspects the total calls queuing', () => {
    // action performed in step below
})
Then ('the total number displayed is 0', () => {
    queueStatus.callsQueuing().should('contain', '0')
})