class CallTracking {

    visitLandingPage() {
        return cy.visit('http://localhost:3000/')
    }

    loggedInTitle() {
        return cy.get('.c-toolbar-left__heading', {timeout: 5000})
    }

    verifyCreationPage() {
        cy.get('.c-wallboard--new').should('exist')
    }

    newWallboard() {
        return cy.get('.c-toolbar-right').contains('+ New Wallboard')
    }

    addComponent() {
        return cy.get('.c-toolbar-right').contains('+ Add Component')
    }

    callsCategory() {
        return cy.get('.c-modal--new-wallboard__nav-item').contains('Calls')
    }

    componentCategTitle() {
        return cy.get('.c-modal--new-wallboard__list-title')
    }

    selectButton() {
        return cy.get('.c-modal__buttons').contains('Select')
    }

    saveModalButton(){
        return cy.get('.c-modal__buttons').contains('Save')
    }

    selectCateg() {
        return cy.get('select[name=callCategory]')
    }

    addButton() {
        return cy.get('.c-modal__buttons').contains('Add')
    }

    editComponent() {
        return cy.get('.widget__edit-icon')
    }

    deleteComponent() {
        return cy.get('.widget__delete-icon')
    }

    componentModalTitle() {
        return cy.get('input[name=title]')
    }

    period() {
        return cy.get('select[name=period]')
    }

    componentTitle() {
        return cy.get('.widget__title--bold')
    }

    componentPeriod() {
        return cy.get('.widget__title')
    }

    categoriesTitle() {
        return cy.get('.widget__call-status-title')
    }

    error() {
        return cy.get('.c-input__error-message')
    }

    confirmDeletion() {
        return cy.get('.c-modal__footer').contains('Delete')
    }

    component() {
        return cy.get('div[class=widget]')
    }

    preview() {
        return cy.get('.c-modal--add-component__right-side')
    }

    callAgent() {
        cy.get('.agent-c__cog-icon', {timeout: 5000}).first().click();
        cy.get('.c-dropdown__item').contains('Call agent').click();
    }

    widgetData() {
        return cy.get('.widget__call-status-data')
    }

    timeZone() {
        return cy.get('select[name=timeZone]')
    }
}
export default CallTracking;