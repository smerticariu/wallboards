class QueueList_PO {

    visitLandingPage(){
        cy.visit('http://localhost:3000/#/')
    }

    createDefaultQListWB() {
        cy.get('.c-toolbar-right').contains('+ New Wallboard').click();
        cy.get('.c-toolbar-right').contains('+ Add Component').click();
        cy.get('.c-modal--new-wallboard__nav-item').contains('Queues').click();
        cy.get('.c-modal--new-wallboard__list-title').contains('Queue list').click();
        cy.get('.c-modal__buttons').contains('Select').click();
        cy.get('input[name=title]').clear().type('Default Queue List Component');
        cy.get('.c-modal__buttons').contains('Add').click();
    }

    newWallboardButton() {
        return cy.get('.c-toolbar-right').contains('+ New Wallboard');
    }

    addComonentButton() {
        return cy.get('.c-toolbar-right').contains('+ Add Component');
    }

    loggedInTitle() {
        return cy.get('.c-toolbar-left__heading', {timeout: 5000})
    }

    queuesCategory() {
        return cy.get('.c-modal--new-wallboard__nav-item').contains('Queues');
    }

    componentModalTitle() {
        return cy.get('.c-modal--new-wallboard__list-title')
    }

    selectButton() {
        return cy.get('.c-modal__buttons').contains('Select')
    }

    displayConnected() {
        return cy.get('input[name=isCallStatusConnected]')
    }

    displayWaiting() {
        return cy.get('input[name=isCallStatusWaiting]')
    }

    showCallerNumber() {
        return cy.get('input[name=CALLER_NUMBER]')
    }

    showCallerName() {
        return cy.get('input[name=CALLER_NAME]')
    }

    showPriority() {
        return cy.get('input[name=PRIORITY]')
    }

    showPosition() {
        return cy.get('input[name=POSITION_IN_QUEUE]')
    }

    showTimeWaiting() {
        return cy.get('input[name=TIME_WAITING_IN_QUEUE]')
    }

    showAgent() {
        return cy.get('input[name=AGENT_CONNECTED_TO]')
    }

    showTimeatHead() {
        return cy.get('input[name=TIME_AT_HEAD_OF_QUEUE]')
    }

    sortBy() {
        return cy.get('select[name=sortBy] option:selected')
    }

    showSkills() {
        return cy.get('input[name=isShowOnlyOnHover]')
    }

    showSkillsShortage() {
        return cy.get('input[name=isShowShortageOnlyOnHover]')
    }

    listenLive() {
        return cy.get('input[name=LISTEN_LIVE]')
    }

    listenLiveIcon() {
        return cy.get('.c-dropdown__trigger');
    }

    removeComponent() {
        cy.get('.widget__delete-icon').click();
        cy.get('.c-modal__footer').contains('Delete').click();
    }

    editComponent() {
        return cy.get('.widget__edit-icon')
    }

    saveModal() {
        return cy.get('.c-modal__buttons').contains('Save');
    }

    wbTitle() {
        return cy.get('.c-input.c-input--new-walboard-title');
    }

    saveWB() {
        cy.get('.c-toolbar-right').contains('Save').click();
        cy.get('.c-modal__footer').contains('Save').click();
    }

    componentTitle() {
        return cy.get('input[name=title]');
    }

    selectQueue() {
        return cy.get('select[name=callQueue]')
    }

    selectedQueueText() {
        return cy.get('select[name=callQueue] option:selected')
    }

    allCheckboxes() {
        return cy.get('input[type=checkbox]')
    }

    widgetTitle() {
        return cy.get('.widget__title')
    }

    error() {
        return cy.get('.c-input__error-message')
    }

    inputTimeinQueue() {
        return cy.get('input[name=timeInQueueSLATime]')
    }

    inputTimeHeadQueue() {
        return cy.get('input[name=timeAtHeadOfQueueSLATime]')
    }

    columnsPreviewTitles() {
        return cy.get('.agent-login__header.agent-login__header--queue-list')
    }
}
export default QueueList_PO