Feature: Undo / Redo Wallbard Changes

    Scenario: Original wallboard attributes are displayed when undo button is selected
        Given the edit mode for a wallboard with one card component view is displayed
        And the user edits the wallboard name by adding one valid character
        And the user edits to switch the component view to table view
        And the user adds a new component
        And the user edits the wallboard description
        And the user creates a read-only URL
        And the settings modal is saved
        And the user removes one component
        When the user clicks the undo button 5 times
        Then the original wallboard name, component type view, number of components displayed, wallboard description, and URL state are displayed

    Scenario: Edited wallboard attributes are displayed when redo button is selected
        Given that the edit mode for a wallboard with one card component view is displayed
        And the wallboard name is edited by adding one valid character
        And the component view is switched to table view
        And a new component is added
        And the wallboard description is edited
        And the user creates an URL
        And the modal settings are saved
        And one component is removed
        And the user clicks the undo button 5 times
        When the user clicks the redo button 5 times
        Then the edited wallboard name, one component, edited wallboard description, and changed URL state are displayed

    Scenario: Undo and Redo buttons get disabled when the changes are saved
        Given the wallboard edit mode is displayed
        And the user edits the wallboard name
        And the user adds a component
        And the user clicks the undo button once
        When the user saves the wallboard
        Then both undo and redo buttons are disabled