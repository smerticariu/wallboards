
class AgentLogin_PO {
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

    usersCategory() {
        return cy.get('.c-modal--new-wallboard__nav-item').contains('Users')
    }

    queuesCategory() {
        return cy.get('.c-modal--new-wallboard__nav-item').contains('Queues')
    }

    componentTitle() {
        return cy.get('.c-modal--new-wallboard__list-title')
    }

    selectButton() {
        return cy.get('.c-modal__buttons').contains('Select')
    }

    modalTitle() {
        return cy.get('div.c-modal--add-component__left-side > div:nth-child(1) > input')
    }

    modalGroup() {
        return cy.get('div.c-modal--add-component__left-side > div:nth-child(2) > select')
    }

    modalLimitResults() {
        return cy.get('input[name=limitResult]')
    }

    modalTimeZone() {
        return cy.get('div.c-modal--add-component__left-side > div:nth-child(4) > select')
    }

    modalPeriod() {
        return cy.get('div.c-modal--add-component__left-side > div:nth-child(5) > select')
    }

    modalIntervalExport() {
        return cy.get('.c-modal--add-component__input-label').contains('Interval Export')
    }

    saveModal(){
        return cy.get('.c-modal__buttons').contains('Save')
    }

    addButton(){
        return cy.get('.c-modal__buttons').contains('Add')
    }

    previewTitle(){
        return cy.get('div.widget__header > div.widget__title > div')
    }
    
    previewGroup(){
        return cy.get('div.widget__header > div.widget__title')
    }

    component_title(){
        return cy.get('div.widget__header > div.widget__title > div')
    }

    componentGroup(){
        return cy.get('div.widget__header > div.widget__title')
    }

    componentTimeZone(){
        return cy.get('div.agent-login__body > div:nth-child(1) > div:nth-child(4)')
    }

    editButton(){
        return cy.get('tr:nth-child(1) > td.c-landing-table__wb-actions > a')
    }

    editModal(){
        return cy.get('div > div.widget__header > div.widget__icons > div.widget__edit-icon')
    }

    editModalSetting(){
        return cy.get('div.widget__icons > div.widget__edit-icon > svg > path')
    }

    saveButton(){
        return cy.get('div.c-toolbar > div.c-toolbar-right > button:nth-child(3)')
    }
    
    saveAlert(){
        return cy.get('div.c-modal__footer > div.c-modal__footer-right-side > button')
    }

    runButton(){
        return cy.get('div.c-wallboard--new > div.c-toolbar > div.c-toolbar-right > a')
    }

    settingModal(){
        return cy.get('div.c-wallboard--new > div.c-toolbar > div.c-toolbar-right > svg')
    }
    
    createreadonly(){
        return cy.get('div > div.c-modal__body--edit-wallboard > form > div:nth-child(4) > button')
    }

    readonlyinput(){
        return cy.get('div.c-modal__body--edit-wallboard > form > div.c-modal__section.c-modal__section--read-only.c-modal__section--read-only__generate-link > input')
    }

    logOut(){
        return cy.get('div.c-wallboard--read-only > div.c-toolbar > div.c-toolbar-right > button').click()
    }

    saveButtonSettings(){
        return cy.get('div.c-modal__buttons.c-modal__buttons--settings > button:nth-child(1)')
    }

    errorMessage(){
        return cy.get('div.c-input__error-message')
    }

    removeComponent(){
        return cy.get('div.widget__header > div.widget__icons > div.widget__delete-icon > svg')
    }

    deleteButton(){
        return cy.get('div.c-modal__footer-right-side > button.c-button.c-button--m-left.c-button--blue')
    }

    nowallboardText(){
        return cy.get('div > div > span:nth-child(1)').contains('This wallboard has no components.')
    }

    intervalFrom(){
        return cy.get('input[name=from]')
    }

    intervalTo(){
        return cy.get('input[name=to]')
    }

    export(){
        return cy.get('div.c-modal--add-component__left-side > div.c-modal__buttons > button')
    }

    notification() {
        return cy.get('.notification__body')
    }
    
    firstNameTable(){
        return cy.get('div > div:nth-child(1)')
    }

    modal(){
        return cy.get('div.widget')
    }

    agentLoginRecords() {
        return cy.get('div[class=agent-login__row]')
    }

    nameResult() {
        return cy.get('div.agent-login__body > div:nth-child(1) > div:nth-child(1)')
    }

    eventResult() {
        return cy.get('div.agent-login__body > div:nth-child(1) > div:nth-child(3)')
    }

    dateResult() {
        return cy.get('div.agent-login__body > div:nth-child(1) > div:nth-child(4)')
    }

    elapsedResult() {
        return cy.get('div.agent-login__body > div:nth-child(1) > div:nth-child(5)')
    }

    card() {
        return cy.get('.agent-c.agent-c')
    }

    agentName() {
        return cy.get('.agent-c__user-name')
    }

    availabilityState() {
        return cy.get('.c-button.c-button--empty.c-dropdown__trigger--agent-name.agent-t__arrow-container.agent-t__arrow-container--card')
    }

    avOption() {
        return cy.get('.c-dropdown__item')
    }
    
}
export default AgentLogin_PO