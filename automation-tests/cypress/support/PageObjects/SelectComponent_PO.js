class SelectComponent_PO{

    getToCreationPage() {
        cy.visit('http://localhost:3000/', {timeout:5000});
        cy.get('.c-toolbar-right').contains('+ New Wallboard').click();
    }

    addComponentButton() {
        return cy.get('button.c-button--blue').contains('+ Add Component');
    }

    selectComponentModal() {
        return cy.get('.c-modal__content');
    }

    getToSelectComponentModal() {
        cy.visit('http://localhost:3000/', {timeout:5000});
        cy.get('.c-toolbar-right').contains('+ New Wallboard').click();
        cy.get('button.c-button--blue').contains('+ Add Component').click();
        return cy.get('.c-modal__content');
    }

    cancelSelectComponentModal() {
        return cy.get('.c-modal__buttons').contains('Cancel');
    }

    componentCategories() {
        return cy.get('.c-modal--new-wallboard__categories');
    }

    componentType() {
        return cy.get('.c-modal--new-wallboard__list');
    }

    searchComponent() {
        return cy.get('.c-modal--new-wallboard__form > input');
    }

    getFirstComponent() {
        return cy.get('.c-modal--new-wallboard__list-title').first();
    }

    getAllComponents() {
        return cy.get('*[class="c-modal--new-wallboard__list-title"]');
    }

    getToSelectFirstComponent() {
        cy.visit('http://localhost:3000/', {timeout:5000});
        cy.get('.c-toolbar-right').contains('+ New Wallboard').click();
        cy.get('button.c-button--blue').contains('+ Add Component').click();
        cy.get('.c-modal--new-wallboard__list-item ').first().click();
    }

    selectComponentButton(){
        return cy.get('.c-modal__buttons').contains('Select');
    }

    addComponentModal() {
        return cy.get('.c-modal.c-modal--open > div');
    }
}
export default SelectComponent_PO