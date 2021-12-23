Feature: Creating Wallboard Groups

    Scenario: New wallboard group can be created
        Given that the user is logged in
        And the user selects the button to create a new wallboard group
        And the user types in a new wallboard name
        And the user adds a wallboard on the wallboard group
        And the user saves the wallboard group
        When the user navigates to the wallboard groups landing page
        Then the newly created wallboard group is displayed

    Scenario Outline: Wallboard group name does not allow invalid characters
        Given the group creation page is displayed
        And the user edits the wallboard group name by '<changing>' the current name
        When the user attempts to save the changes
        Then the user is informed that the name allows alphanumeric characters
        Examples:
            | changing                      |
            | typing special characters for |
            | leaving empty                 |

    Scenario: An empty wallboard group cannot be run
        Given that the wallboard group creation page is displayed
        And the user adds a new step
        And no wallboard is added to the step
        When the user attempts to run the group
        Then the option to run the wallboard group is unavailable

    Scenario: Max 10 wallboards can be added to a wallboard groups
        Given the page for wallboard group creation is displayed
        When the user adds 10 steps
        Then the option to add a new step is unavailable

    Scenario: Existing wallboard can be added to a wallboard group
        Given the user navigates to wallboard group creation page
        And the user adds a new step
        And the user adds an existing wallboard to the step
        And the user saves the wallboard group
        When the user runs the group
        Then the selected wallboard is displayed

    Scenario: Current wallboard selected can be changed
        Given a wallboard group containing one wallboard is displayed
        And the user navigates to view the screen options
        And the user selects the option to change current wallboard
        When the user selects another wallboard
        Then the selected wallboard is displayed on the step

    Scenario Outline: Currently selected wallboard can be removed
        Given that a wallboard group containing one wallboard is displayed
        And the user navigates to open screen options
        And the user selects the option to remove current wallboard
        When the user selects to '<option>' the modal
        Then the wallboard is '<option2>' displayed on the group
        Examples:
            | option  | option2   |
            | confirm | no longer |
            | cancel  | still     |

    Scenario: Wallboard group steps and empty steps can be removed
        Given the wallboard group containing one wallboard is displayed
        And the user adds a new empty step
        When the user removes both steps
        Then the steps are no longer displayed on the group

    Scenario: Specific amount to time can be set for a wallboard to be displayed in a wallboard group
        Given the wallboard group creation page is displayed
        And the user adds 2 steps
        And the user adds a different wallboard to each step
        And the user sets the same specific time for the wallboard to be displayed
        And the user saves the group configuration
        When the user runs the group
        Then the wallboards are displayed one at a time for the amount of time selected by the user

    Scenario Outline: The user is informed about unsaved changes when leaving group creation page
        Given the new wallboard group page is displayed
        And new changes are made
        When the user '<navigates>' to leave the page
        Then the user is informed that the changes are unsaved
        Examples:
            | navigates                         |
            | selects the close button          |
            | selects the Natterbox logo button |

