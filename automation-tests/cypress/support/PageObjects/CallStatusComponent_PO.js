class CallStatusComponent {
    visitLandingPage() {
        return cy.visit('http://localhost:3000/')
    }

    loggedInTitle() {
        return cy.get('.c-toolbar-left__heading')
    }

    newWallboard() {
        return cy.get('.c-toolbar-right').contains('+ New Wallboard')
    }

    addComponent() {
        return cy.get('.c-toolbar-right').contains('+ Add Component')
    }

    callCategory() {
        return cy.get('.c-modal--new-wallboard__nav-item').contains('Calls')
    }

    componentTitle() {
        return cy.get('.c-modal--new-wallboard__list-title')
    }

    selectButton() {
        return cy.get('.c-modal__buttons').contains('Select')
    }

    saveButton(){
        return cy.get('.c-modal__buttons').contains('Save')
    }

    callStatusTitle() {
        return cy.get('.widget__call-status-title')
    }

    callStatusBody() {
        return cy.get('.widget__body.widget__body--call-status')
    }

    editComponentButton() {
        return cy.get('.widget__edit-icon')
    }

    modalTitle() {
        return cy.get('.c-input.c-input--grey')
    }

    error() {
        return cy.get('.c-input__error-message')
    }

    removeComponent() {
        return cy.get('.widget__delete-icon')
    }

    confirmDeletion() {
        return cy.get('.c-modal__footer').contains('Delete').click()
    }

    defaultAgentList() {
        cy.get('.c-modal--new-wallboard__nav-item').contains('Queues').click();
        cy.get('.c-modal--new-wallboard__list-title').contains('Agent list').click();
        cy.get('.c-modal__buttons').contains('Select').click();
        cy.get('div.c-modal--add-component__input-section.c-modal--add-component__input-section--interactivity > label:nth-child(2) > input').should('be.checked')
        cy.get('.c-modal__buttons').contains('Add').click();
    }

    agentListBody() {
        return cy.get('.widget__body')
    }

    callAgent() {
        cy.get('.agent-c__cog-icon').first().click();
        cy.get('.c-dropdown__item', {timeout: 5000}).contains('Call agent').click();
    }

    internalCateg() {
        return cy.get('div.widget__body.widget__body--call-status > div:nth-child(3) > div.widget__call-status-data > div')
    }

    selectCallQ() {
        return cy.get('select[name=callQueue] > option:selected')
    }
 
}
export default CallStatusComponent;