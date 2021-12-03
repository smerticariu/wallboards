Feature: Removing a component

    Scenario Outline: The user is asked to confirm component removal
        Given the wallboard creation page is displayed
        And the user adds a new component of '<type>' view
        When the user removes the component
        Then a confirmation pop-up is displayed
        Examples:
            | type                                                                                              |
            | div.c-modal--add-component__left-side > div:nth-child(3) > label                                  |
            | div.c-modal--add-component__left-side > div:nth-child(3) > div.c-modal--add-component__main-radio |

    Scenario: Removing components is only available from wallboard edit mode
        Given the page for wallboard creation is displayed
        And the user adds component
        And the user saves the wallboard
        When the user runs the wallboard
        Then the option to remove the component is not available

    Scenario: Wallboard component is removed after removal confirmation
        Given the wallboard edit mode view is displayed
        And the user adds a new component
        And the component is removed
        When the user confirms deleting the component
        Then the component is no longer displayed

    Scenario: Component is not removed when confirmation message is dismissed
        Given the edit mode view for a wallboard is displayed
        And the user adds a component
        And the user requests to remove the component
        When the user cancels the message for deleting the component
        Then the component remains displayed
