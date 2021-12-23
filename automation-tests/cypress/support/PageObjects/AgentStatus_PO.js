
class AgentStatus{
    visitLandingPage() {
        return cy.visit('http://localhost:3000/')
    }
    
    loggedInTitle() {
        return cy.get('.c-toolbar-left__heading')
    }

    newWallboard() {
        return cy.get('.c-toolbar-right').contains('+ New Wallboard')
    }

    agentStatus(){
        return cy.get('div.c-modal--new-wallboard__form > div.c-modal--new-wallboard__list > div:nth-child(2)')
    }

    modalTitle(){
        return cy.get('div.c-modal--add-component__left-side > div:nth-child(1) > input')
    }

    modalLimit(){
        return cy.get('div.c-modal--add-component__left-side > div:nth-child(3) > input')
    }

    modalPeriod(){
        return cy.get('div.c-modal--add-component__left-side > div:nth-child(5) > select')
    }

    showBoxOne(){
        return cy.get('div.c-modal--add-component__left-side > div:nth-child(6) > label:nth-child(2) > input[type=checkbox]')
    }
    
    showBoxTwo(){
        return cy.get('div.c-modal--add-component__left-side > div:nth-child(6) > label:nth-child(3) > span');
    }

    addComponent() {
        return cy.get('.c-toolbar-right').contains('+ Add Component')
    }

    usersCategory() {
        return cy.get('.c-modal--new-wallboard__nav-item').contains('Users')
    }

    selectButton() {
        return cy.get('.c-modal__buttons').contains('Select')
    }

    addButton(){
        return cy.get('.c-modal__buttons').contains('Add')
    }

    title(){
        return cy.get('div.widget__header > div.widget__title')
    }

    editModalButton(){
        return cy.get('div.widget__icons > div.widget__edit-icon').first()
    }

    saveModalButton(){
        return cy.get('div.c-modal__buttons > button.c-button.c-button--blue')
    }

    modalAlert(){
        return cy.get('div.c-input__error-message')
    }

    editButton(){
        return cy.get('td.c-landing-table__wb-actions > a').first()
    }

    removeModalButton(){
        return cy.get('div.widget__delete-icon')
    }

    deleteButton(){
        return cy.get('button.c-button.c-button--m-left.c-button--blue').contains('Delete')
    }

    addComponentButton(){
        return cy.get('button.c-button.c-button--blue').contains('+ Add Component')
    }

    cardName(){
        cy.wait(3000)
        return cy.get('.agent-c__user-name > .c-dropdown > .c-dropdown__trigger > .c-dropdown__trigger--agent-name')
    }

    cardStatus(){
        return cy.get('div.agent-c__status.agent-c__status--dropdown.agent-c__status.agent-c__status > span > span > button', {timeout:10000}).first();
    }

    cardStatusSelectlast(){
        return cy.get('div.agent-c__status.agent-c__status--dropdown.agent-c__status.agent-c__status > span > div > div:nth-child(5)')
    }

    cardStatusSelectfirst(){
        return cy.get('div.agent-c__status.agent-c__status--dropdown.agent-c__status.agent-c__status > span > div > div:nth-child(1)')
    }

    modalTime(){
        return cy.get('div:nth-child(4) > select')
    }

    time(){
        return cy.get('.agent-login__body > div > :nth-child(5)')
    }
    
    agentTitle(){
        return cy.get('.agent-login__body > :nth-child(1) > :nth-child(1)')
    }

    statusAgent(){
        return cy.get('.agent-login__body > :nth-child(1) > :nth-child(4)')
    }

    resultsRow() {
        return cy.get('.agent-login__row')
    }

    resultDateTime() {
        return cy.get('div.widget__body.widget__body--table > div > div.agent-login__body > div:nth-child(1) > div:nth-child(5)')
    }

    modal(){
        return cy.get('div.widget')
    }

    previwTitle() {
        return cy.get('div[class=agent-login__header]')
    }

    dateFrom() {
        return cy.get('input[name=from]')
    }

    dateTo() {
        return cy.get('input[name=to]')
    }

    error() {
        return cy.get('.notification.notification--error')
    }

    export() {
        return cy.get('.c-modal__buttons').contains('Export');
    }
}
export default AgentStatus;