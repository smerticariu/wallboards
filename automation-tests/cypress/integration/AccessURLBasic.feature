Feature: Access read-only URL for wallboards and groups - Basic & Team Leader Users
#  Team Leader user not implemented yet

#  WALLBOARDS Read-Only URL

    Scenario Outline: Other users can view the wallboard in read-only mode
        Given that '<other>' user is logged in
        When the user opens the saved URL in a browser
        Then the wallboard is displayed in read-only view mode
        Examples:
            | other |
            | basic |
          # | team lead |

    Scenario Outline: Other users cannot view the wallboard in read-only mode when the URL is not saved
        Given '<other>' user is logged in
        When the user attempts to access the unsaved URL
        Then the wallboard is not displayed
        Examples:
            | other     |
            | basic     |
          # | team lead |

    Scenario Outline: Other users cannot view the wallboard in read-only mode when the URL is disabled
        Given that '<other>' user is logged in
        When the user attempts to access the disabled URL
        Then the wallboard is not displayed
        Examples:
            | other     |
            | basic     |
          # | team lead |

    Scenario Outline: User is informed when accessing a read-only URL for deleted wallboard
        Given that the '<user>' logs in
        When the user accesses the URL for a deleted wallboard
        Then the user is informed about not being able to view the wallboard
        Examples:
            | user       |
            | basic user |
          # | team lead  |

#  GROUPS Read-Only URL
    Scenario Outline: Other users can view the group in read-only mode
        Given that the '<user>' logs in
        When the user accesses the read-only URL for a saved group
        Then the group is displayed in read-only view mode
        Examples:
            | user       |
            | basic user |
          # | team lead user |

    Scenario Outline: Wallboard group cannot be opened in read-only mode when the URL is disabled
        Given that the '<user>' logs in
        When the user accesses a disabled read-only URL for a saved group
        Then the user is informed that access is denied
        Examples:
            | user       |
            | basic user |
          # | team lead user |

    Scenario Outline: Wallboard group cannot be opened in read-only mode when shared URL is not saved
        Given that the '<user>' logs in
        When the user attempts to access an unsaved read-only URL
        Then the user is informed that access is denied
        Examples:
            | user       |
            | basic user |
          # | team lead user |

    Scenario Outline: The user is informed when accessing a read-only URL for deleted group
        Given that the '<user>' is logging in
        When the user accesses a read-only URL for a deleted group
        Then no wallboard is displayed
        Examples:
            | user       |
            | admin user |
            | basic user |
          # | team lead user |