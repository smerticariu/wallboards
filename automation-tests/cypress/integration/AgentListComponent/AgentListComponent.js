import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import AgentListComponent from "../../support/PageObjects/AgentListComponent";

const agent = new AgentListComponent()
var agentTitle = 'The 1st test'
var preview = ''
var skillText = ''
var callQText = ''
var unsorted = []
var sorted = []
var numberOfSkills = 0
var newNumber = 0
var state = ''
var current_state = ''

beforeEach(()=>{
    cy.login()
})

// Scenario: The agent list component name allows alphanumeric characters

Given ('the add component modal is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click()
})

When ('the user fills in a new name containing alphanumeric characters', () => {
    agent.titleInput().clear().type(agentTitle)
    
})

And('the user saves the component', () =>{
    agent.addButton().click();
})

Then ('the new component name is displayed', () => {
    agent.titleWallboardlist().should('contain', agentTitle)
})


//Scenario: The agent list component name does not allow invalid characters//
Given ('the add component modal is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click()
})

When ('the user fills in a new name containing special characters', () => {
    agent.titleInput().clear().type('#@!$@!')
    
})

And('the user saves the component', () =>{
    agent.addButton().click();
})

Then ('the user is informed that the component name allows only alphanumeric characters', () => {
    agent.inputError().contains('must be alphanumeric')
})

//Scenario: The agent list component name cannot be empty
Given ('the add component modal is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click({force:true});
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click()
})

When ('the user deletes the component name', () => {
    agent.titleInput().clear()
    
})

And('the user saves the component', () =>{
    agent.addButton().click();
})

Then ('the user is informed that the component name cannot be empty', () => {
    agent.inputError().contains('must be alphanumeric')
})

//Scenario: Selecting the Card view mode displays a preview in card format
Given ('the add component modal for Agent List component is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click()
})

When ('the user selects the Card view option', () => {
    agent.cardView().click({force:true});
    
})

Then ('a preview of the card option is displayed', () => {
    agent.checkPreview()
    agent.cardCheck().should('be.visible')
})

// Scenario: Selecting the Table view mode displays a preview in table format
Given ('the add component modal for Agent List component is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click()
})

When ('the user selects the Table view option', () => {
    agent.tableView().click({force:true});
    
})

Then ('a preview of the table option is displayed as Table', () => {
    agent.verifyDefaultTableView();
})

// Scenario: Correct default configuration options are displayed for Card view Agent List component
Given ('the add component modal for agent list is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click()
})

When ('the user inspects the default card configuration', () => {
    agent.inspectDefaultOptions();   
})

Then ('the Card view mode is selected', () => {
    agent.cardView().should('be.checked');
})

And('the sort by option selected is Agent Name', () =>{
    agent.defaultCardSortBy().then((text) => {
        expect(text.text()).to.eq('Agent Name (Alphabetical)')
        text.text()
    })
})

And('availability states select all option is enabled', () =>{
    agent.availabilityCheckboxCard().should('be.checked');
})

And('the presence states select all option is enabled', () =>{
    agent.presenceCheckboxCard().should('be.checked');
})

And('all interactivity options are checked', () =>{
    agent.interactivityCardCheck();
})

// Scenario: Correct default configuration options are displayed for Table view Agent List component
Given ('the add component modal for agent list is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click()
})

And('the table view option is selected', () =>{
    agent.tableView().click({force:true});
})

When ('the user inspects the default configuration', () => {
    agent.inspectDefaultOptions();  
})

Then ('the following columns to view are selected: Agent Name, Current Availability State, Current Presence State, Time Spent on Current Call', () => {
    agent.followingColumns();
})

And('the skills to view select all option is enabled and the sort by option selected is Agent Name', () =>{
    agent.skillCheckbox().should('be.checked');
    agent.defaultTableSortBy().then((text) => {
        expect(text.text()).to.eq('Agent Name (Alphabetical)')
        text.text()
    })
})

And('the availability states select all option is enabled', () =>{
    agent.availabilityCheckboxTable().should('be.checked');
})

And('the enabled option for presence states is select all', () =>{
    agent.presenceCheckboxTable().should('be.checked');
})

And('all interactivity options are enabled', () =>{
    agent.interactivityTableCheck();
})


// Scenario: Selected settings are displayed in Table format when Table view is selected

Given ('the modal for adding an agent list component is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click()
})

And('the Table view is selected', () =>{
    agent.tableView().click({force:true});
})

When ('the user saves the wallboard', () => {
    agent.addButton().click();
    agent.saveButton().click();
    agent.saveButtonAlert().click();
})

And('the user opens the wallboard saved in view mode', () =>{
    agent.runButton().invoke('removeAttr', 'target').click({force:true});
})

Then ('the selected settings for the agent list component is displayed in table view mode', () => {
    cy.get('.agent-list-table').should('be.visible');
})

// Scenario Outline: Agents displayed on the wallboard are sorted alphabetically by agent’s name

Given('the add component modal for agent list is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click()
})


And('the {string} is selected', (view) =>{
    preview = view;
    if(view == 'card'){
        agent.cardView().click({force:true})
    }
    else if(view == 'table'){
        agent.tableView().click({force:true})
    }
})


And('the Agent Name sort option is selected', () =>{
    cy.log(preview)
    if(preview == 'card'){
        cy.log(preview)
        agent.sortDefault();
    }
    else if(preview == 'table'){
        cy.log(preview)
        agent.sortDefaultTableView();
    }
})

And('the new wallboard configuration is saved', () => {
    agent.addButton().click();
    agent.saveButton().click();
    agent.saveButtonAlert().click();
})


When('the user opens the wallboard', () =>{
    agent.runButton().invoke('removeAttr', 'target').click({force:true});
})

Then ('the agents in the list are displayed alphabetically by name', () => {
    unsorted = []
    if(preview == 'table'){
        agent.getTableName().each(($name)=>{
            unsorted.push($name.text().toLowerCase())
            unsorted.sort()
        })
        sorted = unsorted.sort()
        var i = 0
        agent.getTableName().each(($name)=>{
            expect($name.text().toLowerCase()).to.be.eql(sorted[i])
            i+=1;
        })
    }
    else{
        agent.getCardName().each(($name)=>{
            unsorted.push($name.text().toLowerCase())
            unsorted.sort()
        })
        sorted = unsorted.sort()
        var i = 0
        agent.getCardName().each(($name)=>{
            expect($name.text().toLowerCase()).to.be.eql(sorted[i])
            i+=1;
        })
    }
    
})

// Scenario Outline: Agents displayed on the wallboard are sorted alphabetically by agent’s availability state

Given('the add a component modal for agent list is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click()
})


And('the {string} is selected', (view) =>{
    preview = view;
    if(view == 'card'){
        agent.cardView().click({force:true})
    }
    else if(view == 'table'){
        agent.tableView().click({force:true})
    }
})


And('the Availability state sort option is selected', () =>{
    if(preview == 'card'){
        cy.log(preview)
        agent.availabilitystateCard();
    }
    else if(preview == 'table'){
        cy.log(preview)
        agent.availabilitystatetable();
    }
})

And('the new wallboard configuration is saved', () => {
    agent.addButton().click();
    agent.saveButton().click();
    agent.saveButtonAlert().click();
})


When('the user opens the wallboard', () =>{
    agent.runButton().invoke('removeAttr', 'target').click({force:true});
})

Then ('the agents in the list are displayed alphabetically by the availability state', () => {
    unsorted = []
    if(preview == 'table'){
        var i = 0;
        agent.getTableName().each(($name)=>{
            unsorted.push($name.text().toLowerCase())
        })
        sorted = unsorted.sort()
        agent.getTableName().each(()=>{
            expect(unsorted[i]).to.include(sorted[i])
            i+=1;
        })

    }
    else{
        var i = 0;
        agent.availabilityStatusSortCard().each(($name)=>{
            unsorted.push($name.text().toLowerCase())
        })
        sorted = unsorted.sort()
        agent.availabilityStatusSortCard().each(()=>{
            expect(unsorted[i]).to.include(sorted[i])
            i+=1;
        })

    }
    
})

// Scenario Outline: Agents displayed on the wallboard are sorted by agent’s presence state
Given('the add component modal for agent list is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click()
})


And('the {string} is selected', (view) =>{
    preview = view;
    if(view == 'card'){
        agent.cardView().click({force:true})
    }
    else if(view == 'table'){
        agent.tableView().click({force:true})
    }
})


And('the Presence state sort option is selected', () =>{
    if(preview == 'card'){
        cy.log(preview)
        agent.presencestatecard();
    }
    else if(preview == 'table'){
        cy.log(preview)
        agent.presencestatetable();
    }
})

And('the new wallboard configuration is saved', () => {
    agent.addButton().click();
    agent.saveButton().click();
    agent.saveButtonAlert().click();
})


When('the user opens the wallboard', () =>{
    agent.runButton().invoke('removeAttr', 'target').click({force:true});
})

Then ('the agents in the list are displayed by the presence state in the following order: Inbound Call, Ringing, In Wrapup, Inbound Non-Queue Call, Outbound Call, Available, Logged Off', () => {
    var state_list = ['Inbound Call', 'Ringing, In Wrapup', 'Inbound Non-Queue Call', 'Outbound Call', 'Available', 'Logged Off']
    let poz_curr = 0;
    var unsorted = []
    if(preview == 'table'){
        agent.tableStatus().each(($text)=>{
            var text = $text.text()
                for(let i=0;i<state_list.length;i++){
                    if(state_list[i] == text){
                        if(poz_curr > i){
                            cy.log('Sort is not working.')
                            break
                        }
                        cy.log(text)
                        poz_curr = i
                    }
                }
            })
            cy.log('Sort is working.')
    }
    else{
        agent.cardStatus().each(($text)=>{
            var text = $text.text()
                for(let i=0;i<state_list.length;i++){
                    if(state_list[i] == text){
                        if(poz_curr > i){
                            cy.log('Sort is not working.')
                            break
                        }
                        cy.log(text)
                        poz_curr = i
                    }
                }
            })
            cy.log('Sort is working.')
    }

})
   
// Scenario Outline: Agents displayed on the wallboard are sorted by the time spent in current availability state
Given('the add component modal for agent list is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click()
})


And('the {string} is selected', (view) =>{
    preview = view;
    if(view == 'card'){
        agent.cardView().click({force:true})
    }
    else if(view == 'table'){
        agent.tableView().click({force:true})
    }
})


And('the Time spent in current availability state sort option is selected', () =>{
    if(preview == 'card'){
        cy.log(preview)
        agent.timecurrentavailabilitystatecard();
    }
    else if(preview == 'table'){
        cy.log(preview)
        agent.timeoncurravailabilitystateCheck()
        agent.timecurrentavailabilitystatetable();
    }
})

And('the new wallboard configuration is saved', () => {
    agent.addButton().click();
    agent.saveButton().click();
    agent.saveButtonAlert().click();
})


When('the user opens the wallboard', () =>{
    agent.runButton().invoke('removeAttr', 'target').click({force:true});
})

Then ('the first agents in the list are displayed based on the most time in the state', () =>{
    unsorted = []
    if(preview == 'table'){
        var i = 0;
        agent.getTableTCAS().each(($name)=>{
            unsorted.push($name.text().toLowerCase())
        })
        sorted = unsorted.sort()
        agent.getTableTCAS().each(()=>{
            expect(unsorted[i]).to.include(sorted[i])
            i+=1;
        })

    }
    else{
        var i = 0;
        agent.timeSpentincurrentstateCard().each(($name)=>{
            unsorted.push($name.text().toLowerCase())
        })
        sorted = unsorted.sort()
        agent.timeSpentincurrentstateCard().each(()=>{
            expect(unsorted[i]).to.include(sorted[i])
            i+=1;
        })
    }
})

// Scenario Outline: Agents possessing the selected skill to view are displayed on the wallboard
Given('the add component modal for agent list is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
})

And('the Table view option with the skills column is selected', () => {
    agent.tableView().click();
    agent.addSkillColumn().check({force:true});
})
And("{string} is selected", (skill_option) => {
    agent.select_skill_none().check({force: true})
    agent.select_skill_none().uncheck({force: true})
    agent.select_skill(skill_option + '> input').check({force:true});
    agent.select_skill(skill_option).then((text) => {
        skillText = text.text()
        cy.log(skillText)
    })
    agent.addButton().click();
})
And('the wallboard is saved', () => {
    agent.saveButton().click({force:true});
    agent.saveButtonAlert().click({force:true});

})
When('the user opens the wallboard', () => {
    agent.runButton().invoke('removeAttr', 'target'). click();
})
Then('the agents possessing the selected skill are displayed', () => {
    agent.viewSkills().each(($skills) => {
        cy.get($skills).click({force: true})
        agent.skillsList().then((allskills) => {
            expect(allskills.text()).to.include(skillText)
        })
        agent.clickOutside().click();
    })
})

// Scenario Outline: Agents possessing only the disabled skill to view are not displayed on the wallboard
Given('the agent list add component modal is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
})
And('the Table view option is selected with the skills column enabled', () => {
    agent.tableView().click();
    agent.addSkillColumn().check({ force: true });
})
And('the {string} is disabled', (skill_option) => {
    agent.select_skill_all().uncheck({ force: true })
    agent.select_skill(skill_option + '> input').uncheck({ force: true });
    agent.select_skill(skill_option).then((text) => {
        skillText = text.text()
        cy.log(skillText)
    })
    agent.addButton().click();
})
And('the user navigates to save the wallboard', () => {
    agent.saveButton().click();
    agent.saveButtonAlert().click();
})
When('the user runs the wallboard', () => {
    agent.runButton().invoke('removeAttr', 'target').click();
})
Then('none of the one-skill-agents displayed possess the disabled skill', () => {
    agent.viewSkills().each(($skills) => {
        cy.get($skills).click({ force: true })
        agent.individualSkill().then((skillsAssigned) => {
            numberOfSkills = skillsAssigned.length
            cy.log(numberOfSkills)
            if (numberOfSkills == 1) {
                agent.skillsList().then((allskills) => {
                    expect(allskills.text()).not.to.include(skillText)
                    cy.log(allskills.text())
                })
            }
            agent.clickOutside().click();
        })
    })
})

        // Scenario: Selected settings are displayed in Card format when Card view is selected
        Given ('the modal for adding agent list component is displayed', () => {
            agent.visitLandingPage();
            agent.newWallButton().click();
            agent.addComponent().click();
            agent.selectAgentList().click();
            agent.selectButton().click();
        })

        And ('the Card view is selected', () => {
            agent.cardView().check({force:true})
        })

        When ('the user saves the new wallboard', () => {
            agent.addButton().click({force:true});
            agent.saveButton().click({force:true});
            agent.saveButtonAlert().click({force:true});
        })

        And ('the user opens the wallboard saved in view mode', () => {
            agent.runButton().click();
        })

        Then ('the selected settings for the agent list component is displayed in card view mode', () => {
            agent.verifyCardView();
            agent.readOnlyCardMode().should('be.visible')
            agent.avatar().should('be.visible')
        })

// Scenario: Agent not possessing any of the skills is displayed when select none option is enabled
Given ('the add component modal for agent list is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
})
And ('the Table view option is selected', () => {
    agent.tableView().click();
})
And ('the skills column is enabled', () => {
    agent.addSkillColumn().check({ force: true });
})
And ('select none skills to view option is enabled', () => {
    agent.select_skill_none().check({force: true})
    agent.addButton().click();
})
And ('the user saves wallboard', () => {
    agent.saveButton().click();
    agent.saveButtonAlert().click();
})
When ('the user opens the wallboard in view mode', () => {
    agent.runButton().invoke('removeAttr', 'target').click();
})

Then('the agent with no skills assigned is displayed', () => {
    agent.agentsDisplayed().then((number) => {
        newNumber = number.length
        cy.log(newNumber)

        let i = 1
        for (i; i <= newNumber; i++) {
            cy.get('div > div > div:nth-child(' + i + ') > div > div.widget__body.widget__body--table > div > div.agent-list-table__body > div > div:nth-child(5)').should('contain.text', 'None')
        }
    })
})

// Scenario: The table preview updates when selecting a given column to view
Given ('that the table view option is selected', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
    agent.tableView().click();
})
And ('all columns to view are disabled', () => {
    cy.get('.c-modal--add-component__av-state-container input').each(($el) => {
        cy.wrap($el).uncheck({force: true});
    })
})
When ('the user enables the {string} column to view', (option) => {
    agent.selectColumnToView(option + '> input').check({force: true});
    agent.selectColumnToView(option).invoke('text').then((text) => {
        cy.log(text);
    })
})

Then ('the selected {string} column is displayed in the table preview', (column) => {
    agent.tablePreviewHeader().invoke('text').then((text) => {
        expect(text).to.contain(column)
    })
})

// Scenario Outline: The table preview updates when deselecting a given column to view
Given ('the table view option is selected for the component', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
    agent.tableView().click();
})
And ('all columns to view are enabled', () => {
    cy.get('.c-modal--add-component__av-state-container input').each(($el) => {
        cy.wrap($el).check({force: true});
    })
})
When ('the user disables the {string} column', (option) => {
    agent.selectColumnToView(option + '> input').uncheck({force: true});
    agent.selectColumnToView(option).invoke('text').then((text) => {
        cy.log(text);
    })
})
Then ('the column {string} is no longer displayed in the table preview', (column) => {
    agent.tablePreviewHeader().then(($el) =>{
        expect($el.text()).to.not.eql(column)
    })
})

// Scenario: Card preview dynamically updates when selecting a specific call queue//
Given ('the add component modal for agent list is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
})
And ('the Card view is selected', () => {
    agent.cardView().click({force: true});
})
When ('the user selects a call queue option', () => {
    let i = 0;
    for(i; i < 3; i++) {
        agent.call_queue().select(i);
        cy.get('div:nth-child(2) > select option:selected').then((text) => {
            callQText = text.text()
             cy.log(callQText)
         })
        agent.preview_title().then((previewTitle) => {
            expect(previewTitle.text()).to.include(callQText)
            cy.log(previewTitle.text())
        })
    }
})
Then ('the selected call queue option is displayed in the card preview', () => {
    // assertions included in the previous step
})

// Scenario: Table preview dynamically updates when selecting a specific call queue//
Given ('that the add component modal for agent list is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
})
And ('the Table view is selected', () => {
    agent.tableView().click({force: true});
})
When ('a call queue option is selected', () => {
    let i = 0;
    for(i; i < 3; i++) {
        agent.call_queue().select(i);
        cy.get('div:nth-child(2) > select option:selected').then((text) => {
            callQText = text.text()
             cy.log(callQText)
         })
        agent.preview_title().then((previewTitle) => {
            expect(previewTitle.text()).to.include(callQText)
            cy.log(previewTitle.text())
        })
    }
})
Then ('the call queue option selected is displayed in the table preview', () => {
        // assertions included in the previous step
})

// Scenario: Add component table preview dynamically changes to display two columns
Given ('the Table view is selected in the add component modal', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
    agent.tableView().click({force: true});
})
And ('1 Column option is selected', () => {
    agent.radio1Column().check({force: true});
})
When ('the user selects the 2 Columns option', () => {
    agent.radio2Columns().check({force: true});
})
Then ('the table preview is displayed as two columns', () => {
    agent.tablePreviewHeader().then((numberOfTables) => {
        expect(numberOfTables.length).to.eq(2);
    })
})

// Scenario: Add component table preview dynamically changes to display one column
Given ('the Table view is selected in the modal to add component', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
    agent.tableView().click({force: true});
})
And ('2 Columns option is selected', () => {
    agent.radio2Columns().check({force: true});
})
When ('the user selects the 1 Column option', () => {
    agent.radio1Column().check({force: true});
})
Then ('the table preview is displayed as one column', () => {
    agent.tablePreviewHeader().then((numberOfTables) => {
        expect(numberOfTables.length).to.eq(1);
    })
})

// Scenario: Agents list is displayed as 1 column when 1 Column option is selected
Given ('the Table view option with 1 Column is selected in the add component modal', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
    agent.tableView().click({force: true});
    agent.radio1Column().check({force: true});
})
And ('the user saves the 1 column table wallboard', () => {
    agent.addButton().click();
    agent.saveButton().click();
    agent.saveButtonAlert().click();
})
When ('the user runs the wallboard in view mode', () => {
    agent.runButton().invoke('removeAttr', 'target').click();
})
Then ('the agents list is displayed under 1 column', () => {
    agent.tablePreviewHeader().then((number) => {
        expect(number.length).to.eq(1);
    })
})

// Scenario: Agents list is displayed as 2 columns when 2 Columns option is selected
Given ('the Table view option with 2 Columns is selected in the add component modal', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
    agent.tableView().click({force: true});
    agent.radio2Columns().check({force: true});
})
And ('the user saves the wallboard configured as 2 columns', () => {
    agent.addButton().click();
    agent.saveButton().click();
    agent.saveButtonAlert().click();
})
When ('the user opens the wallboard in view mode', () => {
    agent.runButton().invoke('removeAttr', 'target').click();
})
Then ('the agents list is displayed under 2 columns', () => {
    agent.tablePreviewHeader().then((number) => {
        expect(number.length).to.eq(2);
    })
})

// Scenario: All available columns to view are displayed when all columns are selected
Given ('the table view option is selected for the agents list add component', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
    agent.tableView().click({force: true});
})
And ('all columns to view are selected', () => {
    cy.get('.c-modal--add-component__av-state-container input').each(($el) => {
        cy.wrap($el).check({force: true});
    })
})
And ('the wallboard with all columns to view is saved', () => {
    agent.addButton().click();
    agent.saveButton().click();
    agent.saveButtonAlert().click();
})
When ('the user opens the wallboard in read-only mode', () => {
    agent.runButton().invoke('removeAttr', 'target').click();
})
Then ('the following columns are displayed: Agent Name, Agent Extension Number, Current Availability State, Current Presence State, Time spent in current availability state, Time spent on current call, List of skills the agent possesses', () => {
    agent.viewModeTableHeader().invoke('text').should('include', 'Name')
                                              .and('include', 'Availability Status')
                                              .and('include', 'Phone Ext')
                                           // .and('include', 'Calls offered')
                                           // .and('include', 'Calls answered')
                                           // .and('include', 'Calls missed')
                                           // .and('include', 'Time in current p.state')
                                              .and('include', 'Time in current a.state')
                                              .and('include', 'Time on cur. call')
                                           // .and('include', 'Time on cur. wr.')
                                              .and('include', 'Skills')
                                              .and('include', 'Status')
})

// Scenario: No columns to view are displayed when all columns are disabled
Given ('the table view option is selected for ading agent list component', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
    agent.tableView().click({force: true});
})
And ('all columns to view are disabled', () => {
    cy.get('.c-modal--add-component__av-state-container input').each(($el) => {
        cy.wrap($el).uncheck({force: true});
    })
})
And ('the wallboard with no columns to view is saved', () => {
    agent.addButton().click();
    agent.saveButton().click();
    agent.saveButtonAlert().click();
})
When ('the user runs the wallboard in view mode', () => {
    agent.runButton().invoke('removeAttr', 'target').click();
})
Then ('no columns are displayed', () => {
    agent.bodyMessage().should('have.text', 'No agents')
})

// Scenario Outline: Agents with the selected presence state are displayed on the Card view component
Given ('the add component modal for agent list is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
})
And ('Card view is selected', () => {
    agent.cardView().click({force: true});
})
And ('the {string} presence state option is selected', (card_presence_state) => {
    agent.cardNonePresence().check({force: true});
    agent.cardNonePresence().click({force: true});
    agent.enableCardPresenceState(card_presence_state + '> input').check({ force: true });
    agent.enableCardPresenceState(card_presence_state).invoke('text').then((text) => {
        state = text;
        cy.log(state);
    })
})
When ('the user adds the card component configured', () => {
    agent.addButton().click();
    cy.wait(3000)
})
Then ('the agents with the selected presence state are displayed', () => {
    agent.bodyMessage().invoke('text').then((text) => {
        cy.log(text)
        if (text == 'No agents') {
            cy.log('There are no agents with the ' + state +' presence status.')
        }
        else {
            agent.cardPresenceState().each((text) => {
                expect(text.text()).to.eq(state)
            })
        }
    })
})

// Scenario Outline: Agents with the selected presence state are displayed on the Table view component
Given ('the modal to add component is displayed for agent list', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
})
And ('the Table view option is selected in the modal', () => {
    agent.tableView().click({force: true});
})
And ('the {string} presence state option is enabled', (table_presence_state) => {
    agent.tableNonePresence().check({force: true});
    agent.tableNonePresence().click({force: true});
    agent.enableTablePresenceState(table_presence_state + '> input').check({ force: true });
    agent.enableTablePresenceState(table_presence_state).invoke('text').then((text) => {
        state = text;
        cy.log(state);
    })
})
When ('the user navigates to add the component configured', () => {
    agent.addButton().click();
    cy.wait(3000)
})
Then ('the agents with the enabled presence_state are displayed', () => {
    agent.bodyMessage().invoke('text').then((text) => {
        if (text == 'No agents') {
            cy.log('There are no agents with the ' + state +' presence status.')
        }
        else {
            agent.tableStatus().each((text) => {
                expect(text.text()).to.eq(state)
            })
        }
    })
})

// Scenario Outline: Agents with the presence state disabled are not displayed on the Card component
Given ('that the add a component modal for agent list is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
})
And ('the Card view type is selected', () => {
    agent.cardView().click({force: true});
})
And ('the {string} option is disabled', (card_presence_state) => {
    agent.cardAllPresence().check({force: true});
    agent.cardAllPresence().click({force: true});
    agent.enableCardPresenceState(card_presence_state + '> input').uncheck({ force: true });
    agent.enableCardPresenceState(card_presence_state).invoke('text').then((text) => {
        state = text;
        cy.log(state);
    })
})
When ('the configured component is added', () => {
    agent.addButton().click();
    cy.wait(3000)
})
Then ('no agents with the disabled presence state are displayed', () => {
    agent.bodyMessage().invoke('text').then((text) => {
        cy.log(text)
        if (text == 'No agents') {
            cy.log('All agents have the disabled ' + state + ' presence status.')
        }
        else {
            agent.cardPresenceState().each((text) => {
                expect(text.text()).not.eq(state)
            })
        }
    })
})

// Scenario Outline: Agents with the presence state disabled are not displayed on the Table component
Given ('that the modal for adding an agent list component is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
})
And ('the Table view type is selected', () => {
    agent.tableView().click({force: true});
})
And ('the {string} option for presence state is disabled', (table_presence_state) => {
    agent.tableAllPresence().check({force: true});
    agent.tableAllPresence().click({force: true});
    agent.enableTablePresenceState(table_presence_state + '> input').uncheck({ force: true });
    agent.enableTablePresenceState(table_presence_state).invoke('text').then((text) => {
        state = text;
        cy.log(state);
    })
})
When ('the user adds the table configured component', () => {
    agent.addButton().click();
    cy.wait(3000)
})
Then ('no agents with the disabled presence state are displayed on the table', () => {
    agent.bodyMessage().invoke('text').then((text) => {
        cy.log(text)
        if (text == 'No agents') {
            cy.log('All agents have the disabled ' + state + ' presence status.')
        }
        else {
            agent.tableStatus().each((text) => {
                expect(text.text()).not.eq(state)
            })
        }
    })
})

// Scenario Outline: Agents with the selected availability state are displayed on the Card component
Given ('that the agent list add component modal is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
})
And ('the view Card is selected', () => {
    agent.cardView().check({force: true});
})
And ('the {string} state is selected', (card_availability) => {
    agent.cardNoneAvailability().check({force: true});
    agent.cardNoneAvailability().uncheck({force: true});
    agent.enableCardAVState(card_availability + ' > input').check({force: true});
    agent.enableCardAVState(card_availability).invoke('text').then((text) => {
        state = text.split(" ").slice(-1);
        cy.log(state);
    })
})
When ('the user adds the component on the wallboard', () => {
    agent.addButton().click();
    cy.wait(3000)
})
Then ('agents with the selected availability state state are displayed', () => {
    agent.bodyMessage().invoke('text').then((text) => {
        cy.log(text)
        if (text == 'No agents') {
            cy.log('No agents have the selected ' + state + ' availability status.')
        }
        else {
            agent.cardAvailabilityState().each((text) => {
                expect(text.text()).to.include(state);
            })
        }
    })
})

// Scenario Outline: Agents with the selected availability state are displayed on the Table component
Given('the agent list to add component modal is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
})
And('the view Table is selected', () => {
    agent.tableView().click({ force: true });
})
And('the {string} availability state is selected', (table_availability) => {
    agent.tableNoneAvailability().check({ force: true });
    agent.tableNoneAvailability().uncheck({ force: true });
    agent.enableTableAVState(table_availability + ' > input').check({ force: true });
    agent.enableTableAVState(table_availability).invoke('text').then((text) => {
        state = text.split(" ").slice(-1);
        cy.log(state);
    })
})
When('the user adds the component on the wallboard configured', () => {
    agent.addButton().click();
    cy.wait(3000)
})
Then('agents with the selected availability state state are displayed on the table', () => {
    agent.bodyMessage().invoke('text').then((text) => {
        if (text == 'No agents') {
            cy.log('No agents have the selected ' + state + ' availability status.')
        }
        else {
            agent.tableAvailabilityState().each((text) => {
                expect(text.text()).to.include(state);
            })
        }
    })
})

// Scenario Outline: Agents with the availability state disabled on the wallboard are not displayed on Card component
Given ('the add agent list component modal is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
})
And ('the view type Card is selected', () => {
    agent.cardView().check({force: true});
})
And ('the {string} state option is disabled', (card_availability) => {
    agent.availabilityCheckboxCard().check({force: true});
    agent.availabilityCheckboxCard().uncheck({force: true});
    agent.enableCardAVState(card_availability + ' > input').uncheck({force: true});
    agent.enableCardAVState(card_availability).invoke('text').then((text) => {
        state = text.split(" ").slice(-1);
        cy.log(state);
    })
})
When ('the component is added on the wallboard', () => {
    agent.addButton().click();
    cy.wait(3000)
})
Then ('no agents with the disabled availability state are displayed on the card', () => {
    agent.bodyMessage().invoke('text').then((text) => {
        cy.log(text)
        if (text == 'No agents') {
            cy.log('All agents have the disabled ' + state + ' availability status.')
        }
        else {
            agent.cardAvailabilityState().each((text) => {
                expect(text.text()).not.to.include(state)
            })
        }
    })
})

// Scenario Outline: Agents with the availability state disabled on the wallboard are not displayed on Table component
Given ('the add agent list component modal is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
})
And ('the view type Table is selected', () => {
    agent.tableView().click({ force: true });
})
And ('the {string} state is disabled', (table_availability) => {
    agent.availabilityCheckboxTable().check({force: true});
    agent.availabilityCheckboxTable().uncheck({force: true});
    agent.enableTableAVState(table_availability + ' > input').uncheck({force: true});
    agent.enableTableAVState(table_availability).invoke('text').then((text) => {
        state = text.split(" ").slice(-1);
        cy.log(state);
    })
})
When ('the component is added on the wallboard', () => {
    agent.addButton().click();
    cy.wait(3000)
})
Then ('no agents with the disabled availability state are displayed on the table', () => {
    agent.bodyMessage().invoke('text').then((text) => {
        cy.log(text)
        if (text == 'No agents') {
            cy.log('All agents have the disabled ' + state + ' availability status.')
        }
        else {
            agent.tableAvailabilityState().each((text) => {
                expect(text.text()).not.to.include(state)
            })
        }
    })
})

// Scenario: Agents present on the selected queue are displayed when a specific queue is selected
Given ('the add component modal is displayed', () => {
    agent.visitLandingPage();
    agent.newWallButton().click();
    agent.addComponent().click();
    agent.selectAgentList().click();
    agent.selectButton().click();
})
When ('the user selects a given call queue', () => {
    let i = 0;
    for (i; i < 3; i++) {
        agent.call_queue().select(i);
        cy.get('div:nth-child(2) > select option:selected').then((text) => {
            callQText = text.text()
            cy.log(callQText)
        })
        agent.forAdd().click();
        cy.wait(3000);

        cy.get('.widget__body').invoke('text').then((text) => {
            if (text == 'No agents') {
                cy.log('There are no agents in the selected' + callQText + ' call queue.')
                agent.editComponentButton().click();
            }
            else {
                agent.agent_list_title().then((title) => {
                    cy.log(title.text())
                    expect(title.text()).to.include(callQText)
                    agent.editComponentButton().click();
                })
            }
        })
    }
})
And ('the user adds the component for selected call queue', () => {
    // Action performed in the above step
})
Then ('the agents on the selected call queue are displayed', () => {
    // Assertion included in the when step
})