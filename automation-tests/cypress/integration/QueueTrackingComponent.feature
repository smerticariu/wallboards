Feature: Monitor selected queue parameters

    Scenario: The queue tracking modal preview dynamically updates when associated configuration options are changed
        Given the user is logged in
        And the wallboard creation page is displayed
        And the user navigates to add a new queue tracking component
        When the user changes the default component configuration options (change name, queue call, show columns one at a time)
        Then the preview updates to reflect the selected option

    Scenario: Queue tracking component name does not allow invalid characters
        Given that the user is logged in
        And a wallboard with a queue tracking component is created
        When the user navigates to edit component name by entering invalid characters
        Then the user is informed that invalid characters are not allowed

    Scenario: Queue tracking component name cannot be empty
        Given that the user is logged in
        And a wallboard with one queue tracking component is already created
        When the user navigates to edit component name by removing all characters in the name field
        Then the user is informed that component name cannot be empty

    Scenario Outline: Existing queue tracking component configuration can be edited
        Given the '<user>' is logged in
        And the user creates a wallboard with a default queue tracking component
        And the user navigates to edit component configuration options (name, queue, show columns) + verify modal title should be *Edit Component*
        When the user saves the changes made
        Then the new configuration is displayed on the wallboard component
        Examples:
            | user       |
            | admin user |
          # | team leader user |

    #  Have at least one call made in the selected queue
    Scenario: Queue tracking component metrics update when changing the configured time zone
        Given the wallboard for a queue tracking component is displayed
        And the user navigates to edit the time zone option
        When the change is saved
        Then the data displayed on the component updates reflecting the new time zone

    #  Have multiple calls made in the selected queue within the last week, today, this rolling hour, this hour
    Scenario Outline: Queue tracking component metrics update when changing the configured period
        Given the wallboard for a queue tracking component is displayed
        And the user navigates to change the period to '<option>' option
        When the change is saved
        Then the data displayed on the component updates reflecting the new period selected
        Examples:
            | option       |
            | hour         |
            | today        |
            | week         |
            | rolling-hour |

    #  Have multiple calls made in the selected queue during last week, at least one call per day
    Scenario Outline: Queue tracking component metrics update when changing this week start day
        Given the wallboard for a default this week queue tracking component is displayed
        And the user navigates to change the start of week to '<day>'
        When the change is saved
        Then the data displayed on the component updates
        Examples:
            | day |
            | 0   |
            | 1   |
            | 2   |
            | 3   |
            | 4   |
            | 5   |
            | 6   |

    Scenario: Only selected columns to view are displayed on the queue tracking component
        Given that the wallboard with a queue tracking component is created
        And the user opens the component configuration options
        And the user disables the last 5 columns options to view
        When the changes are saved
        Then the first 5 selected columns are displayed
        And the last 5 columns are no longer displayed on the component

    Scenario Outline: Queue tracking component can be removed
        Given the '<user>' logs in
        And a wallboard with a queue tracking component is displayed
        When the user requests to have the component removed
        Then the component is no longer displayed on the wallboard
        Examples:
            | user       |
            | admin user |
          # | team leader user |

    Scenario Outline: Queue tracking component can be removed
        Given the '<user>' logs in
        And a wallboard with a queue tracking component is displayed
        When the user requests to have the component removed
        Then the component is no longer displayed on the wallboard
        Examples:
            | user       |
            | admin user |
          # | team leader user |

#  Need multiple abandoned calls made to the selected queue during this week, today, this hour, rolling hour
    Scenario Outline: Abandoned calls panel does not turn red when SLA breaks and associated configuration option is disabled
        Given a wallboard with a default queue tracking component is created
        And the user selects period to '<option>'
        And the abandoned call SLA option is disabled
        And the user sets the abandoned call SLA to 1%
        When the user saves the changes made
        Then the abandoned calls associated panel in the queue tracking component does not turn red
        Examples:
            | option       |
            | hour         |
            | today        |
            | week         |
            | rolling-hour |

#  Need multiple abandoned calls made to the selected queue during this week, today, this hour, rolling hour
    Scenario Outline: Abandoned calls panel turns red when SLA breaks and associated configuration option is enabled
        Given a wallboard with a default queue tracking component is created
        And the user selects period to '<option>'
        And the abandoned call SLA option is enabled
        And the user sets the abandoned call SLA to 1%
        When the user saves the changes made
        Then the abandoned calls associated panel in the queue tracking component turns red
        Examples:
            | option       |
            | hour         |
            | today        |
            | week         |
            | rolling-hour |

#  To be manually tested
    # Scenario: Average wait time panel does not turn red when set threshold is reached and associated option is disabled
    #     Given a wallboard with a default queue tracking component is created
    #     And the average wait time is set to 10 sec
    #     And the average wait option is disabled
    #     And the change is saved
    #     When the average wait time exceeds the set threshold
    #     Then the average wait panel does not turn red

    # Scenario: Average wait time panel turns red when set threshold is reached and associated option is enabled
    #     Given a wallboard with a default queue tracking component is created
    #     And the average wait time is set to 10 sec
    #     And the average wait option is enabled
    #     And the change is saved
    #     When the average wait time exceeds the set threshold
    #     Then the average wait panel turns red

    # Scenario: Average wait time panel turns back to the original color when average wait value is below the set threshold
    #     Given a wallboard with a default queue tracking component is disaplyed
    #     And the average wait panel is red
    #     When calls waiting in queue are answered
    #     Then the average wait panel turns back to the original color

    # Scenario Outline: Abandoned calls panel turns back to the original color when SLA value is below the threshold
    #     Given a wallboard with a queue tracking component is created
    #     And the abandoned calls panel is red due to SLA being broken
    #     And a new calls are made
    #     When the calls are answered
    #     Then the abandoned calls associated panel turns back to the original color