Feature: Configuring Agent List Component Type

    Scenario: The agent list component name allows alphanumeric characters
        Given the add component modal is displayed
        When the user fills in a new name containing alphanumeric characters
        And the user saves the component
        Then the new component name is displayed

    Scenario: The agent list component name does not allow invalid characters
        Given the add component modal is displayed
        When the user fills in a new name containing special characters
        And the user saves the component
        Then the user is informed that the component name allows only alphanumeric characters

    Scenario: The agent list component name cannot be empty
        Given the add component modal is displayed
        When the user deletes the component name
        And the user saves the component
        Then the user is informed that the component name cannot be empty

    Scenario: Agents present on the selected queue are displayed when a specific queue is selected
        Given the add component modal is displayed
        When the user selects a given call queue
        And the user adds the component for selected call queue
        Then the agents on the selected call queue are displayed

    Scenario: Selecting the Card view mode displays a preview in card format
        Given the add component modal for Agent List component is displayed
        When the user selects the Card view option
        Then a preview of the card option is displayed

    Scenario: Selected settings are displayed in Card format when Card view is selected
        Given the modal for adding agent list component is displayed
        And the Card view is selected
        When the user saves the new wallboard
        And the user opens the wallboard saved in view mode
        Then the selected settings for the agent list component is displayed in card view mode

    Scenario: Card preview dynamically updates when selecting a specific call queue
        Given the add component modal for agent list is displayed
        And the Card view is selected
        When the user selects a call queue option
        Then the selected call queue option is displayed in the card preview

    Scenario: Selecting the Table view mode displays a preview in table format
        Given the add component modal for Agent List component is displayed
        When the user selects the Table view option
        Then a preview of the table option is displayed as Table

    Scenario: Table preview dynamically updates when selecting a specific call queue
        Given that the add component modal for agent list is displayed
        And the Table view is selected
        When a call queue option is selected
        Then the call queue option selected is displayed in the table preview

    Scenario: Selected settings are displayed in Table format when Table view is selected
        Given the modal for adding an agent list component is displayed
        And the Table view is selected
        When the user saves the wallboard
        And the user opens the wallboard saved in view mode
        Then the selected settings for the agent list component is displayed in table view mode

    Scenario: Correct default configuration options are displayed for Card view Agent List component
        Given the add component modal for agent list is displayed
        When the user inspects the default card configuration
        Then the Card view mode is selected
        And the sort by option selected is Agent Name
        And availability states select all option is enabled
        And the presence states select all option is enabled
        And all interactivity options are checked

    Scenario: Correct default configuration options are displayed for Table view Agent List component
        Given the add component modal for agent list is displayed
        And the table view option is selected
        When the user inspects the default configuration
        Then the following columns to view are selected: Agent Name, Current Availability State, Current Presence State, Time Spent on Current Call
        And the skills to view select all option is enabled and the sort by option selected is Agent Name
        And the availability states select all option is enabled
        And the enabled option for presence states is select all
        And all interactivity options are enabled
    
    Scenario Outline: Agents displayed on the wallboard are sorted alphabetically by agent’s name
        Given the add component modal for agent list is displayed
        And the '<view>' is selected
        And the Agent Name sort option is selected
        And the new wallboard configuration is saved
        When the user opens the wallboard
        Then the agents in the list are displayed alphabetically by name
        Examples:
            | view  |
            | card  |
            | table |

    Scenario Outline: Agents displayed on the wallboard are sorted alphabetically by agent’s availability state
        Given the add a component modal for agent list is displayed
        And the '<view>' is selected
        And the Availability state sort option is selected
        And the new wallboard configuration is saved
        When the user opens the wallboard
        Then the agents in the list are displayed alphabetically by the availability state
        Examples:
            | view  |
            | card  |
            | table |

    Scenario Outline: Agents displayed on the wallboard are sorted by agent’s presence state
        Given the add component modal for agent list is displayed
        And the '<view>' is selected
        And the Presence state sort option is selected
        And the new wallboard configuration is saved
        When the user opens the wallboard
        Then the agents in the list are displayed by the presence state in the following order: Inbound Call, Ringing, In Wrapup, Inbound Non-Queue Call, Outbound Call, Available, Logged Off
        Examples:
            | view  |
            | card  |
            | table |

    Scenario Outline: Agents displayed on the wallboard are sorted by the time spent in current availability state
        Given the add component modal for agent list is displayed
        And the '<view>' is selected
        And the Time spent in current availability state sort option is selected
        And the new wallboard configuration is saved
        When the user opens the wallboard
        Then the first agents in the list are displayed based on the most time in the state
        Examples:
            | view  |
            | card  |
            | table |

    Scenario Outline: Agents with the selected presence state are displayed on the Card view component
        Given the add component modal for agent list is displayed
        And Card view is selected
        And the '<card_presence_state>' presence state option is selected
        When the user adds the card component configured
        Then the agents with the selected presence state are displayed
        Examples:
            | card_presence_state                                                                    |
            | div:nth-child(6) > div.c-modal--add-component__av-state-container > label:nth-child(1) |
            | div:nth-child(6) > div.c-modal--add-component__av-state-container > label:nth-child(2) |
            | div:nth-child(6) > div.c-modal--add-component__av-state-container > label:nth-child(3) |
            | div:nth-child(6) > div.c-modal--add-component__av-state-container > label:nth-child(4) |
            | div:nth-child(6) > div.c-modal--add-component__av-state-container > label:nth-child(5) |
            | div:nth-child(6) > div.c-modal--add-component__av-state-container > label:nth-child(6) |
            | div:nth-child(6) > div.c-modal--add-component__av-state-container > label:nth-child(7) |

    Scenario Outline: Agents with the selected presence state are displayed on the Table view component
        Given the modal to add component is displayed for agent list
        And the Table view option is selected in the modal
        And the '<table_presence_state>' presence state option is enabled
        When the user navigates to add the component configured
        Then the agents with the enabled presence_state are displayed
        Examples:
            | table_presence_state                                                                   |
            | div:nth-child(8) > div.c-modal--add-component__av-state-container > label:nth-child(1) |
            | div:nth-child(8) > div.c-modal--add-component__av-state-container > label:nth-child(2) |
            | div:nth-child(8) > div.c-modal--add-component__av-state-container > label:nth-child(3) |
            | div:nth-child(8) > div.c-modal--add-component__av-state-container > label:nth-child(4) |
            | div:nth-child(8) > div.c-modal--add-component__av-state-container > label:nth-child(5) |
            | div:nth-child(8) > div.c-modal--add-component__av-state-container > label:nth-child(6) |
            | div:nth-child(8) > div.c-modal--add-component__av-state-container > label:nth-child(7) |

    Scenario Outline: Agents with the presence state disabled are not displayed on the Card component
        Given that the add a component modal for agent list is displayed
        And the Card view type is selected
        And the '<card_presence_state>' option is disabled
        When the configured component is added
        Then no agents with the disabled presence state are displayed
        Examples:
            | card_presence_state                                                                    |
            | div:nth-child(6) > div.c-modal--add-component__av-state-container > label:nth-child(1) |
            | div:nth-child(6) > div.c-modal--add-component__av-state-container > label:nth-child(2) |
            | div:nth-child(6) > div.c-modal--add-component__av-state-container > label:nth-child(3) |
            | div:nth-child(6) > div.c-modal--add-component__av-state-container > label:nth-child(4) |
            | div:nth-child(6) > div.c-modal--add-component__av-state-container > label:nth-child(5) |
            | div:nth-child(6) > div.c-modal--add-component__av-state-container > label:nth-child(6) |
            | div:nth-child(6) > div.c-modal--add-component__av-state-container > label:nth-child(7) |
 
    Scenario Outline: Agents with the presence state disabled are not displayed on the Table component
        Given that the modal for adding an agent list component is displayed
        And the Table view type is selected
        And the '<table_presence_state>' option for presence state is disabled
        When the user adds the table configured component
        Then no agents with the disabled presence state are displayed on the table
        Examples:
            | table_presence_state                                                                   |
            | div:nth-child(8) > div.c-modal--add-component__av-state-container > label:nth-child(1) |
            | div:nth-child(8) > div.c-modal--add-component__av-state-container > label:nth-child(2) |
            | div:nth-child(8) > div.c-modal--add-component__av-state-container > label:nth-child(3) |
            | div:nth-child(8) > div.c-modal--add-component__av-state-container > label:nth-child(4) |
            | div:nth-child(8) > div.c-modal--add-component__av-state-container > label:nth-child(5) |
            | div:nth-child(8) > div.c-modal--add-component__av-state-container > label:nth-child(6) |
            | div:nth-child(8) > div.c-modal--add-component__av-state-container > label:nth-child(7) |

    Scenario: Add component table preview dynamically changes to display two columns
        Given the Table view is selected in the add component modal
        And 1 Column option is selected
        When the user selects the 2 Columns option
        Then the table preview is displayed as two columns
 
    Scenario: Add component table preview dynamically changes to display one column
        Given the Table view is selected in the modal to add component
        And 2 Columns option is selected
        When the user selects the 1 Column option
        Then the table preview is displayed as one column

    Scenario: Agents list is displayed as 1 column when 1 Column option is selected
        Given the Table view option with 1 Column is selected in the add component modal
        And the user saves the 1 column table wallboard
        When the user runs the wallboard in view mode
        Then the agents list is displayed under 1 column

    Scenario: Agents list is displayed as 2 columns when 2 Columns option is selected
        Given the Table view option with 2 Columns is selected in the add component modal
        And the user saves the wallboard configured as 2 columns
        When the user opens the wallboard in view mode
        Then the agents list is displayed under 2 columns

    Scenario: All available columns to view are displayed when all columns are selected
        Given the table view option is selected for the agents list add component
        And all columns to view are selected
        And the wallboard with all columns to view is saved
        When the user opens the wallboard in read-only mode
        Then the following columns are displayed: Agent Name, Agent Extension Number, Current Availability State, Current Presence State, Time spent in current availability state, Time spent on current call, List of skills the agent possesses
        #  commented columns: Number of calls offered, Number of calls answered, Number of calls missed, Time spent in current presence state, Time spent on current wrapup

    Scenario: No columns to view are displayed when all columns are disabled
        Given the table view option is selected for ading agent list component
        And all columns to view are disabled
        And the wallboard with no columns to view is saved
        When the user runs the wallboard in view mode
        Then no columns are displayed

    Scenario Outline: The table preview updates when selecting a given column to view
        Given that the table view option is selected
        And all columns to view are disabled
        When the user enables the '<option>' column to view
        Then the selected '<column>' column is displayed in the table preview
        Examples:
            | option                                                                                 | column              |
            | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(1) | Name                |
            | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(2) | Phone Ext           |
            | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(3) | Availability Status |
            | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(4) | Status              |
            # | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(5)  | Calls offered       |
            # | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(6)  | Calls answered      |
            # | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(7)  | Calls missed        |
            # | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(8)  | Time in current     |
            | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(5) | Time In Current A.State   |
            | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(6) | Time on cur. call   |
            # | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(11) | Time on cur. wr.    |
            | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(7) | Skills              |

    Scenario Outline: The table preview updates when deselecting a given column to view
        Given the table view option is selected for the component
        And all columns to view are enabled
        When the user disables the '<option>' column
        Then the column '<column>' is no longer displayed in the table preview
        Examples:
            | option                                                                                 | column              |
            | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(1) | Name                |
            | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(2) | Phone Ext           |
            | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(3) | Availability Status |
            | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(4) | sStatus             |
            # | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(5)  | Calls offered       |
            # | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(6)  | Calls answered      |
            # | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(7)  | Calls missed        |
            # | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(8)  | Time in current     |
            | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(5) | Time In Current A.State   |
            | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(6) | Time on cur. call   |
            # | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(11) | Time on cur. wr.    |
            | div:nth-child(4) > div.c-modal--add-component__av-state-container > label:nth-child(7) | Skills              |

    Scenario Outline: Agents possessing the selected skill to view are displayed on the wallboard
        Given the add component modal for agent list is displayed
        And the Table view option with the skills column is selected
        And '<skill_option>' is selected
        And the wallboard is saved
        When the user opens the wallboard
        Then the agents possessing the selected skill are displayed
        Examples:
            | skill_option                                                        |
            | div.c-modal--add-component__input-section.c-modal--add-component__input-section--skills > div.c-modal--add-component__av-state-container > label:nth-child(1)  |
            | div.c-modal--add-component__input-section.c-modal--add-component__input-section--skills > div.c-modal--add-component__av-state-container > label:nth-child(2)  |
            | div.c-modal--add-component__input-section.c-modal--add-component__input-section--skills > div.c-modal--add-component__av-state-container > label:nth-child(3)  |

    Scenario Outline: Agents possessing only the disabled skill to view are not displayed on the wallboard
        Given the agent list add component modal is displayed
        And the Table view option is selected with the skills column enabled
        And the '<skill_option>' is disabled
        And the user navigates to save the wallboard
        When the user runs the wallboard
        Then none of the one-skill-agents displayed possess the disabled skill
        Examples:
            | skill_option                                                        |
            | div.c-modal--add-component__input-section.c-modal--add-component__input-section--skills > div.c-modal--add-component__av-state-container > label:nth-child(1)  |
            | div.c-modal--add-component__input-section.c-modal--add-component__input-section--skills > div.c-modal--add-component__av-state-container > label:nth-child(2)  |
            | div.c-modal--add-component__input-section.c-modal--add-component__input-section--skills > div.c-modal--add-component__av-state-container > label:nth-child(3)  |

    Scenario: Agent not possessing any of the skills is displayed when select none option is enabled
        Given the add component modal for agent list is displayed
        And the Table view option is selected
        And the skills column is enabled
        And select none skills to view option is enabled
        And the user saves wallboard
        When the user opens the wallboard in view mode
        Then the agent with no skills assigned is displayed

    Scenario Outline: Agents with the selected availability state are displayed on the Card component
        Given that the agent list add component modal is displayed
        And the view Card is selected
        And the '<card_availability>' state is selected
        When the user adds the component on the wallboard
        Then agents with the selected availability state state are displayed
        Examples:
            | card_availability                                                                      |
            | div:nth-child(5) > div.c-modal--add-component__av-state-container > label:nth-child(1) |
            | div:nth-child(5) > div.c-modal--add-component__av-state-container > label:nth-child(2) |
            | div:nth-child(5) > div.c-modal--add-component__av-state-container > label:nth-child(3) |

    Scenario Outline: Agents with the selected availability state are displayed on the Table component
        Given the agent list to add component modal is displayed
        And the view Table is selected
        And the '<table_availability>' availability state is selected
        When the user adds the component on the wallboard configured
        Then agents with the selected availability state state are displayed on the table
        Examples:
            | table_availability                                                                     |
            | div:nth-child(7) > div.c-modal--add-component__av-state-container > label:nth-child(1) |
            | div:nth-child(7) > div.c-modal--add-component__av-state-container > label:nth-child(2) |
            | div:nth-child(7) > div.c-modal--add-component__av-state-container > label:nth-child(3) |

    Scenario Outline: Agents with the availability state disabled on the wallboard are not displayed on Card component
        Given the add agent list component modal is displayed
        And the view type Card is selected
        And the '<card_availability>' state option is disabled
        When the component is added on the wallboard
        Then no agents with the disabled availability state are displayed on the card
        Examples:
            | card_availability                                                                      |
            | div:nth-child(5) > div.c-modal--add-component__av-state-container > label:nth-child(1) |
            | div:nth-child(5) > div.c-modal--add-component__av-state-container > label:nth-child(2) |
            | div:nth-child(5) > div.c-modal--add-component__av-state-container > label:nth-child(3) |

    Scenario Outline: Agents with the availability state disabled on the wallboard are not displayed on Table component
        Given the add agent list component modal is displayed
        And the view type Table is selected
        And the '<table_availability>' state is disabled
        When the component is added on the wallboard
        Then no agents with the disabled availability state are displayed on the table
        Examples:
            | table_availability                                                                     |
            | div:nth-child(7) > div.c-modal--add-component__av-state-container > label:nth-child(1) |
            | div:nth-child(7) > div.c-modal--add-component__av-state-container > label:nth-child(2) |
            | div:nth-child(7) > div.c-modal--add-component__av-state-container > label:nth-child(3) |