Feature: Create Wallboard

    Scenario: The user is redirected to wallboard creation page when requesting to create a new wallboard
        Given the landing page is displayed
        When the user clicks on the button for new wallboard
        Then the new wallboard creation page is displayed
    
    Scenario: The new wallboard name allows alphanumeric characters
        Given the wallboard creation page is displayed
        When the user clicks on the “My New Wallboard” field
        And the user inputs the desired wallboard name consisting of alphanumeric characters
        And the user saves the wallboard
        Then the desired wallboard name is displayed for the new wallboard created
 
    Scenario: The new wallboard name does not allow invalid characters
        Given the wallboard creation page is displayed
        When the user clicks on the “My New Wallboard” field
        And the user types in special characters
        And the user saves the wallboard
        Then the user is informed that the wallboard name allows only alphanumeric characters

    Scenario: The new wallboard name cannot be empty
        Given the wallboard creation page is displayed
        When the user clicks on the “My New Wallboard” field
        And the user deletes the content of the wallboard name field
        And the user saves the wallboard
        Then the user is informed that the wallboard name cannot be empty
    
    Scenario: A new agent list wallboard can be created using default options
        Given the landing page is displayed
        And the user clicks the new wallboard button
        And the user clicks the add component button
        And the user selects the agent list component
        And the user clicks on the add component button
        When the user saves the wallboard
        Then the new wallboard is saved
        And the user remains on the same page

    Scenario: Wallboard can be run from edit mode
        Given the wallboard creation page is displayed
        And the user adds a component
        And the user saves the new wallboard
        When the user clicks on the run button
        Then the wallboard opens in a new browser window

    Scenario: Blank wallboard cannot be run
        Given the landing page is displayed
        And the user clicks on the button for new wallboard
        And the user saves the wallboard that has been created
        When the user inspects the run button
        Then the run button is greyed out