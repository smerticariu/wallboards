Feature: Generate & Access read-only URL for wallboards and groups - Admin & Team Leader Users
#  Team Leader User not implemented yet

#  unsaved URL
    Scenario: Admin users can create read-only URLs for wallboards
        Given the edit mode for a wallboard is displayed
        And the settings modal is displayed
        When the user clicks on the option to create a read-only URL
        Then the read-only URL is generated
        And the option to copy the link becomes active

#  disabled URL
    Scenario: Admin users can disable read-only URLs for wallboards
        Given that the settings modal is displayed
        And an URL has been created
        When the user selects the option to disable the URL
        Then the URL is no longer displayed
        And the option to copy the URL is inactive

#  saved URL
    Scenario: Generated read-only URL can be saved
        Given that a new wallboard is created
        And the user generates a read-only URL
        And the URL is saved
        And the wallboard changes are saved
        When the user acesses the URL
        Then the wallboards is displayed in read-only mode

    Scenario: Different read-only URL is generated when initial URL is disabled
        Given that a read-only URL is created
        And the user copies the link
        And the user disables the link
        When the user re-creates the URL
        Then a different read-only URL is generated

#  URL for deleted wallboard
    Scenario: Generate read-only URL and delete the associated wallboard
        Given a new wallboard is created
        And a read-only URL is generated
        And the changes made in the wallboard are saved
        When the user navigates to the landing page
        Then the user can delete the wallboard

#  ----------------------------------------------------------------------------------------------
#  WALLBOARD GROUPS URL SCENARIOS

#  unsaved URL
    Scenario: Admin users can create read-only URLs for groups
        Given a new group is created
        And the user opens the group settings
        When the user clicks on the option to create a read-only URL for group
        Then the group read-only URL is generated
        And the option to copy the link for group becomes active

#  disabled URL
    Scenario: Admin users can disable read-only URLs for groups
        Given that the settings modal for a new group is displayed
        And a group URL has been created
        And the user saves the URL and the group
        When the user selects the option to disable the group URL
        Then the group URL is no longer displayed
        And the option to copy the group URL is inactive

#  saved URL
    Scenario: Generated read-only URL for group can be saved
        Given that a new group is created
        And the user generates a group read-only URL
        And URL is saved
        And the group changes are saved
        When the user accesses the group URL
        Then the group is displayed in read-only mode

#  URL for deleted wallboard
    Scenario: Generate read-only URL and delete the associated group
        Given a group is created
        And associated read-only URL is generated
        And the changes made in the wallboard group are saved
        When the user navigates to the groups landing page
        Then the user can delete the group

