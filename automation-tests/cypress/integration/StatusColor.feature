Feature: Availability and presence statuses associated background colors

 Scenario Outline: Correct corresponding colors displayed for the presence states on Card view mode
        Given that the wallboard creation page is displayed
        And the user adds a card view component with all presence states enabled
        When the user selects the add button
        Then each '<presence_state>' has a corresponding '<color>'
        Examples:
            | color              | presence_state         |
            | rgb(248, 72, 94)   | Inbound call           |
            | rgb(180, 69, 141)  | Ringing                |
            | rgb(100, 204, 201) | In wrapup              |
            | rgb (255, 199, 46) | Inbound non-queue call |
            | rgb(221, 131, 64)  | Outbound call          |
            | rgb(184, 198, 42)  | Available              |
            | rgb(191, 191, 191) | Logged Off             |


    Scenario Outline: Correct corresponding colors displayed for the presence states on Table view mode
        Given the creation wallboard page is displayed
        And the user adds a table view component with all presence states enabled
        When the user adds the configured component
        Then each '<presence_state>' has a '<column_color>' corresponding
        Examples:
            | column_color       | presence_state         |
            | rgb(248, 72, 94)   | Inbound call           |
            | rgb(180, 69, 141)  | Ringing                |
            | rgb(100, 204, 201) | In wrapup              |
            | rgb (255, 199, 46) | Inbound non-queue call |
            | rgb(221, 131, 64)  | Outbound call          |
            | rgb(184, 198, 42)  | Available              |
            | rgb(191, 191, 191) | Logged Off             |


    Scenario Outline: Correct corresponding colors displayed for the availability states on Card view mode
        Given that the page for wallboard creation is displayed
        And the user adds a card view component with all availability states enabled
        And all presence states option is enabled
        When the user adds the component configured
        Then each '<presence_state>' has a corresponding color '<availability_color>'
        Examples:
            | availability_color | presence_state         |
            | rgb(73, 83, 92)    | Inbound call           |
            | rgb(248, 72, 94)   | Ringing                |
            | rgb(194, 210, 16)  | In wrapup              |
            | rgb(248, 72, 94)   | Inbound non-queue call |
            | rgb(235, 12, 40)   | Outbound call          |
            | rgb(194, 210, 16)  | Available              |
            | rgb(204, 204, 204) | Logged Off             |

 
    Scenario Outline: Correct corresponding colors displayed for the availability states on Table view mode
        Given the page for wallboard creation is displayed
        And the user adds a table view component with all availability states enabled
        And the option for all presence states is enabled
        When the user selects the add button for the component
        Then each '<presence_state>' has a corresponding availability status '<colour>'
        Examples:
            | colour             | presence_state         |
            | rgb(73, 83, 92)    | Inbound call           |
            | rgb(248, 72, 94)   | Ringing                |
            | rgb(194, 210, 16)  | In wrapup              |
            | rgb(248, 72, 94)   | Inbound non-queue call |
            | rgb(235, 12, 40)   | Outbound call          |
            | rgb(194, 210, 16)  | Available              |
            | rgb(204, 204, 204) | Logged Off             |