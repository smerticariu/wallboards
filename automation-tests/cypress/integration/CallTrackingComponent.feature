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
   
    #  simulated un-answered outbound calls made before the test is executed
    Scenario: Call tracking metrics update when changing the time zone selected
        Given the wallboard with a default outbound call tracking component is displayed
        And the user edits the time zone by selecting the first option in the time zone drop down
        When the user saves the edits
        Then the metrics displayed update

    #  For Manual Testing
    # Pre-requisites: Have calls made this week (at least one call per day), today (but not current hour), current hour, current rolling hour
    # Scenario Outline: Call tracking metrics update when changing the period
    #     Given a wallboard with a call tracking component is displayed
    #     And the user changes the period to '<selected>' period from the component configuration options
    #     When the edids are saved
    #     Then the component displays updated metrics
    #     Examples:
    #         | selected     |
    #         | This Hour    |
    #         | Today        |
    #         | This Week    |
    #         | Rolling Hour |

    #  OUTBOUND Call --------------------------------------------------------------
#     Scenario: Outbound un-answered call is reflected on the call tracking component
#         Given the call tracking component for outbound calls is displayed
#         When a call is made to the selected queue
#         And the call is not answered
#         Then the call is displayed in the un-answered calls category

#     Scenario: Outbound answered call is reflected on the call tracking component
#         Given the call tracking component for outbound calls is displayed
#         And a call is made to the selected queue
#         When the call is answered
#         Then the call is displayed in the answered calls category

#     Scenario: Outbound solid call is reflected on the call tracking component
#         Given the call tracking component for outbound calls is displayed
#         When a solid call is made to the selected queue
#         Then the call is displayed in the solid calls category

#     Scenario: Outbound total and average talk time is reflected on the call tracking component
#         Given the call tracking component for outbound calls is displayed
#         And multiple calls are in progress
#         When the calls end
#         Then the total talk and average talk time are displayed

#     #  INBOUND Call --------------------------------------------------------------
#     Scenario: Inbound un-connected call is reflected on the call tracking component
#         Given the call tracking component for inbound calls is displayed
#         When a call is made to the selected queue
#         And the call is un-connected
#         Then the call is displayed in the un-connected calls category

#     Scenario: Inbound connected call is reflected on the call tracking component
#         Given the call tracking component for inbound calls is displayed
#         When a connected call is made to the selected queue
#         Then the call is displayed in the connected calls category

#     Scenario: Inbound answered call is reflected on the call tracking component
#         Given the call tracking component for inbound calls is displayed
#         And a call is made to the selected queue
#         When the call is answered
#         Then the call is displayed in the answered calls category

#     Scenario: Inbound solid call is reflected on the call tracking component
#         Given the call tracking component for inbound calls is displayed
#         When a solid call is made to the selected queue
#         Then the call is displayed in the solid calls category

#     Scenario: Inbound total talk and average talk time is reflected on the call tracking component
#         Given the call tracking component for inbound calls is displayed
#         And multiple calls are in progress
#         When the calls end
#         Then the total talk and average talk time is displayed

#     Scenario: Inbound total wait and average wait time is reflected on the call tracking component
#         Given the call tracking component for inbound calls is displayed
#         And all agents in the selected queue are busy
#         When multiple calls are made to the selected queue
#         Then the total wait and average wait time is displayed

#     #  ORIGINATED INTERNAL Call --------------------------------------------------------------
#     Scenario: Answered originated internal call is reflected on the call tracking component
#         Given the call tracking component for originated internal calls is displayed
#         And an internal originated call is made
#         When the call is answered
#         Then the call is displayed in the answered calls category

#     Scenario: Solid originated internal call is reflected on the call tracking component
#         Given the call tracking component for originated internal calls is displayed
#         When a solid call is made
#         Then the call is displayed in the solid calls category

#     Scenario: Originated internal calls total talk and average talk time is reflected on the call tracking component
#         Given the call tracking component for originated internal calls is displayed
#         And multiple originated internal calls are in progress
#         When the calls end
#         Then the total talk and average talk time is displayed

#   #  RECEIVED INTERNAL Call --------------------------------------------------------------
#       Scenario: Answered received internal call is reflected on the call tracking component
#         Given the call tracking component for received internal calls is displayed
#         And an received internal call is made
#         When the call is answered
#         Then the call is displayed in the answered calls category

#     Scenario: Solid received internal call is reflected on the call tracking component
#         Given the call tracking component for received internal calls is displayed
#         When a solid call is made
#         Then the call is displayed in the solid calls category

#     Scenario: Received internal calls total talk and average talk time is reflected on the call tracking component
#         Given the call tracking component for received internal calls is displayed
#         And multiple received internal calls are in progress
#         When the calls end
#         Then the total talk and average talk time is displayed

#     #  SERVICE Call --------------------------------------------------------------
#     Scenario: Answered service call is reflected on the call tracking component
#         Given the call tracking component for service calls is displayed
#         And an servicde call is made
#         When the call is answered
#         Then the call is displayed in the answered calls category

#     Scenario: Service calls total talk and average talk time is reflected on the call tracking component
#         Given the call tracking component for service calls is displayed
#         And multiple service calls are in progress
#         When the calls end
#         Then the total talk and average talk time is displayed