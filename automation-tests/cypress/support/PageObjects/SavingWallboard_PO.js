class SavingWallboard{

    visitLandingPage(){
        return cy.visit('localhost:3000/')
    }

    newWallButton(){
        return cy.get('div.c-toolbar > div.c-toolbar-right > button:nth-child(2)')
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
        return cy.get('div.c-toolbar-right > button.c-button.c-button--blue')
    }

    selectAgentList(){
        return cy.get('div:nth-child(1) > div.c-modal--new-wallboard__list-title')
    }

    selectButton(){
        return cy.get('div.c-modal__buttons > button.c-button.c-button--m-left.c-button--blue')
    }

    addButton(){
        return cy.get('div.c-modal__buttons > button.c-button.c-button--m-left.c-button--green')
    }
    
    runButton(){
        return cy.get('div.c-toolbar > div.c-toolbar-right > a')
    }

    closeButton(close){
        return cy.get(close).click();
    }

    titleWallboard(){
        return cy.get('div.c-toolbar-left > div > input')
    }

    editButton() {
        return cy.get('tbody > tr > td.c-landing-table__wb-actions > a').invoke('removeAttr', 'target');
    }

    saveAlert(){
        cy.get('div.c-modal__body.c-modal__body--save-changes > div:nth-child(1)')
        .contains('There are unsaved changes in your')
        .contains(' Wallboard.')
        cy.get('div.c-modal__body.c-modal__body--save-changes > div:nth-child(2)')
        .contains('To preserve your changes, click Save ')
        .contains('&')
        .contains(' Close')
    }

    editComponentButton(){
        return cy.get('div.agent-list__icons > div.agent-list__edit-icon')
    }

    tableView(){
        return cy.get('div:nth-child(3) > div.c-modal--add-component__main-radio > label > span')
    }

    cardView(){
        return cy.get('#root > div > div.c-modal.c-modal--open > div > div > div.c-modal__body--add-component > div.c-modal--add-component__left-side > div:nth-child(3) > label > input')
    }

    editButtonfromComponent(){
        return cy.get('div.c-modal__buttons > button.c-button.c-button--m-left.c-button--green')
    }

    deleteComponent(){
        return cy.get('div.agent-list__icons > div.agent-list__delete-icon')
    }

    deleteAlertButton(){
        return cy.get('div.c-modal__footer-right-side > button.c-button.c-button--m-left.c-button--blue')
    }

    rightBottomCorner(){
        return cy.get('div.c-grid__components > div > div > span.react-resizable-handle.react-resizable-handle-se')
    }

    notification(){
        return cy.get('div.notification.notification--success.notification--active').contains('The Wallboard was successfully saved')
    }
    
    saveComponentAlert(){
        return cy.get('div.c-modal__body.c-modal__body--save-changes > div')
    }

    saveButtonAlert(){
        return cy.get('div.c-modal__footer > div.c-modal__footer-right-side > button').click();
    }

    save_and_close_button(){
        return cy.get('div.c-modal__footer > div.c-modal__footer-right-side > button.c-button.c-button--m-left.c-button--blue').click()
    }

    discardButton(){
        return cy.get('div.c-modal__footer > div.c-modal__footer-right-side > button:nth-child(1)').contains('Discard').click()
    }

    cancelButton(){
        return cy.get('div.c-modal__footer > div.c-modal__footer-left-side > button').click()
    }
}
export default SavingWallboard