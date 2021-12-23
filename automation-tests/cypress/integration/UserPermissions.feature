Feature: Login User Permissions

#  BASIC Permissions
    Scenario: Basic user does not have access to the landing page
        Given an admin user generates a read-only URL for a saved wallboard
        And the basic user accesses the URL
        When the basic user attempts to navigate to the wallboards landing page
        Then the user is informed that access is denied

    Scenario Outline: Basic and team leader users cannot edit a wallboard created by an admin user
        Given an admin user creates a wallboard
        And the URL for the wallboard edit mode is copied
        When the '<user>' attempts to access the URL
        Then the user is informed that access is denied for editing
        Examples:
            | user             |
            | basic user       |
          # | team leader user |


#  TEAM LEADER Permissions
    # Scenario: Team leader user can access the wallboards app on salesforce
    # Given the team leader user logs in
    # When the user navigates the view the available apps
    # Then the wallboards app is displayed in the available apps

    # Scenario: Team leader users can create wallboards
    #     Given the team leader user is logged in
    #     And the user navigates to wallboard creation page
    #     And the user adds a new component
    #     When the user saves the wallboard
    #     Then the wallboard is displayed on the landing page

    # Scenario: Team leader users can view the wallboards created by them
    #     Given the team leader created a wallboard
    #     And the user navigates to the landing page
    #     When the user navigates to view the wallboard created
    #     Then the wallboard is displayed in read-only mode

    # Scenario: Team leader users can not view wallboards created by other users on the landing page
    #     Given the team leader user logs in
    #     When the user inspects all wallboards authors
    #     Then all wallboards displayed are created by the currently logged in user

    # Scenario: Team leader users can edit the wallboards created by them
    #     Given a wallboard created by a team leader user exists
    #     And the user navigates to edit the wallboard from landing page
    #     When the user changes the wallboard details
    #     And the user saves the changes made
    #     Then the new details are displayed for the wallboard on the landing page

    # Scenario: Team leader users can delete the wallboards created by them
    #     Given the team leader creates a wallboard
    #     When the user navigates to delete the wallboard
    #     Then the the wallboard is deleted  // no longer displayed

    # Scenario: Team leader users can copy wallboards created by them
    #     Given the team leader created a new wallboard
    #     And the user navigates to the home page
    #     When the user copies the wallboard
    #     Then the a new copy wallboard is created