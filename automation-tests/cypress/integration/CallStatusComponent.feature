Feature: Monitoring the call status component

    Scenario Outline: Inbound, Outbound, Internal, Relayed, Feature, Uncategorized call categories are displayed on the call status component
        Given the '<user>' is logged in
        And the user navigates to create e new wallboard
        When the user adds a call status component
        Then the call status component displays the following call categories: Inbound, Outbound, Internal, Relayed, Feature, Uncategorized
        Examples:
            | user             |
            | admin user       |
          # | team leader user |

    Scenario: Call status component name does not allow invalid characters
        Given the user is logged in
        And a wallboard with a call status component is displayed
        When the user navigates to edit component name by entering invalid characters
        Then the user is informed that invalid characters are not allowed

    Scenario: Call status component name cannot be empty
        Given that the user is logged in
        And a wallboard with one call status component is displayed
        When the user navigates to edit component name by removing all characters in the name field
        Then the user is informed that component name must be alphanumeric

    Scenario Outline: Call status component can be removed
        Given that the '<user>' is logged in
        And a wallboard with one call status component is displayed
        When the user navigates to remove the component
        Then the component is no longer displayed on the wallboard
        Examples:
            | user             |
            | admin user       |
          # | team leader user |