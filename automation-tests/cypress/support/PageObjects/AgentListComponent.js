class AgentListComponent{

    visitLandingPage(){
        return cy.visit('localhost:3000/')
    }

    newWallButton(){
        return cy.get('div.c-toolbar > div.c-toolbar-right > button:nth-child(2)', {timeout: 10000})
    }

    saveButton(){
        return cy.get('div.c-wallboard--new > div.c-toolbar > div.c-toolbar-right > button:nth-child(3)')
    }

    saveButtonAlert(){
         return cy.get('div.c-modal__footer > div.c-modal__footer-right-side > button')
    }

    alert(){
        return cy.get('div.c-modal__body.c-modal__body--save-changes > div')
    }

    addComponent(){
        return cy.get('.c-toolbar-right').contains('+ Add Component')
    }

    selectAgentList(){
        return cy.get('div:nth-child(1) > div.c-modal--new-wallboard__list-title')
    }

    selectButton(){
        return cy.get('div.c-modal__buttons > button.c-button.c-button--m-left.c-button--blue')
    }
    
    addButton(){
        return cy.get('.c-modal__buttons').contains('Add')
    }

    forAdd(){
        return cy.get('div.c-modal__buttons > button.c-button.c-button--m-left.c-button--blue')
    }
    
    runButton(){
        return cy.get('div.c-toolbar > div.c-toolbar-right > a')
    }

    titleInput(){
        return cy.get('div.c-modal--add-component__left-side > div:nth-child(1) > input')
    }

    titleWallboardlist(){
        return cy.get('.widget__header')
    }

    inputError(){
        return cy.get('div.c-modal--add-component__left-side > div:nth-child(1) > div.c-input__error-message')
    }

    cardCheck(){
        return cy.get('div.c-modal--add-component__preview-container > div.c-modal--add-component__agent-card')
    }

    cardView(){
        return cy.get('#root > div > div.c-modal.c-modal--open > div > div > div.c-modal__body--add-component > div.c-modal--add-component__left-side > div:nth-child(3) > label > input')
    }

    staffmembername(){
        return cy.get('div.agent-c__user-name-ext > div.agent-c__user-name')
    }

    statusCard(){
        return cy.get('div.agent-c__status-time > div.agent-c__status.agent-c__status--dark-blue.agent-c__status--white')
    }

    inboundCall(){
        return cy.get('div > div.agent-c__body > div.agent-c__footer')
    }

    tableView(){
        return cy.get('div:nth-child(3) > div.c-modal--add-component__main-radio > label > span')
    }

    checkPreview(){
        return cy.get('div.c-modal--add-component__right-side > div.c-modal--add-component__input-label.c-modal--add-component__input-label--grey').contains('Preview')
    }

    verifyDefaultTableView(){
        cy.get('div.agent-list-table__header.agent-list-table__header--preview > div:nth-child(2)').contains('Name')
        cy.get('div.agent-list-table__header.agent-list-table__header--preview > div:nth-child(3)').contains('Availability Status')
        cy.get('div.agent-list-table__header.agent-list-table__header--preview > div:nth-child(4)').contains('Time on cur. call')
        cy.get('div.agent-list-table__header.agent-list-table__header--preview > div:nth-child(5)').contains('Status')
    }

    verifyTableView(){
        cy.get('div.agent-t__header.agent-t__header--preview > div:nth-child(2)').contains('Name')
        cy.get('div.agent-t__header.agent-t__header--preview > div:nth-child(3)').contains('Availability Status')
        cy.get('div.agent-t__header.agent-t__header--preview > div:nth-child(4)').contains('Presence Status')
        cy.get('div.agent-t__header.agent-t__header--preview > div:nth-child(5)').contains('Time on cur. call')
        cy.get('div.agent-t__header.agent-t__header--preview > div:nth-child(6)').contains('Status')
    }

    modalTitle(){
        return cy.get('div > div > div.c-modal__header > div').contains('Add Component')
    }

    sortDefault(){
        return cy.get('div:nth-child(4) > select').select('AGENT_NAME').contains('Agent Name (Alphabetical)')
    }
    
    sortDefaultTableView(){
        return cy.get('div:nth-child(6) > select').select('AGENT_NAME').contains('Agent Name (Alphabetical)')
    }

    availabilityCheckboxCard(){
        return cy.get('div:nth-child(5) > div.c-modal--add-component__select-checkbox > label:nth-child(1) > input[type=checkbox]')
    }

    availabilityCheckboxTable(){
        return cy.get('div:nth-child(7) > div.c-modal--add-component__select-checkbox > label:nth-child(1) > input[type=checkbox]')
    }

    presenceCheckboxCard(){
        return cy.get('div:nth-child(6) > div.c-modal--add-component__select-checkbox > label:nth-child(1) > input[type=checkbox]')
    }

    presenceCheckboxTable(){
        return cy.get('div:nth-child(8) > div.c-modal--add-component__select-checkbox > label:nth-child(1) > input')
    }
    
    AvailabilityCheckboxTableView(){
        return cy.get('div:nth-child(7) > div.c-modal--add-component__select-checkbox > label:nth-child(1) > input[type=checkbox]')
    }

    presenceCheckboxTableView(){
        return cy.get('div:nth-child(8) > div.c-modal--add-component__select-checkbox > label:nth-child(1) > input[type=checkbox]')
    }

    interactivityTableCheck(){
        cy.get('div:nth-child(9) > label:nth-child(2) > input[type=checkbox]').should('be.checked');
        cy.get('div:nth-child(9) > label:nth-child(3) > input[type=checkbox]').should('be.checked');
        cy.get('div:nth-child(9) > label:nth-child(4) > input[type=checkbox]').should('be.checked');
    }

    interactivityCheckboxes(){
        cy.get('div:nth-child(9) > label:nth-child(2) > input[type=checkbox]').check({force:true})
        cy.get('div:nth-child(9) > label:nth-child(3) > input[type=checkbox]').check({force:true})
        cy.get('div:nth-child(9) > label:nth-child(4) > input[type=checkbox]').check({force:true})
    }
    
    interactivityCardCheck(){
        cy.get('div:nth-child(7) > label:nth-child(2) > input[type=checkbox]').should('be.checked');
        cy.get('div:nth-child(7) > label:nth-child(3) > input[type=checkbox]').should('be.checked');
        cy.get('div:nth-child(7) > label:nth-child(4) > input[type=checkbox]').should('be.checked');
    }
    
    interactivityCardCheckboxes(){
        cy.get('div:nth-child(7) > label:nth-child(2) > input[type=checkbox]').check({force:true})
        cy.get('div:nth-child(7) > label:nth-child(3) > input[type=checkbox]').check({force:true})
        cy.get('div:nth-child(7) > label:nth-child(4) > input[type=checkbox]').check({force:true})
    }

    followingColumns(){
        cy.get('div.c-modal--add-component__av-state-container > label:nth-child(1) > input[type=checkbox]').should('be.checked')
        cy.get('div.c-modal--add-component__av-state-container > label:nth-child(1)').contains('Agent Name');
        cy.get('div.c-modal--add-component__av-state-container > label:nth-child(3) > input[type=checkbox]').should('be.checked')
        cy.get('div.c-modal--add-component__av-state-container > label:nth-child(3)').contains('Current Availability State');
        cy.get('div.c-modal--add-component__av-state-container > label:nth-child(4) > input[type=checkbox]').should('be.checked')
        cy.get('div.c-modal--add-component__av-state-container > label:nth-child(4)').contains('Current Presence State');
        cy.get('div.c-modal--add-component__av-state-container > label:nth-child(6) > input[type=checkbox]').should('be.checked')
        cy.get('div.c-modal--add-component__av-state-container > label:nth-child(6)').contains('Time spent on current call');
    }
    

    tableCheck(){
        cy.get('div > div.agent-t__header > div:nth-child(2)').contains('Name')
        cy.get('div > div.agent-t__header > div:nth-child(3)').contains('Availability Status')
        cy.get('div > div.agent-t__header > div:nth-child(4)').contains('Time on cur. call')
        cy.get('div > div.agent-t__header > div:nth-child(5)').contains('Status')
    }

    availabilitystateCard(){
        return cy.get('div:nth-child(4) > select').select('AVAILABILITY_STATE').contains('Availability state (Alphabetical)')
    }

    availabilitystatetable(){
        return cy.get('div:nth-child(6) > select').select('AVAILABILITY_STATE').contains('Availability state (Alphabetical)')
    }

    presencestatecard(){
        return cy.get('div:nth-child(4) > select').select('PRESENCE_STATE').contains('Presence state')
    }

    presencestatetable(){
        return cy.get('div:nth-child(6) > select').select('PRESENCE_STATE').contains('Presence state')
    }
    
    timeoncurrentcallcard(){
        return cy.get('div:nth-child(4) > select').select('TIME_CURRENT_CALL').contains('Time on current call (Most time on the phone first)')
    }

    timeoncurrentcalltable(){
        return cy.get('div:nth-child(6) > select').select('TIME_CURRENT_CALL').contains('Time on current call (Most time on the phone first)')
    }

    timecurrentavailabilitystatecard(){
        return cy.get('div:nth-child(4) > select').select('TIME_CURRENT_AVAILABILITY_STATE').contains('Time spent in current availability state (Most time in the state first)')
    }

    timecurrentavailabilitystatetable(){
        return cy.get('div:nth-child(6) > select').select('TIME_CURRENT_AVAILABILITY_STATE').contains('Time spent in current availability state (Most time in the state first)')
    }

    timephonetodaycard(){
        return cy.get('div:nth-child(4) > select').select('TIME_PHONE_TODAY').contains('Total time spent on the phone today (Most time first)')
    }

    timephonetodaytable(){
        return cy.get('div:nth-child(6) > select').select('TIME_PHONE_TODAY').contains('Total time spent on the phone today (Most time first)')
    }

    call_queue(){
        return cy.get('div:nth-child(2) > select');
    }

    call_queue_urgent(){
        return cy.get('div:nth-child(2) > select').select('T00000063').contains('queue call')
    }

    preview_title(){
        return cy.get('div.c-modal--add-component__preview-container > div.c-modal--add-component__preview-title')
    }

    agent_list_title(){
        return cy.get('.widget__title')
    }

    select_skill_none() {
        return cy.get('div:nth-child(5) > div.c-modal--add-component__select-checkbox > label.c-checkbox.c-checkbox--m-left > input')
    }

    select_skill_all() {
        return cy.get('div:nth-child(5) > div.c-modal--add-component__select-checkbox > label:nth-child(1) > input')
    }

    select_skill(skill_option) {
        return cy.get(skill_option)
    }

    addSkillColumn() {
        return cy.get('div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(7) > input[type=checkbox]')
    }

    viewSkills() {
        return cy.get('.agent-list-table__agent-info__skills')
    }

    skillsList() {
        return cy.get('.c-dropdown__container')
    }

    componentTitle(){
        return cy.get('div.c-modal--add-component__left-side > div:nth-child(1) > input')
    }

    skillCheckbox(){
        return cy.get('div:nth-child(5) > div.c-modal--add-component__select-checkbox > label:nth-child(1) > input[type=checkbox]')
    }

    getTableName(){
        return cy.get('.agent-list-table__agent-info.agent-list-table__agent-info--name.agent-list-table__agent-info--overflow', {timeout: 7000});
    }

    getTableTCAS(){
        return cy.get('div:nth-child(4) > span', {timeout:7000});
    }

    getCardName(){
        return cy.get('.agent-c__user-name', {timeout: 7000})
    }

    timeoncurravailabilitystateCheck(){
        return cy.get('label:nth-child(5) > input[type=checkbox]').check({force:true})
    }

    verifyCardView(){
        cy.get('.agent-c__user-name')
        cy.get('.c-dropdown.c-dropdown--availability-state')
        cy.get('.agent-c__time.agent-c__time--black')
        cy.get('.agent-c__call-time')
        cy.get('.agent-c__footer')
    }

    individualSkill() {
        return cy.get('.c-dropdown__item')
    }

    clickOutside() {
        return cy.get('.agent-list-table__header').last();
    }

    agentsDisplayed() {
        return cy.get('div[class=agent-list-table__agent]')
    }

    cardPresenceState() {
        return cy.get('.agent-c__footer')
    }

    tablePresenceState() {
        return cy.get('.agent-t__agent-info.agent-t__agent-info--status')
    }

    statusCircle() {
        return cy.get('.agent-t__agent-info--circle-center')
    }

    cardAvailabilityState() {
        return cy.get('.agent-c__status.agent-c__status')
    }

    selectColumnToView(option) {
        return cy.get(option)
    }

    tablePreviewHeader() {
        return cy.get('div[class=agent-list-table]')
    }

    readOnlyCardMode() {
        return cy.get('.agent-c.agent-c')
    }

    avatar() {
        return cy.get('.agent-c__user-image')
    }

    inspectDefaultOptions() {
        return cy.get('.c-modal--add-component__left-side')
    }

    defaultCardSortBy() {
        return cy.get('div.c-modal--add-component__left-side > div:nth-child(4) > select option:selected')
    }

    defaultTableSortBy() {
        return cy.get('div.c-modal--add-component__left-side > div:nth-child(6) > select option:selected')
    }

    radio1Column() {
        return cy.get('div:nth-child(3) > div:nth-child(4) > label > input');
    }

    radio2Columns() {
        return cy.get('div:nth-child(3) > div:nth-child(4) > div > label > input');
    }

    viewModeTableHeader() {
        return cy.get('.agent-list-table__header');
    }

    bodyMessage() {
        return cy.get('.widget__body')
    }

    enableCardPresenceState(card_presence_state) {
        return cy.get(card_presence_state)
    }

    enableTablePresenceState(table_presence_state) {
        return cy.get(table_presence_state)
    }

    cardNonePresence() {
        return cy.get('div:nth-child(6) > div.c-modal--add-component__select-checkbox > label.c-checkbox.c-checkbox--m-left > input')
    }

    tableNonePresence() {
        return cy.get('div:nth-child(8) > div.c-modal--add-component__select-checkbox > label.c-checkbox.c-checkbox--m-left > input')
    }

    cardAllPresence() {
        return cy.get('div:nth-child(6) > div.c-modal--add-component__select-checkbox > label:nth-child(1) > input')
    }

    tableAllPresence() {
        return cy.get('div:nth-child(8) > div.c-modal--add-component__select-checkbox > label:nth-child(1) > input')
    }

    availabilityStatusSort(){
        return cy.get('div.agent-t__agent-info.agent-t__agent-info--overflow.agent-t__agent-info > span')
    }

    availabilityStatusSortCard(){
        return cy.get('div.agent-c__status-time > div.agent-c__status.agent-c__status--dropdown.agent-c__status.agent-c__status > span')
    }

    timeSpentincurrentstateCard(){
        return cy.get('div.agent-c__status-time > div.agent-c__time')
    }

    tableStatus(){
        return cy.get('.agent-list-table__agent-info.agent-list-table__agent-info--status')
    }

    cardStatus(){
        return cy.get('div.agent-c__footer')
    }

    cardNoneAvailability() {
        return cy.get('div:nth-child(5) > div.c-modal--add-component__select-checkbox > label.c-checkbox.c-checkbox--m-left > input')
    }

    tableNoneAvailability() {
        return cy.get('div:nth-child(7) > div.c-modal--add-component__select-checkbox > label.c-checkbox.c-checkbox--m-left > input')
    }

    cardAVstateOption() {
        return cy.get('div:nth-child(5) > div.c-modal--add-component__av-state-container > label:nth-child')
    }

    tableAVstateOption() {
        return cy.get('div:nth-child(7) > div.c-modal--add-component__av-state-container > label:nth-child')
    }

    tableAvailabilityState() {
        return cy.get('.agent-list-table__agent-info.agent-list-table__agent-info--overflow.agent-list-table__agent-info').find('.c-dropdown__trigger--agent-name');
    }

    enableCardAVState(card_availability) {
        return cy.get(card_availability)
    }

    enableTableAVState(table_availability) {
        return cy.get(table_availability)
    }

    editComponentButton() {
        return cy.get('.widget__edit-icon')
    }
}
export default AgentListComponent;