Feature: Saving wallboard changes
    
    Scenario Outline: Closing a new wallboard edit mode redirects the user to the landing page
        Given the edit mode for a new wallboard is displayed
        And no changes are done
        When the user '<closes>' the wallboard edit mode
        Then the user is redirected to the landing page
        Examples:
            |   closes   |
            | div.c-toolbar-right > button:nth-child(4)   |
            | div.c-banner > div.c-banner-logo |

    Scenario Outline: Closing an existing wallboard edit mode redirects the user to the landing page
        Given a wallboard containing at least one component exists
        And the edit mode for the wallboard is displayed
        And no changes are performed
        When the user navigates to "<close>" the edit mode view
        Then the user gets redirected to the landing page
        Examples:
            |   close   |
            | div.c-toolbar-right > button:nth-child(4) |
            | div.c-banner > div.c-banner-logo |

    Scenario Outline: User gets notified when closing wallboard edit mode and wallboard name edits are not saved
        Given the wallboard edit mode is displayed
        And the user edits the wallboard name
        When the user selects "<to close>" the edit mode for the wallboard
        Then a notification is displayed informing the user that there are unsaved changes
        Examples:
            |  to close   |
            | div.c-toolbar-right > button:nth-child(4)   |
            | div.c-banner > div.c-banner-logo |
    
    Scenario Outline: User gets notified when closing wallboard edit mode and wallboard component options edits are not saved
        Given the edit mode for a wallboard is displayed
        And the user creates a new wallboard component
        And the user edits the wallboard component options
        When the user <navigates to close> the edit mode for the wallboard
        Then a notification is displayed informing the user there are unsaved changes
        Examples:
            |            navigates to close                 |
            |   "div.c-toolbar-right > button:nth-child(4)" |
            |       "div.c-banner > div.c-banner-logo"      |

    Scenario Outline: User gets notified when closing wallboard edit mode and adding a new component is not saved
        Given the edit mode is displayed
        And the adds a new component
        When the user <closes the edit mode>
        Then a notification is displayed informing that there are unsaved changes
        Examples:
            | closes the edit mode |
            |   "div.c-toolbar-right > button:nth-child(4)" |
            |       "div.c-banner > div.c-banner-logo"      |

    Scenario Outline: User gets notified when closing wallboard edit mode and removing an existing component is not saved
        Given that the edit mode is displayed
        And the user add a new component and save it
        And the user removes an existing component
        When the user <closes the wallboard> edit mode
        Then a notification is displayed informing there are unsaved changes
        Examples:
            | closes the wallboard |
            |   "div.c-toolbar-right > button:nth-child(4)" |
            |       "div.c-banner > div.c-banner-logo"     |

    Scenario Outline: User gets notified when closing wallboard edit mode and component position changes is not saved
        Given that the wallboard edit mode is displayed
        And the user changes component position on the grid
        When the user selects to <close the wallboard>
        Then a notification is displayed that informs the user there are unsaved changes
        Examples:
            | close the wallboard |
            |   "div.c-toolbar-right > button:nth-child(4)" |
            |       "div.c-banner > div.c-banner-logo"      |

    Scenario: Selecting Save & Close option in the notification redirects the user to the landing page
        Given the unsaved changes notification is displayed
        When the user selects the option to Save & Close
        Then the changes are saved
        And the user is redirected to the landing page

    Scenario: Selecting Discard option in the notification redirects the user to the landing page
        Given the notification for unsaved changes is displayed
        When the user selects the option to Discard
        Then the user gets redirected to the landing page

    Scenario: User remains on the edit page when selecting Cancel option in the notification
        Given that the notification for unsaved changes is displayed
        When the user selects the option to Cancel
        Then the user remains on the edit page
