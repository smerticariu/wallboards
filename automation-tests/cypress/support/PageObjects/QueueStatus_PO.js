class QueueStatus_PO {

    visitLandingPage(){
        cy.visit('http://localhost:3000/#/')
    }
    newWallboardButton() {
        return cy.get('.c-toolbar-right').contains('+ New Wallboard');
    }

    verifyCreationPage() {
        cy.get('.c-wallboard--new').should('exist')
    }

    addComonentButton() {
        return cy.get('.c-toolbar-right').contains('+ Add Component');
    }

    loggedInTitle() {
        return cy.get('.c-toolbar-left__heading', {timeout: 5000})
    }

    queuesCategory() {
        return cy.get('.c-modal--new-wallboard__nav-item').contains('Queues')
    }

    componentModalTitle() {
        return cy.get('.c-modal--new-wallboard__list-title')
    }

    selectButton() {
        return cy.get('.c-modal__buttons').contains('Select')
    }

    saveModalButton(){
        return cy.get('.c-modal__buttons').contains('Save')
    }

    addModalButton(){
        return cy.get('.c-modal__buttons').contains('Add')
    }

    componentCategTitle() {
        return cy.get('.widget__call-status-title')
    }

    editComponent() {
        return cy.get('.widget__edit-icon')
    }

    deleteComponent() {
        return cy.get('.widget__delete-icon')
    }

    confirmDeletion() {
        return cy.get('.c-modal__footer').contains('Delete')
    }

    modalTitleInput() {
        return cy.get('input[name=title]')
    }

    error() {
        return cy.get('.c-input__error-message')
    }

    componentBody() {
        return cy.get('.widget__body')
    }

    selectCallQ() {
        return cy.get('select[name=callQueue]')
    }
    widgetTitle() {
        return cy.get('.widget__title')
    }

    categRow() {
        return cy.get('div[class=widget__call-status-row]')
    }

    categRowData() {
        return cy.get('div[class=widget__call-status-row] > div > div')
    }

    agentPresence() {
        return cy.get('div[class=agent-c__footer]')
    }

    callsQueuing() {
        return cy.get('div.widget__body.widget__body--call-status > div:nth-child(6)')
    }

    availableAgents() {
        return cy.get('div.widget__body.widget__body--call-status > div:nth-child(1)')
    }

    busyAgents() {
        return cy.get('div.widget__body.widget__body--call-status > div:nth-child(2)')
    }

    wrappedupAgents() {
        return cy.get('div.widget__body.widget__body--call-status > div:nth-child(3)')
    }

    loggedoffAgents() {
        return cy.get('div.widget__body.widget__body--call-status > div:nth-child(4)')
    }
    
    totalAgents() {
        return cy.get('div.widget__body.widget__body--call-status > div:nth-child(5)')
    }
}
export default QueueStatus_PO