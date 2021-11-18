Feature: Interactivity Options

    Scenario Outline: The user is allowed to change agents' availability state when associated interactivity option is selected
        Given the add component modal for agent list is displayed
        And the '<view>' is selected
        And the option to change availability state is selected
        And the component is added
        And the wallboard read-only URL is copied
        And the newly configured wallboard is saved
        When the '<user>' opens the wallboard in view mode
        Then the user can change agent's availability state
        Examples:
            | view  | user  |
            | card  | admin |
            | table | admin |
            | card  | basic |
            | table | basic |
            
    Scenario Outline: The user is not allowed to change agents' availability state when associated interactivity option is disabled
        Given the add component modal for agent list is displayed
        And the '<view>' is selected
        And the option to change availability state is disabled
        And the component is added
        And the wallboard read-only URL is copied
        And the newly configured wallboard is saved
        When the '<user>' opens the wallboard in view mode
        Then the user is not allowed to change agent's availability state
        Examples:
            | view  | user  |
            | card  | admin |
            | table | admin |
            | card  | basic |
            | table | basic |