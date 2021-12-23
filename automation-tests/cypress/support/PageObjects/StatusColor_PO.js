class StatusColor {

    visitLandingPage(){
        return cy.visit('localhost:3000/')
    }

    newWallButton(){
        return cy.get('div.c-toolbar > div.c-toolbar-right > button:nth-child(2)', {timeout: 10000})
    }

    addComponent(){
        return cy.get('div.c-toolbar-right > button.c-button.c-button--blue')
    }

    selectAgentList(){
        return cy.get('div:nth-child(1) > div.c-modal--new-wallboard__list-title')
    }

    selectButton(){
        return cy.get('.c-modal__buttons').contains('Select')
    }

    addButton(){
        return cy.get('.c-modal__buttons').contains('Add')
    }

    tableView(){
        return cy.get('div:nth-child(3) > div.c-modal--add-component__main-radio > label > span')
    }

    cardView(){
        return cy.get('#root > div > div.c-modal.c-modal--open > div > div > div.c-modal__body--add-component > div.c-modal--add-component__left-side > div:nth-child(3) > label > input')
    }

    presenceCheckboxCard(){
        return cy.get('div:nth-child(6) > div.c-modal--add-component__select-checkbox > label:nth-child(1) > input[type=checkbox]')
    }

    availabilityCheckboxCard(){
        return cy.get('div:nth-child(5) > div.c-modal--add-component__select-checkbox > label:nth-child(1) > input[type=checkbox]')
    }

    presenceCheckboxTable(){
        return cy.get('div:nth-child(8) > div.c-modal--add-component__select-checkbox > label:nth-child(1) > input')
    }
}
export default StatusColor;