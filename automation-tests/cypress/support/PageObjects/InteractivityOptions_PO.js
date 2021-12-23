class Interactivity{

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
        return cy.get('div.c-modal__buttons > button.c-button.c-button--m-left.c-button--blue')
    }

    cardView(){
        return cy.get('#root > div > div.c-modal.c-modal--open > div > div > div.c-modal__body--add-component > div.c-modal--add-component__left-side > div:nth-child(3) > label > input')
    }

    tableView(){
        return cy.get('div:nth-child(3) > div.c-modal--add-component__main-radio > label > span')
    }

    changeAvailabilityInteractivityCard(){
        return cy.get('div:nth-child(7) > label:nth-child(2) > input[type=checkbox]').should('be.checked');
    }

    changeAvailabilityInteractivityTable(){
        return cy.get('div:nth-child(9) > label:nth-child(2) > input[type=checkbox]').should('be.checked');
    }

    changeAvailabilityInteractivityCardUncheck(){
        return cy.get('div:nth-child(7) > label:nth-child(2) > input[type=checkbox]').uncheck({force:true}).should('be.not.checked')
    }

    changeAvailabilityInteractivityTableUncheck(){
        return cy.get('div:nth-child(9) > label:nth-child(2) > input[type=checkbox]').uncheck({force:true}).should('be.not.checked')
    }

    addButton(){
        return cy.get('.c-modal__buttons').contains('Add');
    }

    createReadOnly(){
        cy.get('div.c-wallboard--new > div.c-toolbar > div.c-toolbar-right > svg').click();
        cy.get('div.c-modal__body--edit-wallboard > form > div:nth-child(4) > button').click();
    }

    CopyReadOnlyLink(){
        return cy.get('div.c-modal__section.c-modal__section--read-only.c-modal__section--read-only__generate-link > input')
    }

    readOnlySave(){
        return cy.get('div.c-modal__buttons.c-modal__buttons--settings > button:nth-child(1)').click()
    }

    saveButton(){
        return cy.get('div.c-wallboard--new > div.c-toolbar > div.c-toolbar-right > button:nth-child(3)')
    }

    saveButtonAlert(){
         return cy.get('div.c-modal__footer > div.c-modal__footer-right-side > button')
    }

    runButton(){
        return cy.get('div.c-toolbar > div.c-toolbar-right > a')
    }

    get_dropdown_table(){
        return cy.get('div.widget__body.widget__body--table > div > div.agent-list-table__body > div:nth-child(1) > div.agent-list-table__agent-info.agent-list-table__agent-info--overflow.agent-list-table__agent-info > span > span > div').last()
    }

    dropdown_table_first(){
        return cy.get('.c-dropdown__item', {timeout:10000}).first()
    }

    dropdown_table_second(){
        return cy.get('.c-dropdown__item', {timeout:10000}).last()
    }
    get_dropdown_card(){
        return cy.get('.c-button.c-button--empty.c-dropdown__trigger--agent-name.agent-list-table__arrow-container.agent-list-table__arrow-container--card', {timeout:10000}).first();
    }

    dropdown_card_first(){
        return cy.get('div:nth-child(1) > div.agent-c__status-time > div > span > div > div:nth-child(1)', {timeout:10000})
    }

    dropdown_card_second(){
        return cy.get('div:nth-child(1) > div.agent-c__status-time > div.agent-c__status > span > div > div:nth-child(2)', {timeout:10000})
    }
    

    changeInteractivityBasic(){
        cy.get('div.agent-t__body > div:nth-child(1) > div > span > span > div', {timeout:10000}).click().then(($text)=>{
            cy.get('div.agent-t__agent-info > span > div > div:nth-child(1)', {timeout:10000}).click().then(($changed_text)=>{
                cy.get('div.notification__body > div').contains('Something went wrong');
            })
        })
    }

    changeInteractivityCardBasic(){
        cy.get('div.agent-list__body > div:nth-child(1) > div.agent-c__status-time > div.agent-c__status.agent-c__status.agent-c__status', {timeout:10000}).click().then(($text)=>{
          cy.get('div:nth-child(1) > div.agent-c__status-time > div > span > div > div:nth-child(2)', {timeout:10000}).click().then(($changed_text)=>{
                cy.get('div.notification__body > div').contains('Something went wrong');
          })
        })
        //verify if it change
    }


    changeInteractivityDisabled(){
        cy.get('div.c-dropdown__trigger').should('not.exist')
    }

    changeInteractivityCardDisabled(){
        cy.get('div.c-dropdown__trigger').should('not.exist')
    }

    logOut(){
        return cy.get('div.c-wallboard--read-only > div.c-toolbar > div.c-toolbar-right > button').click()
    }

}
export default Interactivity