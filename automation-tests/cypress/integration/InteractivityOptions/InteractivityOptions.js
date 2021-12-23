import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import Interactivity from "../../support/PageObjects/InteractivityOptions_PO";

const interactivity = new Interactivity()
var preview = ''
var read_only_url = ''
var current_user = ''
var initial_text = ''
var final_text = ''


beforeEach(()=>{
    cy.login()
    cy.log('Login successful')
})


// Scenario Outline: The user is allowed to change agents' availability state when associated interactivity option is selected
Given ('the add component modal for agent list is displayed', () => {
    interactivity.visitLandingPage();
    interactivity.newWallButton().click();
    interactivity.addComponent().click();
    interactivity.selectAgentList().click();
    interactivity.selectButton().click()
})

And('the {string} is selected', (view) => {
    preview = view;
    if(view == 'card'){
        interactivity.cardView().click({force:true})
    }
    else if(view == 'table'){
        interactivity.tableView().click({force:true})
    }
})

And('the option to change availability state is selected', () =>{
    if(preview == 'card'){
        interactivity.changeAvailabilityInteractivityCard();
    }
    else{
        interactivity.changeAvailabilityInteractivityTable();
    }
})

And('the component is added', () =>{
    interactivity.addButton().click();
})

And('the wallboard read-only URL is copied', () =>{
    interactivity.createReadOnly();
    interactivity.CopyReadOnlyLink().invoke('val').then(($URL)=>{
        read_only_url = $URL
        cy.wrap(read_only_url)
    })
})

And('the newly configured wallboard is saved', () =>{
    interactivity.readOnlySave();
    interactivity.saveButton().click();
    interactivity.saveButtonAlert().click()
})

When ('the {string} opens the wallboard in view mode', (user) => {
    current_user = user
    if(user == 'admin'){
        interactivity.runButton().invoke('removeAttr', 'target').click();
    }
    else{
        interactivity.runButton().invoke('removeAttr', 'target').click();
        interactivity.logOut();
        cy.loginBasic();
        cy.visit(read_only_url)
        cy.wait(3000)
    }
    
})

Then ("the user can change agent's availability state", () => {
    if(current_user == 'admin'){
        if(preview == 'card'){
            interactivity.get_dropdown_card().then(($text)=>{
                initial_text = $text.text()
                interactivity.get_dropdown_card().click()
                interactivity.dropdown_card_first().click().then(($first_card_text)=>{
                    if($first_card_text.text() == initial_text){
                        interactivity.get_dropdown_card().click()
                        interactivity.dropdown_card_second().click()
                    }
                })
            })
            cy.wait(10000)
            interactivity.get_dropdown_card().then(($text)=>{
                expect(initial_text).to.not.eql($text.text())
            })
            
            interactivity.logOut();
        }
        else{
            interactivity.get_dropdown_table().then(($text)=>{
                initial_text = $text.text()
                interactivity.get_dropdown_table().click()
                interactivity.dropdown_table_first().click().then(($first_card_text)=>{
                    if($first_card_text.text() == initial_text){
                        interactivity.get_dropdown_table().click()
                        interactivity.get_dropdown_table()
                        interactivity.dropdown_table_second().click()
                    }
                })
            })
            cy.wait(10000)
            interactivity.get_dropdown_table().then(($text)=>{
                expect(initial_text).to.not.eql($text.text())
            })
            interactivity.logOut();
        }
    }
    else{
        if(preview == 'card'){
            interactivity.get_dropdown_card().then(($text)=>{
                initial_text = $text.text()
                interactivity.get_dropdown_card().click()
                interactivity.dropdown_card_first().click().then(($first_card_text)=>{
                    if($first_card_text.text() == initial_text){
                        interactivity.get_dropdown_card().click()
                        interactivity.dropdown_card_second().click()
                    }
                })
            })
            cy.wait(10000)
            interactivity.get_dropdown_card().then(($text)=>{
                expect(initial_text).to.not.eql($text.text())
            })
            interactivity.logOut();
        }
        else{
            interactivity.get_dropdown_table().then(($text)=>{
                initial_text = $text.text()
                interactivity.get_dropdown_table().click()
                interactivity.dropdown_table_first().click().then(($first_card_text)=>{
                    if($first_card_text.text() == initial_text){
                        interactivity.get_dropdown_table().click()
                        interactivity.get_dropdown_table()
                        interactivity.dropdown_table_second().click()
                    }
                })
            })
            cy.wait(10000)
            interactivity.get_dropdown_table().then(($text)=>{
                expect(initial_text).to.not.eql($text.text())
            })
            interactivity.logOut();
        }
    }
})

// Scenario Outline: The user is not allowed to change agents' availability state when associated interactivity option is disabled
Given ('the add component modal for agent list is displayed', () => {
    cy.login()
    interactivity.visitLandingPage();
    interactivity.newWallButton().click();
    interactivity.addComponent().click();
    interactivity.selectAgentList().click();
    interactivity.selectButton().click()
})

And('the {string} is selected', (view) => {
    preview = view;
    if(view == 'card'){
        interactivity.cardView().click({force:true})
    }
    else if(view == 'table'){
        interactivity.tableView().click({force:true})
    }
})

And('the option to change availability state is disabled', () =>{
    if(preview == 'card'){
        interactivity.changeAvailabilityInteractivityCardUncheck();
    }
    else{
        interactivity.changeAvailabilityInteractivityTableUncheck();
    }
})

And('the component is added', () =>{
    interactivity.addButton().click();
})

And('the wallboard read-only URL is copied', () =>{
    interactivity.createReadOnly();
    interactivity.CopyReadOnlyLink().then(($URL)=>{
        read_only_url = $URL.val()
    })
    cy.log(read_only_url)
})

And('the newly configured wallboard is saved', () =>{
    interactivity.readOnlySave();
    interactivity.saveButton().click();
    interactivity.saveButtonAlert().click()
})

When ('the {string} opens the wallboard in view mode', (user) => {
    if(user == 'admin'){
        interactivity.runButton().invoke('removeAttr', 'target').click();
    }
    else{
        interactivity.runButton().invoke('removeAttr', 'target').click();
        interactivity.logOut();
        cy.loginBasic();
        cy.visit(read_only_url)
    }
    
})

Then ("the user is not allowed to change agent's availability state", () => {
    if(preview == 'card'){
        interactivity.changeInteractivityCardDisabled()
    }
    else{
        interactivity.changeInteractivityDisabled()
    }
})
