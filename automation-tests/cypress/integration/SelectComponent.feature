Feature: Selecting Component Categories

    Scenario: Queues, Calls and Users component categories are displayed when navigating to add new component
        Given the wallboard creation page is displayed
        When the user clicks on the button to add component
        Then a modal is displayed for selecting the following component categories: Queues, Calls, Users

    Scenario: Category specific elements are displayed when selecting Queues category
        Given the modal for selecting a component is displayed
        When the user selects the Queues category
        Then the following elements are displayed on the right modal side: Agent list, Queue list, Queue tracking, Queue status

    Scenario: Category specific elements are displayed when selecting Calls category
        Given the modal to select a component is displayed
        When the user selects the Calls category
        Then the following elements are displayed on the right modal side: Call status, Call tracking

    Scenario: Category specific elements are displayed when selecting Users category
        Given the modal to select component is displayed
        When the user selects the Users category
        Then the following elements are displayed on the right modal side: Agent login, Agent status

    Scenario: Performing a search in Queues category displays the results matching search criteria
        Given the select a component modal is displayed
        And the Queues category is selected
        When the user fills in search criteria
        Then the results matching the search criteria are displayed

    Scenario: Performing a search in Calls category displays the results matching search criteria
        Given the select component modal is displayed
        And the Calls category is selected
        When the user fills in desired search criteria
        Then the results matching the desired search criteria are displayed

    Scenario: Performing a search in Users category displays the results matching search criteria
        Given the selecting a component modal is displayed
        And the Users category is selected
        When the user fills in desired keyword
        Then the results matching the search keyword are displayed

    Scenario: The components start filtering from the very first letter that the user inputs for search
        Given that the select a component modal is displayed
        When the user fills in the first character of the search keyword
        Then the results start filtering

    Scenario: Add component modal is displayed when selecting an element
        Given that an element is selected
        When the user clicks on the select button
        Then the modal for selecting component closes
        And the add component modal is displayed

    Scenario: The modal to select a component closes when the user cancels it
        Given that the select component modal is displayed
        When the user clicks on the cancel button
        Then the modal for selecting a component closes