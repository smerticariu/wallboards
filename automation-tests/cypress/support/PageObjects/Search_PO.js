class Search_PO {

    visitLandingPage() {
        return cy.visit('http://localhost:3000/');
    }

    logo(){
        return cy.get('div.c-banner-logo')
    }
    wallboardTitle(){
        return cy.get('div.c-toolbar > div.c-toolbar-left > h1')
    }
    firstcolumntext(){
        return cy.get('tr> td.c-landing-table__wb-name > p > a');
    }

    firstcolumncreatedon(){
        return cy.get('tr > td.c-landing-table__wb-created-on > p')
    }

    firstcolumncreatedby(){
        return cy.get('tr > td.c-landing-table__wb-created-by > p')
    }
    
    searchbar(){
        return cy.get('div.c-toolbar-right > div > div > input');
    }

    title_input(text){
        return cy.get('div.c-toolbar-left > div > input').clear().type(text)
    }

    saveButton(){
        return cy.get('div.c-wallboard--new > div.c-toolbar > div.c-toolbar-right > button:nth-child(3)')
    }

    saveButtonAlert(){
         return cy.get('div.c-modal__footer > div.c-modal__footer-right-side > button')
    }
    span(){
        return cy.get('#react-autowhatever-1--item-0 > span');
    }

    firstcolumnname(){
        return cy.get('tr:nth-child(1) > td.c-landing-table__wb-created-by > p');
    }

    searchbarlist(){
        return cy.get('#react-autowhatever-1 > ul > li')
    }

    AlertSearch(){
        return cy.get('div.c-landing > div.c-landing__content > div.c-landing-table > div')
    }

    CreationDate(){
        return cy.get('tr:nth-child(1) > td.c-landing-table__wb-created-on > p')
    }

    allRows(){
        return cy.get('table > tbody > tr');
    }

    nameColumn(){
        return cy.get('tr > td:nth-child(1) > span.c-landing-table__filter')
    }

    createdOnColumn(){
        return cy.get('tr > td:nth-child(3) > span.c-landing-table__filter')
    }

    createdByColumn(){
        return cy.get('tr > td:nth-child(2) > span.c-landing-table__filter')
    }
}
export default Search_PO;

