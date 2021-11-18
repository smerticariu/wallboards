import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import UserPermissions_PO from '../../support/PageObjects/UserPermissions_PO';

const permissions = new UserPermissions_PO();
var url = ''
var userName = ''
var newNumber = 0


// Scenario: Basic user does not have access to the landing page
Given ('an admin user generates a read-only URL for a saved wallboard', () => {
    cy.login();
    permissions.visitLandingPage();
    permissions.newWallboard().click();
    permissions.addComponent();
    permissions.settingsCog().click();
    permissions.createUrlButton().click();
    permissions.getURL().invoke('val').then((text) => {
        url = text;
        cy.log(url);
    })
    permissions.saveSettingsModal().click();
    permissions.saveWallboardChanges();
    permissions.adminLogOut();
})
And ('the basic user accesses the URL', () => {
    cy.loginBasic();
    cy.visit(url);
})
When ('the basic user attempts to navigate to the wallboards landing page', () => {
    permissions.logo().click();
})
Then ('the user is informed that access is denied', () => {
    permissions.accessMessage().then((message) => {
        cy.log(message.text());
        expect(message.text()).to.include('Access Denied!');
    })
})

// Scenario Outline: Basic and team leader users cannot edit a wallboard created by an admin user
Given ('an admin user creates a wallboard', () => {
    cy.login();
    permissions.visitLandingPage();
    permissions.newWallboard().click();
    permissions.addComponent();
    permissions.saveWallboardChanges();
})
And ('the URL for the wallboard edit mode is copied', () => {
    cy.url().then((text) => {
        url = text
        cy.log(url)
    })
    permissions.adminLogOut();
})
 When ('the {string} attempts to access the URL', (user) => {
     if (user == 'basic user') {
         cy.loginBasic();
         cy.visit(url);
     }
     else if (user == 'team leader user') {
        cy.loginLeader();
        cy.visit(url);
    }
 })
Then ('the user is informed that access is denied for editing', () => {
    permissions.accessMessage().invoke('text').should('contain', 'not allowed to edit')
})

// Scenario: Team leader users can create wallboards
Given ('the team leader user is logged in', () => {
    cy.loginLeader();
    permissions.visitLandingPage();
})
And ('the user navigates to wallboard creation page', () => {
    permissions.newWallboard().click();
    permissions.wallboardTitle().clear().type('Team Leader Wallboard')
})
And ('the user adds a new component', () => {
    permissions.addComponent();
})
When ('the user saves the wallboard', () => {
    permissions.saveWallboardChanges();
})
Then ('the wallboard is displayed on the landing page', () => {
    permissions.logo().click();
    cy.wait(1000)
    permissions.wallboardName().then((name) => {
        expect(name.text()).to.eq('Team Leader Wallboard')
    })
})

// Scenario: Team leader users can view the wallboards created by them
Given ('the team leader created a wallboard', () => {
    cy.loginLeader();
    permissions.visitLandingPage();
    permissions.newWallboard().click();
    permissions.addComponent();
    permissions.saveWallboardChanges();
})
And ('the user navigates to the landing page', () => {
    permissions.logo().click();
    cy.wait(1000)
})
When ('the user navigates to view the wallboard created', () => {
    permissions.wallboardName().invoke('removeAttr', 'target').click();
})
Then ('the wallboard is displayed in read-only mode', () => {
    permissions.readOnlyMode().should('be.visible')
})

// Scenario: Team leader users can not view wallboards created by other users on the landing page
Given ('the team leader user logs in', () => {
    cy.loginLeader();
    permissions.visitLandingPage();
    permissions.newWallboard().click();
    permissions.userName().invoke('text').then((name) => {
        userName = name.split('as ').slice(1);
        cy.log(userName)
    })
})
When ('the user inspects all wallboards authors', () => {
    permissions.logo().click();
})
Then ('all wallboards displayed are created by the currently logged in user', () => {
    permissions.author().then((number) => {
        newNumber = number.length;
        cy.log(newNumber)

        for (let i = 1; i <= newNumber; i++) {
            cy.get('tbody > tr:nth-child(' + i + ') > td.c-landing-table__wb-created-by').then((author) => {
                cy.log(i, author.text());
                expect(author.text()).to.include(userName)
            })
        }
    })
})

// Scenario: Team leader users can edit the wallboards created by them
Given ('a wallboard created by a team leader user exists', () => {
    cy.loginLeader();
    permissions.visitLandingPage();
    permissions.newWallboard().click();
    permissions.saveWallboardChanges();
    permissions.logo().click();
    cy.wait(1000);
})
And ('the user navigates to edit the wallboard from landing page', () => {
    permissions.editButton().invoke('removeAttr', 'target').click();
})
When ('the user changes the wallboard details', () => {
    permissions.settingsCog().click();
    permissions.editWallboardDescription().clear().type('Edited Wallboard Description');
    permissions.saveSettingsModal().click();
})
And ('the user saves the changes made', () => {
    permissions.wallboardTitle().clear().type('Edited Wallboard Name');
    permissions.saveWallboardChanges();
    cy.wait(1000);
    permissions.logo().click();
})
Then ('the new details are displayed for the wallboard on the landing page', () => {
    permissions.wallboardName().then((name) => {
        expect(name.text()).to.include('Edited Wallboard Name');
    })

    permissions.wallboardDescription().then((description) => {
        expect(description.text()).to.include('Edited Wallboard Description');
    })
})

// Scenario: Team leader users can delete the wallboards created by them
Given ('the team leader creates a wallboard', () => {
    cy.loginLeader();
    permissions.visitLandingPage();
    permissions.newWallboard().click();
    permissions.wallboardTitle().clear().type('Wallboard to be Deleted');
    permissions.saveWallboardChanges();
    permissions.changesNotification().should('contain', 'save');
    permissions.logo().click();
    cy.wait(1000)
    permissions.author().then((number) => {
        newNumber = number.length
        cy.log(newNumber)
    })
})
When ('the user navigates to delete the wallboard', () => {
    permissions.deleteWallboard();
    permissions.changesNotification().should('contain', 'delete');
    cy.wait(1000)
})
Then ('the the wallboard is deleted  // no longer displayed', () => {
    permissions.author().then((number) => {
        expect(number.length).to.eq(newNumber - 1)
        cy.log(number.length)

        for (let i = 1; i <= number.length; i++) {
            cy.get('tbody > tr:nth-child(' + i + ') > td.c-landing-table__wb-name > p > a').then((name) => {
                expect(name.text()).to.not.include('Wallboard to be Deleted')
            })
        }
    })
})

// Scenario: Team leader users can copy wallboards created by them
Given ('the team leader created a new wallboard', () => {
    cy.loginLeader();
    permissions.visitLandingPage();
    permissions.newWallboard().click();
    permissions.wallboardTitle().clear().type('Wallboard to be Copied');
    permissions.saveWallboardChanges();
    cy.wait(2000)

})
And ('the user navigates to the home page', () => {
    permissions.logo().click();
    permissions.author().then((number) => {
        newNumber = number.length
        cy.log(newNumber)
    })
})
When ('the user copies the wallboard', () => {
    permissions.copyButton().click();
    cy.wait(3000)
})
Then('the a new copy wallboard is created', () => {
    permissions.author().then((number) => {
        expect(number.length).to.eq(newNumber + 1)
        // cy.log(number.length)
    })

    permissions.wallboardName().then((name) => {
        expect(name.text()).to.include('Wallboard to be Copied Copy')
    })
})