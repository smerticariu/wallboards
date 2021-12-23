Feature: Monitoring calls through call tracking component

    Scenario Outline: Specific call category metrics are displayed on the call tracking component
        Given that the user logs in
        And the user navigates to wallboard creation page
        When the user adds a call tracking component for the '<category>'
        Then the category specific '<call>' metrics are displayed
        Examples:
            | category   | call                                                                                                                 |
            | outbound   | un-answered calls, answered calls, solid calls, total talk, average talk                                             |
            | inbound    | un-connected calls, connected calls, answered calls, solid calls, total talk, total wait, average talk, average wait |
            | originated | answered calls, solid calls, total talk, average talk                                                                |
            | received   | answered calls, solid calls, total talk, average talk                                                                |
            | service    | answered calls, total talk, average talk                                                                             |

    Scenario Outline: Existing call tracking component can be edited
        Given the '<user>' is logged in
        And the wallboard containing a default call tracking component is displayed
        And the user edits the title, call category and period
        When the user saves the changes
        Then the new edits are displayed on the call tracking component
        Examples:
            | user       |
            | admin user |
          # | team leader user |

    Scenario: Call tracking component name cannot contain invalid characters
        Given the wallboards creation page is displayed
        And the user navigates to add a call tracking component
        When the user attempts to save the component title containing special characters
        Then the user is informed that the title must contain alphanumeric characters

    Scenario: Call tracking component name cannot be empty
        Given the creation page for wallboards is displayed
        And the user opens the add a call tracking component modal
        And the component title is emptied
        When the user attempt to save the component
        Then the user is informed that title must contain alphanumeric characters

    Scenario Outline: Call tracking component can be removed
        Given the '<user>' is logged in
        And the wallboard with a call tracking component is displayed
        When the user selects the option to delete the component
        Then the component is no longer displayed
        Examples:
            | user             |
            | admin user       |
          # | team leader user |

    Scenario: Call tracking component preview updates when editing configuration options
        Given the configuration options for call tracking component is displayed
        And the user edits the component title
        And the user selects another call category
        And the user selects another period
        When the user inspects the preview displayed
        Then the new options selected are displayed in the component preview