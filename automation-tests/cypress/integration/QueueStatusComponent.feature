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

    #  SCENARIOS FOR REAL TIME UPDATE - To Be Manually Tested
#     Scenario Outline: Correct number of available agents is displayed on the queue status component when agent switches to / from Available status
#         Given the user navigates to create a new wallboard
#         And a queue status component is added
#         When an agent in the displayed queue '<changes>' status
#         Then the number of available agents displayed on the component updates in real time
#         Examples:
#             | changes                            |
#             | switches to Available              |
#             | switches from Available to another |

#     Scenario Outline: Correct number of logged off agents is displayed on the queue status component when agent switches to / from Logged Off status
#         Given the queue status component is displayed
#         When the agent '<changes>' status
#         Then the number of logged off agents displayed on the component updates in real time
#         Examples:
#             | changes                             |
#             | switches to Logged Off              |
#             | switches from Logged Off to another |

#     Scenario Outline: Correct number of busy agents is displayed on the queue status component when agents are engaged on / end a call
#         Given the queue status component is displayed
#         When an agent '<changes>' status
#         Then the number of busy agents displayed on the component updates in real time
#         Examples:
#             | changes                                         |
#             | switches to Inbound Call                        |
#             | switches to Inbound Non-Queue Call              |
#             | switches to Outbound Call                       |
#             | switches from Inbound Call to another           |
#             | switches from Inbound Non-Queue Call to another |
#             | switches from Outbound Call to another          |

# Scenario Outline: Correct number of wrapped up agents is displayed on the queue status component when agent switches to / from In Wrapup status
#         Given the queue status component is displayed
#         When an agent in the displayed queue '<changes>' status
#         Then the number of wrapped up agents displayed on the component updates in real time
#         Examples:
#             | changes                            |
#             | switches to In Wrapup              |
#             | switches from In Wrapup to another |

#     Scenario: Correct time is displayed for the longest time in queue
#         Given that the queue status component is displayed
#         And all agents in the selected queue are busy
#         And multiple calls are made to this queue
#         When the user inspects the longest time in queue displayed
#         Then the amount of time of the call who has been waiting the longest is displayed

#     Scenario: Correct number of call attempts is displayed for most dialed attempts when all agents are busy
#         Given the queue status component is displayed
#         And all agents in the selected queue are busy
#         And multiple calls are made to this queue
#         When the user inspects the most dialed attempts displayed
#         Then the largest number of times the system has attempted to call the agents in the queue is displayed

#     Scenario: Correct number of call attempts is displayed for most dialed attempts when agents are available
#         Given the queue status component is displayed
#         And at least one agent in the selected queue is available
#         And one call is made to the selected queue
#         When the user inspects the most dialed attempts displayed
#         Then the number of attempts displayed is 1

#     Scenario Outline: Correct number of total calls queueing is displayed when all agents are busy
#         Given the queue status component is displayed
#         And all agents in the selected queue are busy
#         When '<call>' is made to the selected queue
#         Then the correct number of queued calls is displayed
#         Examples:
#             | call    |
#             | one     |
#             | 3 calls |