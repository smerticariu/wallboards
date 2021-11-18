//<reference types="cypress" />
class NameClass{
    
    getAddOrganization(){
        return cy.get('.btn-primary');
    }
    getDragNDrop(){
        return cy.get('.dropzone-base64');
    }
    getName(){
        return cy.get('input[name="name"]');
    }
    getOwner(){
        return cy.get('.form-group:nth-of-type(3) .react-select');
    }
    getOwnerSelect(){
        return cy.get('input[name="owner"]')
    }
    getCountry(){
        return cy.get('.form-group:nth-of-type(5) .react-select')
    }
    etCountrySelect(){
        return cy.get('input[name="country"]')
    }
    
    getCounty(){
        return cy.get('input[name="county"]')
    }

    getCity(){
        return cy.get('input[name="city"]')
    }

    getStreet(){
        return cy.get('input[name="street"]')
    }

    getPostalCode(){
        return cy.get('input[name="postalCode"]')
    }

    getSave(){
        return cy.get('.btn-primary')
    }
    getCancel(){
        return cy.get('.cancel-link')
    }
}
export default NameClass