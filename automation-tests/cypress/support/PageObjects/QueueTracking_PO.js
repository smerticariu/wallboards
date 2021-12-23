class QueueTracking_PO {

    visitLandingPage(){
        cy.visit('http://localhost:3000/#/')
    }

    loggedInTitle() {
        return cy.get('.c-toolbar-left__heading', {timeout: 5000})
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

    queuesCategory() {
        return cy.get('.c-modal--new-wallboard__nav-item').contains('Queues')
    }

    componentCategsTitle() {
        return cy.get('.c-modal--new-wallboard__list-title')
    }

    selectButton() {
        return cy.get('.c-modal__buttons').contains('Select')
    }

    addModalButton(){
        return cy.get('.c-modal__buttons').contains('Add')
    }

    inputComponentTitle() {
        return cy.get('input[name=title]')
    }

    selectCallQ() {
        return cy.get('select[name=callQueue]')
    }

    callQSelected() {
        return cy.get('select[name=callQueue] option:selected')
    }

    widgetTitle() {
        return cy.get('.widget__title')
    }

    componentModalTitle() {
        return cy.get('.c-input.c-input--grey').first();
    }

    showColumns() {
        return cy.get('.c-checkbox.c-checkbox--queue-tracking input')
    }

    rowTitle() {
        return cy.get('.widget__call-status-title')
    }

    createDefaultQTracking() {
        cy.get('.c-toolbar-right').contains('+ New Wallboard').click();
        cy.get('.c-toolbar-right').contains('+ Add Component').click();
        cy.get('.c-modal--new-wallboard__nav-item').contains('Queues').click();
        cy.get('.c-modal--new-wallboard__list-title').contains('Queue tracking').click();
        cy.get('.c-modal__buttons').contains('Select').click();
        cy.get('.c-modal__buttons').contains('Add').click();
        cy.get('.c-input.c-input--new-walboard-title').clear().type('Default Queue Tracking');
    }

    saveWB() {
        cy.get('.c-toolbar-right').contains('Save').click();
        cy.get('.c-modal__footer').contains('Save').click();
    }

    editComponent() {
        return cy.get('.widget__edit-icon')
    }

    removeComponent() {
        cy.get('.widget__delete-icon').click();
        cy.get('.c-modal__footer').contains('Delete').click();
    }

    error() {
        return cy.get('.c-input__error-message')
    }

    saveModal() {
        return cy.get('.c-modal__buttons').contains('Save');
    }

    modalTitle() {
        return cy.get('.c-modal__title')
    }

    totalCalls() {
        return cy.get('input[name=TOTAL_CALLS]')
    }

    maxWait() {
        return cy.get('input[name=MAX_WAIT]')
    }

    solidCalls() {
        return cy.get('input[name=SOLID_CALLS]')
    }

    period() {
        return cy.get('select[name=period]')
    }

    timeZone() {
        return cy.get('select[name=timeZone]')
    }

    totalNumberCalls() {
        return cy.get('div.widget__body.widget__body--call-status > div:nth-child(1) > div.widget__call-status-data > div');
    }

    totalMaxWait() {
        return cy.get('div.widget__body.widget__body--call-status > div:nth-child(10) > div.widget__call-status-data > div')
    }

    averageWait() {
        return cy.get('div.widget__body.widget__body--call-status > div:nth-child(9) > div.widget__call-status-data > div')
    }

    startWeek() {
        return cy.get('select[name=startOfWeek]')
    }

    component() {
        return cy.get('.widget')
    }

    abandonedCheckbox() {
        return cy.get('input[name=abandonedCallSLA]').first();
    }

    abandonedPanel() {
        return cy.get('div.widget__body.widget__body--call-status > div:nth-child(4)')
    }

    inputAbandoned() {
        return cy.get('.c-input.c-input--small-size.c-input--grey')
    }
}
export default QueueTracking_PO