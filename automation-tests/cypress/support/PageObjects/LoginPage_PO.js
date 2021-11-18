class LoginPage_PO {

    visitLoginPage() {
        return cy.visit('http://localhost:3000/');
    }
    getNatterboxLogo() {
        return cy.get('.c-login-brand__logo');
    }
    getInfoTitle() {
        return cy.get('c-login-info__subheadline');
    }
    getInfoDescription() {
        return cy.get('c-login-info__description')
    }
    getInfoCards() {
        return cy.get('.c-login-info__cards');
    }
    getSalesForceLogo() {
        return cy.get('.c-login-salesforce__logo');
    }
    getSalesforceText() {
        return cy.get('.c-login-salesforce__text')
    }
    getSignInTitle() {
        return cy.get('.c-login-start__headline')
    }
    getSignInDescription() {
        return cy.get('.c-login-start__description')
    }
    getSignInButton() {
        return cy.get('.c-login-start__btn');
    }

}
export default LoginPage_PO;