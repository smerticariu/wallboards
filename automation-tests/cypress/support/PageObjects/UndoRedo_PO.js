class UndoRedo_PO {
    visitLandingPage() {
        return cy.visit('http://localhost:3000/')
    }

    createWallboard() {
        cy.visit('http://localhost:3000/', {timeout:5000});
        cy.get('.c-toolbar-right').contains('+ New Wallboard').click();
        cy.get('div.c-toolbar-left > div > input').clear().type('Undo Redo ');
        cy.get('.c-toolbar-right').contains('+ Add Component').click();
        cy.get('.c-modal--new-wallboard__list').contains('Agent list').click();
        cy.get('.c-modal__buttons').contains('Select').click();
        cy.get('.c-radio__label').contains('Card').click();
        cy.get('.c-modal__buttons').contains('Add').click();
        cy.get('.c-toolbar-right').contains('Close').click();
        cy.get('.c-modal__footer').contains('Save & Close').click();
        cy.wait(3000)
    }

    editButton() {
        return cy.get('.c-landing-table__edit-btn').first();
    }

    getWallboardName() {
        return cy.get('div.c-toolbar > div.c-toolbar-left > div > input');
        
    }

    editWallboardName() {
        return cy.get('div.c-toolbar-left > div > input').type('5');
    }

    editComponentView() {
        cy.get('.widget__edit-icon').click();
        cy.get('.c-radio__label').contains('Table').click();
        cy.get('.c-modal__buttons').contains('Save').click();
    }

    addComponent() {
        cy.get('.c-toolbar-right').contains('+ Add Component').click();
        cy.get('.c-modal--new-wallboard__list').contains('Agent list').click();
        cy.get('.c-modal__buttons').contains('Select').click();
        cy.get('.c-modal__buttons').contains('Add').click();
    }

    settingsButton() {
        return cy.get('div.c-toolbar-right > svg');
    }
    editDescription() {
        cy.get('.c-textarea').type(' edited original description');
    }

    getWallboardDescription() {
        return cy.get('.c-textarea');
    }

    UrlButton() {
        return cy.get('div:nth-child(4) > button');
    }

    saveSettingsModal() {
        return cy.get('div.c-modal__buttons.c-modal__buttons--settings > button').contains('Save').click();
    }

    removeComponent() {
        cy.get('.widget__delete-icon').first().click();
        cy.get('.c-modal__footer-right-side').contains('Delete').click();
    }

    undoButton() {
        return cy.get('div.c-toolbar-right > div > button:nth-child(1)');
    }

    getComponents() {
        return cy.get('.widget');
    }

    redoButton() {
        return cy.get('div.c-toolbar-right > div > button:nth-child(3)');
    }
    saveWallboard() {
        cy.get('.c-toolbar-right').contains('Save').click();
        cy.get('.c-modal__footer').contains('Save').click();
    }

    tableBody() {
        return cy.get('.widget__body.widget__body--table')
    }

}
export default UndoRedo_PO


