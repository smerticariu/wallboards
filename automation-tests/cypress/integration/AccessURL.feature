Feature: Generate & Access read-only URL

    Scenario: Admin users can create read-only URLs for wallboards
        Given the edit mode for a wallboard is displayed
        And the settings modal is displayed
        When the user clicks on the option to create a read-only URL
        Then the read-only URL is generated
        And the option to copy the link becomes active

    Scenario: Admin users can disable read-only URLs for wallboards
        Given that the settings modal is displayed
        And an URL has been created
        When the user selects the option to disable the URL
        Then the URL is no longer displayed
        And the option to copy the URL is inactive

    Scenario: Copied URL displays the corresponding wallboard in read-only mode
        Given that the settings modal is displayed
        And an URL is created
        And the user selects the option to copy the URL
        And the user saves the changes
        When the user requests to access the copied URL
        Then the wallboard is displayed in read-only mode

    Scenario: Different read-only URL is generated when initial URL is disabled
        Given that a read-only URL is created
        And the user copies the link
        And the user disables the link
        When the user re-creates the URL
        Then a different read-only URL is generated

#  Team Leader User not implemented yet
    Scenario Outline: Other users cannot view the wallboard in read-only mode when the URL is not saved
        Given that an admin user generated a read-only URL
        And the admin user copies the URL
        And the admin user does not save the URL
        When '<other>' user attempts to access the URL generated
        Then the wallboard is not displayed
        Examples:
            | other     |
            | basic     |
          # | team lead |

#  Team Leader User not implemented yet
    Scenario Outline: Other users can view the wallboard in read-only mode
        Given that a wallboard read-only URL is generated
        When a '<another>' user opens the URL in a browser
        Then the wallboard is displayed in read-only view mode
        Examples:
            | another   |
            | basic     |
          # | team lead |

#  Team Leader User not implemented yet
    Scenario Outline: Other users cannot view the wallboard in read-only mode when the URL is disabled
        Given that a read-only URL previously generated is disabled
        When the '<other>' user accesses the URL
        Then the wallboard is not displayed
        Examples:
            | other     |
            | basic     |
          # | team lead |

#  Team Leader User not implemented yet
    Scenario Outline: User is informed when accessing a read-only URL for deleted wallboard
        Given that an admin user generates a read-only URL
        And the user deletes the wallboard
        When the '<user>' accesses the URL
        Then the user is informed about not being able to view the wallboard
        Examples:
            | user       |
            | admin      |
            | basic user |
          # | team lead  |

#  Team Leader User not implemented yet
    # Scenario: Team leader users can create wallboard read-only URL
    #     Given the team leader creates a read-only URL for a wallboard
    #     And the user copies the URL
    #     And the user saves the changes made
    #     And the user logs out
    #     When a basic user accesses the URL
    #     Then the new wallboard is displayed in read-only mode