Feature: Monitor agents' statuses

    Scenario: The agent status modal preview dynamically updates when associated configuration options are changed
        Given the user is logged in
        And the wallboard creation page is displayed
        And the user navigates to add a new agent status component
        When the user changes the default component configuration options (change name, 5 limit results, period, disable the two show columns)
        Then the preview updates to reflect the configured options

    Scenario: Agent status component name does not allow invalid characters
        Given that the user is logged in
        And a wallboard with an agent status component is created
        When the user navigates to edit component name by entering invalid characters
        Then the user is informed that invalid characters are not allowed

    Scenario: Agent status component name cannot be empty
        Given that the user is logged in
        And a wallboard with one agent status component is already created
        When the user navigates to edit component name by removing all characters in the name field
        Then the user is informed that component name cannot be empty

    Scenario Outline: Existing agent status component configuration can be edited
        Given the '<user>' is logged in
        And the user creates a wallboard with a default agent status component
        And the user navigates to edit component configuration options (name, limit results, period, show columns)
        When the user saves the changes made
        Then the new component configuration is displayed
        Examples:
            | user       |
            | admin user |
          # | team leader user |

    Scenario Outline: Agent status component can be removed
        Given that the '<user>' is logged in
        And a wallboard with one agent status component is created
        When the user navigates to remove the component
        Then the component is no longer displayed on the wallboard
        Examples:
            | user             |
            | admin user       |
          # | team leader user |

    Scenario Outline: Agent status component updates when agent status changes
        Given that the '<user>' is logged in
        And a wallboard with one default agent status component and one default agent list component is created
        When the user changes the availability state of the first agent disaplyed on the agent list component
        Then the agent status component updates reflecting the new record
        expected -- (verify that first record contains correct agent name, state display name is the one selected by the user, current date, elapsed should pe less than 10 sec)
        Examples:
            | user             |
            | admin user       |
          # | team leader user |

    Scenario Outline: Min 1 and max 100 records are displayed on the Agent status component
        Given a wallboard with one agent status component is displayed
        And the user navigates to edit the configuration options
        And the user sets the period to this month
        And the user enters '<value>' for the limit results field
        When the user saves the edits
        Then the corresponding '<value>' number of records is displayed
        Examples:
            | value |
            | 1     |
            | 100   |

    Scenario Outline: Selecting to view results outside the available limit range is not allowed
        Given the wallboard with one agent status component is displayed
        And the user edits the configuration options
        And the user enters '<value>' in the limit results field
        When the user attempts to save the new configuration
        Then the user is informed about the result allowed limits
        Examples:
            | value |
            | 0     |
            | 101   |

    Scenario: The time displayed on the agent status component updates when the time zone option is edited
        Given the wallboard for an agent status component is displayed
        And the user changes the current time zone option
        When the user saves the new configuration
        Then the time displayed updates

    Scenario Outline: The agent status records are filtered based on the time period selected
        Given that a wallboard with a default agent status component is displayed
        And an agent list component is added
        And the user changes the availability status for the first agent displayed on the agent list component
        And the user edits agent status component configured period to '<another>' period
        When the new configuration is saved
        Then the records displayed fit the time period selected
        Examples:
            | another      |
            | rolling-hour |
            | hour         |
            | today        |
            | week         |
            | month        |

    Scenario: No file is generated when there are no events recorded for the interval selected
        Given the wallboard with an agent status component is displayed
        And the user navigates to edit configuration options
        When the user enters dates for an interval export with no events (dates in the past ex. current year - 100)
        Then the user is informed that there are no records

    Scenario: Export results option is unavailable if the interval dates requested are in the future
        Given the wallboard with an agent status component is displayed
        And the user edits configuration options
        When the user enters dates in the future for the interval export (+ 2 months)
        Then the option to export results is unavailable

    #  To Be Manually Tested
    # Scenario Outline: Agent status data can be exported in CSV format
    #     Given that the '<user>' is logged in
    #     And the wallboard with a default agent status component for this month period is displayed
    #     And the user opens the editing options for the component
    #     And the user selects the interval export dates from the first day of the current month to current day
    #     And the user selects the option to export
    #     And the component modal is closed
    #     When the user opens the file generated
    #     Then the data displayed on the component matches the data displayed in the file
    #     Examples:
    #         | user             |
    #         | admin user       |
            # | team leader user |