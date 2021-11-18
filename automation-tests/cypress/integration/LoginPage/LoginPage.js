import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import LoginPage_PO from '../../support/PageObjects/LoginPage_PO';



var loginPage = new LoginPage_PO();

Given('the wallboards login page is displayed', () => {
    cy.visit('localhost:3000')
})
When('the user inspects the page', () => {
    cy.get('.c-login').find('.c-login-start__btn').as('SignInButton');
})
Then('the Sign In button is displayed', () => {
    cy.get('@SignInButton').contains('Sign In').should('be.visible');
})