Feature: Monitoring the agents login data

    Scenario: Selecting the agent login component type displays the modal with default configuration
        Given the user is logged in
        And the wallboard creation page is displayed
        When the user navigates to add a component for agent login
        Then the agent login component modal with default configuration is displayed

    Scenario: The agent login preview dynamically updates when associated configuration options are changed
        Given the user is logged in
        And the user navigates to the wallboard creation page
        And the user adds a new agent login type component
        When the user changes the configuration
        Then the changes are displayed in the component preview

    Scenario Outline: Agent login component displays the options configured in the component modal
        Given the '<user>' is logged in
        And the user navigates to create a new wallboard
        And the user navigates to add a new agent login component
        And the user configures the component options
        When the component is saved
        Then the configured options are displayed on the component
        Examples:
            | user             |
            | admin user       |
          # | team leader user |

    Scenario: Existing agent login component configuration can be edited
        Given the user is logged in
        And a wallboard with one agent login component type is created
        And the user edits the configuration options
        When the edits are saved
        Then the new configuration is displayed on the saved component

    Scenario Outline: Agent login component updates when agent login status changes
        Given that the '<user>' is logged in
        And a wallboard with one agent login and one agent list component is displayed
        When the user changes the login status of the first agent displayed on the agent list component
        Then the agent login component data is updated reflecting the change of agent login status
        Examples:
            | user             |
            | admin user       |
          # | team leader user |

    Scenario Outline: Agent login component can be removed
        Given that the '<user>' is logged in
        And a wallboard with one agent login component exists
        When the user navigates to remove the component
        Then the component is no longer displayed on the wallboard
        Examples:
            | user             |
            | admin user       |
          # | team leader user |

    Scenario: Agent login component name does not allow invalid characters
        Given that the user is logged in
        And a wallboard with an agent login component exists
        When the user navigates to edit component name by entering invalid characters
        Then the user is informed that invalid characters are not allowed

    Scenario: Agent login component name cannot be empty
        Given that the user is logged in
        And a wallboard with one agent login component is already created
        When the user navigates to edit component name by removing all characters in the name field
        Then the user is informed that component name cannot be empty

    Scenario Outline: Min 1 and max 100 records are displayed on the Agent login component
        Given a wallboard with one agent login component is displayed
        And the user navigates to edit the configuration options
        When the user enters '<value>' for the limit results field
        Then the corresponding '<value>' number of records is displayed
        Examples:
            | value |
            | 1     |
            | 100   |

    Scenario Outline: Selecting to view results outside the available limit range is not allowed
        Given the wallboard with one agent login component is displayed
        And the user edits the configuration options
        And the user enters '<value>' in the limit results field
        When the user attempts to save the new configuration
        Then the user is informed about the result allowed limits
        Examples:
            | value |
            | 0     |
            | 101   |

    Scenario: The time displayed on the agent login component updates when the time zone option is edited
        Given the wallboard for an agent login component is displayed
        And the user changes the current time zone option
        When the user saves the new configuration
        Then the time displayed updates

    Scenario Outline: The agent login records are filtered based on the time period selected
        Given that a wallboard with a default agent login component and a default agent list component is displayed
        And the user changes the first agent's log in state
        And the user changes the agent login component current period to '<another>' period
        When the new configuration is saved
        Then the records displayed fit the time period selected
        Examples:
            | another      |
            | This Hour    |
            | Rolling Hour |
            | This Week    |
            | This Month   |

    Scenario: No file is generated when there are no events recorded for the interval selected
        Given the wallboard with an agent list component is displayed
        And the user navigates to edit configuration options
        When the user enters dates for an interval export with no events
        Then the user is informed that there are no records

    Scenario: Export results option is unavailable if the interval dates requested are in the future
        Given the wallboard with an agent list component is displayed
        And the user navigates to edit configuration options
        When the user enters dates in the future for the interval export
        Then the option to export results is unavailable