class CreateGroup_PO {
    visitLandingPage(){
        cy.visit('http://localhost:3000/')
    }

    pageTitle() {
        return cy.get('.c-toolbar-left__heading', {timeout: 5000})
    }

    newGroupButton() {
        return cy.get('.c-toolbar-right').contains('+ New Wallboard Group', {timeout: 10000});
    }

    sideMenu() {
        return cy.get('.burger').click();
    }

    closeMenu() {
        return cy.get('.burger.burger--active').click();
    }

    allGroupsFilter() {
        return cy.get('.c-landing-sidebar-list__filter').contains('All Wallboard Groups');
    } 

    allWallboardsFilter() {
        return cy.get('.c-landing-sidebar-list__filter').contains('All Wallboards');
    } 

    newGroupTitle() {
        return cy.get('.c-input.c-input--new-walboard-title')
    }

    newStep() {
        return cy.get('.new-step')
    }

    newEmptyStep() {
        return cy.get('div[class=new-empty-step__plus]')
    }

    wallboardNameModal() {
        return cy.get('div.c-modal--new-wallboard__list-title')
    }

    modalButton() {
        return cy.get('.c-modal__buttons')
    }

    groupButton() {
        return cy.get('.c-toolbar-right')
    }

    confirmationButton() {
        return cy.get('.c-modal__footer')
    }

    logo() {
        return cy.get('.c-banner-logo')
    }

    groupsLanding() {
        return cy.get('.c-landing-table__wb-name')
    }

    modalWarning() {
        return cy.get('.c-modal__body--save-changes__phrase')
    }

    readOnlyBar() {
        return cy.get('.c-toolbar.c-toolbar--wb-read-only')
    }

    readOnlyContent() {
        return cy.get('.c-wallboard--read-only')
    }

    screenOptionsCog() {
        return cy.get('div.step__footer-input-cog > svg')
    }

    emptyStepCog() {
        return cy.get('.i--settings.i--settings--step-card')
    }

    screenOption() {
        return cy.get('.step-popup__option')
    }

    stepFooterWB() {
        return cy.get('.step__footer-walboard')
    }

    removeModalTitle() {
        return cy.get('.c-modal__header')
    }

    removeButton() {
        return cy.get('.c-modal__footer.c-modal__footer--remove-step')
    }

    step() {
        return cy.get('.wb-group__step')
    }

    seconds() {
        return cy.get('input[type=number]')
    }

    createGroup() {
        cy.get('.c-toolbar-right').contains('+ New Wallboard Group').click();
        cy.get('.new-step').click();
        cy.get('div[class=new-empty-step__plus]').click();
        cy.get('div.c-modal--new-wallboard__list-title').first().click();
        cy.get('.c-modal__buttons').contains('Select').click();
        cy.get('.c-toolbar-right').contains('Save').click();
        cy.get('.c-modal__footer').contains('Save').click();
        cy.wait(1000);
        cy.get('.c-banner-logo').click();
    }

    stepItems() {
        return cy.get('div[class=step]');
    }
}
export default CreateGroup_PO;