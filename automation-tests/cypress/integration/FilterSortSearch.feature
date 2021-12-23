Feature: Landing Page Filter / Search / Sort Wallboards and Groups

    # FILTER - WALLBOARDS 
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

    # FILTER - GROUPS 
    Scenario: Most recently viewed group is displayed first when recently opened
        Given all groups landing page is displayed
        And the user opens to view the 3rd group
        When the user navigates to the groups landing page
        Then the group recently opened is displayed as first

    Scenario: Most recently viewed group is displayed first when recently edited
        Given the groups landing page is displayed
        And the user edits the 3rd group
        And the user saves the group changes
        When the user navigates to the groups landing page
        Then the group recently edited is displayed first

# SEARCH SCENARIOS - WALLBOARDS
    Scenario: Performing a search by wallboard name displays the results matching search criteria
        Given the landing page is displayed
        When the user fills in the desired search criteria in the search field
        Then the results matching the search criteria are displayed

    Scenario: Performing a search by person name displays the results matching search criteria
        Given the landing page is displayed
        When the user fills in the desired person name search criteria in the search field
        Then the results matching the person name are displayed

    Scenario: The components start filtering from the very first letter that the user inputs
        Given the landing page is displayed
        When the user fills in the first character of the search keyword
        Then the results matching the first character of the searched keyword

    Scenario: The user is informed when there are no wallboards found for the search criteria
        Given the landing page is displayed
        When the user fills in a given search criteria
        Then the user is informed that no wallboards are found
        
    Scenario: The user is informed there are no wallboards found when searching by creation date
        Given the landing page is displayed
        When the user fills an existing creation date in the search field
        Then the user is informed that no wallboards are found

# SEARCH SCENARIOS - GROUPS

    Scenario: Performing a search by group name displays the results matching search criteria
        Given the landing page is displayed
        And the user navigates to view all wallboard groups
        When the user types in the desired search criteria in the search field
        Then the results matching the search criteria are displayed

    Scenario: Performing a search by author name displays the results matching search criteria
        Given that the landing page is displayed
        And the user navigates to view all groups
        When the user fills in the desired author name in the search field
        Then the results matching the author name are displayed

    Scenario: The user is informed there are no groups found when searching by creation date
        Given the landing page is displayed
        And the user navigates to view all groups
        When the user types an existing creation date in the search field
        Then the user is informed that no wallboard groups are found

# SORT SCENARIOS - WALLBOARDS
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

# SORT SCENARIOS - GROUPS
     Scenario: The wallboard groups can be sorted by group name
        Given the landing page is displayed
        And the user navigates to view all groups
        When the user sorts the groups by name
        Then the groups are displayed in alphabetical order by name

    Scenario: The wallboard groups can be sorted by creation date
        Given the landing page is displayed
        And the user navigates to view all groups
        When the user sorts the groups by creation date
        Then the groups are displayed in chronological order by creation date

    Scenario: The wallboard groups can be sorted by the author name
        Given the landing page is displayed
        And the user navigates to view all groups
        When the user sorts the groups by author name
        Then the groups are displayed alphabetically by the author name