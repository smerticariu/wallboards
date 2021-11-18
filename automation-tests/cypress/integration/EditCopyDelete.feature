Feature: Edit / Copy / Delete / View Wallboards

# EDIT WALLBOARD SCENARIOS
    Scenario: New component can be added to existing wallboard
        Given the landing page is displayed
        And the user selects the option to edit the wallboard
        And the user adds a new component
        When the user saves the changes
        Then the user is informed that the changes are successfully saved
        And the user remains on the same page

    Scenario: Existing wallboard component options can be edited
        Given a wallboard containing at least one component exists
        And the user edits the existing wallboard component options
        When the user navigates to save the edit made
        Then the user is informed that the edit is successfully saved
        And the edit page remains displayed
        And the edit mode grid is visible

    Scenario: Existing wallboard name can be edited
        Given the landing page is displayed
        And the user clicks the option to edit the wallboard
        And the user edits the wallboard name
        When the user saves the name changed
        Then the user is informed that the new change is successfully saved
        And the user is still on the same page

    Scenario: Existing wallboard name can be edited from wallboard settings
        Given that a wallboard is open in edit mode
        And the user opens the settings modal
        And the user edits the wallboard name using valid characters
        And the user saves the edit
        And the user saves the wallboard change
        When the user navigates to the landing page
        Then the edited wallboard name is displayed

    Scenario: Edited wallboard name cannot contain invalid characters
        Given a wallboard is open in edit mode
        And the settings modal is opened
        And the user edits the wallboard name using invalid characters
        When the user attempts to save the edit
        Then the user is warned that the wallboard name must be alphanumeric


    # COPY WALLBOARD SCENARIOS
    Scenario: Existing wallboard can be copied
        Given the landing page is displayed
        When the user selects the option to copy a wallboard
        Then a new wallboard is created, its name containing the original name + Copy word

    # DELETE WALLBOARD SCENARIOS
    Scenario: Confirmation of deleting wallboard is required
        Given the landing page is displayed
        When the user selects the option to delete the wallboard
        Then the user is requested to confirm the deletion
  
    Scenario: Existing wallboard can be deleted
        Given the wallboard landing page is displayed
        And the user selects the delete option
        When the user confirms deleting the wallboard
        Then the user is informed that the wallboard is deleted
        And the wallboard is no longer displayed on the landing page

    Scenario: Existing wallboard is not deleted when confirmation message is dismissed
        Given the landing page is displayed
        And the user navigates to delete a wallboard
        When the user cancels the confirmation message
        Then the confirmation message closes
        And the wallboard remains displayed on the landing page

    # VIEW WALLBOARD SCENARIOS
    Scenario: Existing wallboard can be opened in view mode from the landing page
        Given the wallboards landing page is displayed
        When the user clicks a wallboard name
        Then a new page launches displaying the wallboard in view mode

    Scenario: Read only mode view displays wallboard components as in the edit mode view
        Given the page to create a new wallboard is displayed
        And the user adds a table type agent list component
        And the user adds a card type agent list component
        And the user saves the wallboard
        When the user runs the wallboard
        Then the table type component is displayed on top of card type component

    Scenario: Wallboard settings is only available in edit mode view
        Given a wallboard is created
        When the wallboard is opened in read only mode
        Then the settings option is not present on the read only mode view
    
    # WALLBOARD DESCRIPTION SCENARIOS
    Scenario: New wallboard description can be added
        Given the new wallboard page is displayed
        And the settings modal is opened
        And the user added a new wallboard description
        And the user saved the wallboard new settings
        When the user goes to the landing page
        Then the new wallboard description is displayed

    Scenario: Existing wallboard description can be edited
        Given an existing wallboard is opened in edit mode
        And the settings modal is displayed
        And the user edits the wallboard description
        And the changes made are saved
        When the user clicks on the button to navigate to the landing page
        Then the new edited name is displayed