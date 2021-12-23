Feature: Monitor selected queue status

    Scenario Outline: Queue status specific metrics are displayed on the queue status component
        Given the '<user>' is logged in
        And the user navigates to create a new wallboard
        When a new queue status component is added
        Then the following metrics are displayed: Available Agents, Busy Agents, Wrapped Up Agents, Logged Off Agents, Total Agents, Total Calls Queueing, Longest Time in Queue, Most Dial Attempts
        Examples:
            | user             |
            | admin user       |
          # | team leader user |

    Scenario: Queue status component name does not allow invalid characters
        Given the user is logged in
        And a wallboard with a queue status component exists
        When the user navigates to edit component name by entering invalid characters
        Then the user is informed that invalid characters are not allowed

    Scenario: Queue status component name cannot be empty
        Given that the user is logged in
        And a wallboard with one queue status component is already created
        When the user navigates to edit component name by removing all characters in the name field
        Then the user is informed that component name cannot be empty

    Scenario Outline: Queue status component can be removed
        Given that the '<user>' is logged in
        And a wallboard with one queue status component is displayed
        When the user navigates to remove the component
        Then the component is no longer displayed on the wallboard
        Examples:
            | user             |
            | admin user       |
          # | team leader user |

    Scenario: Selected queue is displayed on the queue status component
        Given that the user is logged in
        And the user navigates to create a new wallboard
        And the user adds an agent list component for a given call queue
        And the user adds a queue status component for the same selected call queue
        When the user inspects the details for the queue status component
        Then the correct details about the selected call queue are displayed

    Scenario: Correct queue status metrics are displayed when the selected queue has no agents
        Given the wallboard creation page is displayed
        And the queue status component modal for an empty call queue is open
        When the user saves the component
        Then the all queue status metrics indicate there are no agents in the selected queue

    Scenario: Correct number of total calls queueing is displayed when no calls are made to the selected queue call
        Given the queue status component is displayed
        And no call is made to the selected call queue
        When the user inspects the total calls queuing
        Then the total number displayed is 0