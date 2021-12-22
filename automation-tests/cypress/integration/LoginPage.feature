Feature: Login Page

    Scenario: The sign in button is present on the login page
        Given the wallboards login page is displayed
        When the user inspects the page
        Then the Sign In button is displayed

# TESTED MANUALLY AS CYPRESS DOES NOT SUPPORT NAVIGATION TO OTHER DOMAINS
    # Scenario: The user is redirected to the salesforce login page when requesting to sign in
    #     Given the wallboards login page is displayed
    #     When the user clicks on the Sign In button
    #     And the user selects to Continue with Salesforceprivileged
    #     Then the user is redirected to the salesforce login page

    # Scenario: The user successfully logs in using salesforce credentials
    #     Given the wallboards login page is displayed
    #     And the user clicks on the Sign In button
    #     When the user fills in a valid username
    #     And the user fills in a valid password
    #     And the user clicks on the Log In button
    #     Then the wallboards landing page is displayed


# # //TO BE MANUALLY TESTED
#     Scenario: Login page is responsive for desktop view
#         Given the wallboards login page is displayed on a desktop
#         When the user restores down the window
#         Then all elements are visible and aligned with the page

#     Scenario: Login page is responsive for tablet view in portrait / landscape mode
#         Given the wallboards login page is displayed on a tablet device
#         When the user inspects the page
#         Then all elements are visible and aligned with the page in both portrait and landscape mode