Feature: Queue monitoring and real time updates

    Scenario: Selecting the queue list component type displays the modal with default configuration
        Given the user is logged in
        And the wallboard creation page is displayed
        When the user navigates to add a component for queue list
        Then the queue list component modal with default configuration is displayed

    Scenario Outline: Queue list component can be removed
        Given the '<user>' is logged in
        And the wallboard with a queue list component is displayed
        When the user removes the queue list component
        Then the queue list component is no longer displayed on the wallboard
        Examples:
            | user             |
            | admin user       |
          # | team leader user |

    Scenario: The queue list preview dynamically updates when associated configuration options are changed
        Given the user is logged in
        And the user navigates to the wallboard creation page
        And the user adds a new queue list component
        And the user changes the component name
        And the user selects another queue to monitor
        And the user disables the call statuses options
        And the user disables all show columns except the caller number column
        And the user enables the listen live option
        When the user inspects the component preview
        Then the changes are displayed in the component preview

    Scenario: Queue list component name does not allow invalid characters
        Given the user is logged in
        And a wallboard with a queue list component is displayed
        And the user navigates to edit component name by entering invalid characters
        When the user attempts to save the edits made
        Then the user is informed that invalid characters are not allowed

    Scenario: Queue list component name cannot be empty
        Given that the user is logged in
        And a wallboard with one queue list component is already created
        And the user navigates to edit component name by removing all characters in the name field
        When the user attempts to save the new edits
        Then the user is informed that component name cannot be empty

    Scenario Outline: Setting a SLA time value outside the valid range is not allowed
        Given the wallboard containing a default queue list component is displayed
        And the user navigates to edit the time in queue SLA by typing '<value>'
        And the user navigates to edit the time at head of queue SLA by typing '<value>'
        When the user attempts to save the new configuration
        Then the user is informed about the allowed range for selected '<value>'
        Examples:
            | value   |
            | 0       |
          # | 99999   |