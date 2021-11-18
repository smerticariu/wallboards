class EditCopyDelete_PO {

    visitLandingPage() {
        return cy.visit('http://localhost:3000/', {timeout:5000});
    }

    editButton() {
        return cy.get('.c-landing-table__edit-btn');
    }

    copyButton() {
        return cy.get('.c-landing-table__copy-btn');
    }

    deleteButton() {
        return cy.get('.c-landing-table__delete-btn');
    }

    openAgentListModal() {
        cy.get('.c-toolbar').contains('+ Add Component').click();
        cy.get('.c-modal--new-wallboard__list-title').contains('Agent list').click();
        cy.get('.c-modal__buttons').contains('Select').click();
    }
    wallboardNameInput() {
        return cy.get('.c-input');
    }


    firstWallboardName() {
        return cy.get('tr > td.c-landing-table__wb-name > p > a')
        
    }

    deleteModal() {
        return cy.get('.c-modal__content')
    }

    deleteButtonModal() {
       return cy.get('.c-button').contains('Delete')
    }
    
    cancelButton() {
       return cy.get('.c-button').contains('Cancel')
    }

    deleteMessage() {
        return cy.get('.notification__body')
    }

    // firstUrl() {
    //     var firstURL = ''
    //     cy.url().then((url) => {
    //         firstURL = url
    //         cy.log(firstURL)
    //       });
    // }
    // verifyUrl() {
    //     var firstURL = ''
    //     cy.url().then((newUrl) => {
    //         cy.log(newUrl);
    //         expect(newUrl).to.contain(firstURL)
    //       });
    // }

    addDefaultAgentList(){
        cy.get('.c-toolbar').contains('+ Add Component').click();
        cy.get('.c-modal--new-wallboard__list-title').contains('Agent list').click();
        cy.get('.c-modal__buttons').contains('Select').click();
        cy.get('.c-modal__buttons').contains('Add').click();
    }

    saveChanges() {
        cy.get('.c-toolbar-right').contains('Save').click();
        cy.get('.c-modal__footer').contains('Save').click();

    }

    create1ComponentWallboard() {
        cy.visit('http://localhost:3000/', {timeout:5000});
        cy.get('.c-toolbar-right').contains('+ New Wallboard').click();
        cy.get('button.c-button--blue').contains('+ Add Component').click();
        cy.get('.c-modal--new-wallboard__list-item ').first().click();
        cy.get('.c-modal__buttons').contains('Select').click();
        cy.get('.c-modal__buttons').contains('Add').click();
        cy.get('.c-toolbar-right').contains('Close').click();
        cy.get('.c-modal__footer').contains('Save & Close').click();
    }
    editComponent() {
        cy.get('.agent-list__edit-icon').first().click();
        cy.get('.c-radio__label').contains('Table').click();
        cy.get('.c-modal__buttons').contains('Save').click();
    }
    settingsCog() {
        return cy.get('div.c-toolbar-right > svg');
    }

    settingsWallboardName() {
        return cy.get('div.c-modal__body--edit-wallboard > form > div:nth-child(1) > input');
    }

    settingsWallboardDescription() {
        return cy.get('.c-textarea');
    }
    saveSettings() {
        return cy.get('div.c-modal__buttons.c-modal__buttons--settings > button:nth-child(1)')
    }

    close(){
        return cy.get('.c-toolbar-right').contains('Close');
    }

    invalidNameWarning() {
        return cy.get('.c-modal__content');
    }

    creationPage() {
        cy.visit('http://localhost:3000/', {timeout:5000});
        cy.get('.c-toolbar-right').contains('+ New Wallboard').click();
    }
    addCardComponent() {
        cy.get('button.c-button--blue').contains('+ Add Component').click();
        cy.get('.c-modal--new-wallboard__list-item ').first().click();
        cy.get('.c-modal__buttons').contains('Select').click();
        cy.get('.c-radio__label').contains('Card').click();
        cy.get('.c-modal__buttons').contains('Add').click();
    }

    addTableComponent() {
        cy.get('button.c-button--blue').contains('+ Add Component').click();
        cy.get('.c-modal--new-wallboard__list-item ').first().click();
        cy.get('.c-modal__buttons').contains('Select').click();
        cy.get('.c-radio__label').contains('Table').click();
        cy.get('.c-modal__buttons').contains('Add').click();
    }

    runButton() {
        return cy.get('.c-toolbar-right').contains('Run');
    }

    componentBodies() {
        return cy.get('.agent-list__body');
    }

    wallboardDescription() {
        return cy.get('tr > td.c-landing-table__wb-name > span');
    }
}
export default EditCopyDelete_PO;