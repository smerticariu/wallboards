class UserPermissions_PO {

    visitLandingPage() {
        return cy.visit('http://localhost:3000/')
    }

    newWallboard() {
        return cy.get('.c-toolbar-right').contains('+ New Wallboard')
    }

    wallboardTitle() {
        return cy.get('div.c-toolbar > div.c-toolbar-left > div > input')
    }

    addComponent() {
        cy.get('.c-toolbar-right').contains('+ Add Component').click();
        cy.get('.c-modal--new-wallboard__list-title').contains('Agent list').click();
        cy.get('.c-modal__buttons').contains('Select').click();
        cy.get('.c-modal__buttons').contains('Add').click();
    }

    saveWallboardChanges() {
        cy.get('.c-toolbar-right').contains('Save').click();
        cy.get('.c-modal__footer').contains('Save').click();
    }

    settingsCog() {
        return cy.get('div.c-toolbar-right > svg');
    }

    createUrlButton() {
        return cy.get('div:nth-child(4) > button');
    }

    getURL() {
        return cy.get('div.c-modal__section.c-modal__section--read-only.c-modal__section--read-only__generate-link > input');
    }

    saveSettingsModal() {
        return cy.get('.c-modal__buttons.c-modal__buttons--settings').contains('Save');
    }

    accessMessage() {
        return cy.get('div.c-toolbar.c-toolbar--error', {timeout:10000});
    
    }

    adminLogOut(){
        cy.get('div.c-wallboard--new > div.c-toolbar > div.c-toolbar-right > a').invoke('removeAttr', 'target').click();
        cy.get('div.c-wallboard--read-only > div.c-toolbar > div.c-toolbar-right > button').click();
    }

    readOnlyLogout() {
        return cy.get('div.c-wallboard--read-only > div.c-toolbar > div.c-toolbar-right > button').click();
    }

    logo() {
        return cy.get('.c-banner-logo')
    }

    wallboardName() {
        return cy.get('tbody > tr:nth-child(1) > td.c-landing-table__wb-name > p > a')
    }

    wallboardDescription() {
        return cy.get('td.c-landing-table__wb-name > span').first()
    }

    readOnlyMode() {
        return cy.get('.c-wallboard--read-only__component')
    }

    author() {
        return cy.get('.c-landing-table__wb-created-by')
    }

    userName() {
        return cy.get('.c-toolbar-left__wb-no')
    }

    editButton() {
        return cy.get('.c-landing-table__edit-btn').first();
    }

    editWallboardDescription() {
        return cy.get('.c-textarea')
    }

    deleteWallboard() {
        cy.get('tbody > tr:nth-child(1) > td.c-landing-table__wb-actions > button.c-landing-table__delete-btn').click();
        cy.get('.c-modal__footer').contains('Delete').click();
    }

    changesNotification() {
        return cy.get('.notification__body')
    }

    copyButton() {
        return cy.get('.c-landing-table__copy-btn').first()
    }
}
export default UserPermissions_PO