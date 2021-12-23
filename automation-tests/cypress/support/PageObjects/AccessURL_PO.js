class AccessURL_PO {
    visitLandingPage() {
        return cy.visit('http://localhost:3000/')
    }

    newWallboard() {
        return cy.get('.c-toolbar-right').contains('+ New Wallboard')
    }

    editWallboardButton() {
        return cy.get('.c-landing-table__edit-btn').first();
    }

    settingsCog() {
        return cy.get('div.c-toolbar-right > svg');
    }

    createUrlButton() {
        return cy.get('div:nth-child(4) > button');
    }

    urlButtonGroup() {
        return cy.get('form > div:nth-child(3) > button')
    }

    getURL() {
        return cy.get('div.c-modal__section.c-modal__section--read-only.c-modal__section--read-only__generate-link > input');
    }

    copyUrlButton() {
        return cy.get('div.c-modal__section.c-modal__section--read-only.c-modal__section--read-only__generate-link > button');
    }

    copyNotification() {
        return cy.get('.notification__body');
    }

    saveWallboardChanges() {
        cy.get('.c-toolbar-right').contains('Save').click();
        cy.get('.c-modal__footer').contains('Save').click();
        cy.wait(1500);
    }

    closeNotification() {
        return cy.get('.notification__close-container').click();
    }

    saveSettingsModal() {
        return cy.get('.c-modal__buttons.c-modal__buttons--settings').contains('Save', {timeout: 5000});
    }

    closeSettingsModal() {
        return cy.get('div.c-modal__buttons.c-modal__buttons--settings > button.c-button.c-button--m-left');
    }

    verifyReadOnly() {
        return cy.get('.c-wallboard--read-only');
    }

    basicNoAccessMessage() {
        return cy.get('.c-toolbar.c-toolbar--error', {timeout:10000});
    
    }

    adminLogOut(){
        cy.get('div.c-wallboard--new > div.c-toolbar > div.c-toolbar-right > a').invoke('removeAttr', 'target').click();
        cy.get('div.c-wallboard--read-only > div.c-toolbar > div.c-toolbar-right > button').click();
    }

    readOnlyLogout() {
        return cy.get('div.c-wallboard--read-only > div.c-toolbar > div.c-toolbar-right > button', {timeout: 3000}).click();
    }

    addComponent() {
        cy.get('.c-toolbar-right').contains('+ Add Component').click();
        cy.get('.c-modal--new-wallboard__list-title').contains('Agent list').click();
        cy.get('.c-modal__buttons').contains('Select').click();
        cy.get('.c-modal__buttons').contains('Add').click();
    }

    logo() {
        return cy.get('.c-banner-logo');
    }

    deleteWallboard() {
        cy.get('.c-landing-table__delete-btn', {timeout: 10000}).first().click();
        cy.get('.c-modal__footer-right-side').contains('Delete').click();
    }

    viewWallboard() {
        return cy.get('table > tbody > tr:nth-child(1) > td.c-landing-table__wb-name > p > a').invoke('removeAttr', 'target').click();
    }

    newWBTitle() {
        return cy.get('.c-input.c-input--new-walboard-title')
    }


}
export default AccessURL_PO