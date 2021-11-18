Feature: Landing Page Filter / Search / Sort Wallboards

    # FILTER SCENARIOS - left sidebar

    # Scenario: All available wallboards filters and wallboard groups filters are displayed
    #     Given the landing page is displayed
    #     When the user inspects the filter options for wallboards
    #     And the user inspects the filter options for wallboard groups
    #     Then the following options are displayed for wallboards: Most recent, Created by me, Private Wallboards, All Wallboards
    #     And the following options are displayed for wallboard groups: All wallboard groups, Created by me, Shared with me

    # Scenario: The most recent 10 wallboard items are displayed when selecting “Most Recent” filter for wallboards
    #     Given the landing page is displayed
    #     When the user selects the “Most Recent” filter for wallboards
    #     Then the most recent 10 wallboard items are displayed on the wallboards table

    # Scenario: The wallboard items created by the logged in user are displayed when selecting “Created by me” filter for wallboards
    #     Given the landing page is displayed
    #     When the user selects the “Created by me” filter for wallboards
    #     Then the wallboard items created by the logged in user are displayed on the wallboards table

    # Private wallboards not implemented yet
    # Scenario: Private wallboard items are displayed when selecting “Private Wallboards” filter for wallboards
    #     Given the landing page is displayed
    #     When the user selects the “Private Wallboards” filter for wallboards
    #     Then the private wallboard items are displayed on the wallboards table

    # Scenario: All wallboard items are displayed when selecting “All wallboards” filter for wallboards
    #     Given the landing page is displayed
    #     When the user selects the “All Wallboards” filter for wallboards
    #     Then all wallboard items are displayed on the wallboards table

#     Wallboard Groups not implemented yet
#     Scenario: All wallboard groups items are displayed when selecting “All wallboard groups” filter for wallboard groups
#         Given the landing page is displayed
#         When the user selects the “All Wallboard Groups” filter for wallboard groups
#         Then all wallboard groups items are displayed on the wallboards table

    # Wallboard Groups not implemented yet
    # Scenario: The wallboard groups items created by the logged in user are displayed when selecting “Created by me” filter for wallboard groups
    #     Given the landing page is displayed
    #     When the user selects the “Created by me” filter for wallboard groups
    #     Then the wallboard groups items created by the logged in user are displayed on the wallboards table

    # Wallboard Groups not implemented yet
    # Scenario: The wallboard groups items shared with the logged in user are displayed when selecting “Shared with me” filter for wallboard groups
    #     Given the landing page is displayed
    #     When the user selects the “Shared with me” filter for wallboard groups
    #     Then the wallboard groups items shared with the logged in user are displayed on the wallboards table

    Scenario: Default filter on the landing page is most recently viewed wallboards
        Given the wallboards table landing page is displayed
        And the user selects to view the 5th wallboard
        When the user navigates to the landing page
        Then the recently viewed wallboard is displayed in the first row
  
    Scenario: Most recently viewed wallboard is displayed first when recently edited
        Given the landing page wallboards table is displayed
        And the user edits the 5th wallboard
        And the user saves the changes
        When the user navigates to the landing page
        Then the wallboard recently edited is displayed as first

# SEARCH SCENARIOS
    Scenario: Performing a search by wallboard name displays the results matching search criteria
        Given the landing page is displayed
        # And the <filter option> filter is selected
        When the user fills in the desired search criteria in the search field
        Then the results matching the search criteria are displayed

        # Examples:
        # | filter option |
        # | Most Recent |
        # | Created By Me |
        # | Private Wallboards |
        # | All Wallboards |
        # | All Wallboard Groups |
        # | Created By Me |
        # | Shared With Me |

    Scenario: Performing a search by person name displays the results matching search criteria
        Given the landing page is displayed
        # And the <filter option> is selected
        When the user fills in the desired person name search criteria in the search field
        Then the results matching the person name are displayed

        # Examples: 
        # | filter option |
        # | Most Recent |
        # | Created By Me |
        # | Private Wallboards |
        # | All Wallboards |
        # | All Wallboard Groups |
        # | Created By Me |
        # | Shared With Me |

    Scenario: The components start filtering from the very first letter that the user inputs
        Given the landing page is displayed
        # And the <filter option> is selected
        When the user fills in the first character of the search keyword
        Then the results matching the first character of the searched keyword

        # Examples:
        # | filter option |
        # | Most Recent |
        # | Created By Me |
        # | Private Wallboards |
        # | All Wallboards |
        # | All Wallboard Groups |
        # | Created By Me |
        # | Shared With Me |

    Scenario: The user is informed when there are no wallboards found for the search criteria
        Given the landing page is displayed
        When the user fills in a given search criteria
        Then the user is informed that no wallboards are found
        
    Scenario: The user is informed there are no wallboards found when searching by creation date
        Given the landing page is displayed
        When the user fills an existing creation date in the search field
        Then the user is informed that no wallboards are found

# SORT SCENARIOS

    Scenario: The wallboards can be sorted by wallboard name
        Given the landing page is displayed
        When the user sorts the wallboards by name
        Then the wallboards are displayed in alphabetical order by name

    Scenario: The wallboards can be sorted by creation date
        Given the landing page is displayed
        When the user sorts the wallboards by creation date
        Then the wallboards are displayed in chronological order by creation date

    Scenario: The wallboards can be sorted by the user name
        Given the landing page is displayed
        When the user sorts the wallboards by the user who created the wallboard
        Then the wallboards are displayed alphabetically by the user name