class RemoveComponent_PO {
    visitLandingPage(){
        cy.visit('http://localhost:3000/')
    }
    newWallboardButton() {
        return cy.get('.c-toolbar-right').contains('+ New Wallboard');
    }

    addComonentButton() {
        return cy.get('.c-toolbar-right').contains('+ Add Component');
    }

    selectAgentList() {
        cy.get('.c-modal--new-wallboard__list').contains('Agent list').click();
        cy.get('.c-modal__buttons').contains('Select').click();
    }

    selectType(type) {
        return cy.get(type).click();
    }
    addComponentModal() {
        return cy.get('.c-modal__buttons').contains('Add');
    }

    removeButton() {
        return cy.get('.widget__delete-icon');
    }

    removalConfirmation() {
        return cy.get('.c-modal__content');
    }

    deleteButton(){
        return cy.get('.c-modal__footer').contains('Delete');
    }
    saveWallboard() {
        cy.get('.c-toolbar-right').contains('Save').click();
        cy.get('.c-modal__footer').contains('Save').click();
    }

    runButton() {
        return cy.get('.c-toolbar-right').contains('Run');
    }

    firstEditButton() {
        return cy.get('.c-landing-table__edit-btn').first();
    }

    wallboardComponents() {
        return cy.get('.widget');
    }
    cancelRemovalButton() {
        return cy.get('.c-modal__footer').contains('Cancel');
    }
}
export default RemoveComponent_PO