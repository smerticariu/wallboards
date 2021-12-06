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

    Scenario Outline: Internal calls are displayed on the call status component
        Given that the '<user>' is logged in
        And the user creates a wallboard
        And the user adds an agent list component with all interactivity options enabled
        And the user adds a call status component
        When the user calls the first agent displayed on the agent list component 
        Then the call status component reflects the internal call
        Examples:
            | user             |
            | admin user       |
          # | team leader user |

#  To be manually tested as it needs a 3rd party app to simulate the call
    # Scenario Outline: Inbound ringing calls are displayed on the call status component
    #     Given that the '<user>' is logged in
    #     And the user navigates to wallboard creation page
    #     And the user adds a call status component
    #     When an inbound call is made
    #     Then the call is reflected on the call status component on the ringing calls column (left side)
    #     Examples:
    #         | user             |
    #         | admin user       |
    #         | team leader user |

# To be manually tested as it needs a 3rd party app to simulate the call
    # Scenario Outline: Inbound and Outbound answered calls are displayed on the call status component
    #     Given that the '<user>' is logged in
    #     And the user navigates to create a wallboard
    #     And the user adds a component for call status
    #     And inbound and outbound calls are made
    #     When the agents answer the calls
    #     Then the calls are displayed on the component in the assoicated column
    #     Examples:
    #         | user             |
    #         | admin user       |
    #         | team leader user |

#  To be manually tested as it needs a 3rd party app to simulate the call
    # Scenario Outline: Outbound ringing calls are displayed on the call status component
    #     Given that the '<user>' is logged in
    #     And the user navigates to create a wallboard
    #     And the user adds a component for call status
    #     When the an outbound call occurs
    #     Then the call is reflected on the call status component
    #     Examples:
    #         | user             |
    #         | admin user       |
    #         | team leader user |

#  ???
    # Scenario Outline: Relayed calls are displayed on the call status component
    #     Given that the '<user>' is logged in
    #     And the user creates a wallboard
    #     And the a component for call status is added
    #     When the a call is relayed
    #     Then the call status component reflects the relayed call
    #     Examples:
    #         | user             |
    #         | admin user       |
    #         | team leader user |

 #  ???
    # Scenario Outline: Feature calls are displayed on the call status component
    #     Given that the '<user>' is logged in
    #     And the user creates a wallboard
    #     And a component for call status is added
    #     When the a call is relayed
    #     Then the call status component reflects the relayed call
    #     Examples:
    #         | user             |
    #         | admin user       |
    #         | team leader user |

 #  ???
    # Scenario Outline: Uncategorized calls are displayed on the call status component
    #     Given that the '<user>' is logged in
    #     And the user creates a wallboard
    #     And the component for call status is added
    #     When the an uncategorized call occurs
    #     Then the call status component reflects the uncategorized call
    #     Examples:
    #         | user             |
    #         | admin user       |
    #         | team leader user |