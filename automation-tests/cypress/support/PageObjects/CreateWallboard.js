class CreateWallboard {
    
    visitLandingPage(){
        return cy.visit('localhost:3000/')
    }

    newWallButton(){
        return cy.get('div.c-toolbar > div.c-toolbar-right > button:nth-child(2)')
    }

    wallboardPageText1(){
        return cy.get('div.c-wallboard--new > div.c-panel > div > div > span:nth-child(1)')
    }

    wallboardPageText2(){
        return cy.get('div.c-wallboard--new > div.c-panel > div > div > span:nth-child(2)')
    }

    wallboardTitle(){
        return cy.get('div.c-wallboard--new > div.c-toolbar > div.c-toolbar-left > div > input')
    }

    saveButton(){
        return cy.get('div.c-wallboard--new > div.c-toolbar > div.c-toolbar-right > button:nth-child(3)')
    }

    saveButtonAlert(){
         return cy.get('div.c-modal__footer > div.c-modal__footer-right-side > button')
    }

    firstcolumntext(){
        return cy.get('tr:nth-child(1) > td.c-landing-table__wb-name > p > a').first();
    }

    alert(){
        return cy.get('div.c-modal__body.c-modal__body--save-changes > div')
    }

    addComponent(){
        return cy.get('div.c-toolbar-right > button.c-button.c-button--blue')
    }
    
    notificationMessage(){
        return cy.get('div.notification.notification--success.notification--active > div.notification__body > div')
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
    runButton(){
        return cy.get('div.c-toolbar > div.c-toolbar-right > a')
    }

}
export default CreateWallboard;
