Feature: Trello board
Background: 
Given the user is on the Trello login page
And the user logs in with username and password

@logout
Scenario Outline: Create a Board

When the user clicks the create button
And chooses create board option
And provides a <title> for the board
And clicks submit button
Then the new board should be created and displayed in the new <title> workspace

Examples:
   | title|
   | Christmas |

@logout
Scenario Outline: Search for a Board

Given the user is logged in and has boards created
When the user enters a board <title> in the search bar
And presses the View all results link
Then the list of <title> matching boards should be displayed

Examples:
   | title|
   | Christmas |

@logout
Scenario Outline: Create a List

Given the user is on an existing <name> board
When the user clicks on the add a list button
And enters a <title> for the list and clicks add list
Then the new list list should appear on the board

Examples:
   | title| name |
   | ToDo |  Christmas    | 

@logout
Scenario Outline: Create a Card

Given the user is on an existing <name> board
And on existing list <listName> 
When the user clicks the Add a Card button under the list name
And enters a card <title>
Then the new card <title> should appear under the list


Examples:
  | listName | title   | name |
  | ToDo     | NewCard | Christmas |

@removeBoard
@logout
Scenario Outline: Filter Cards
Given the user is on an existing <name> board
When user sets filter on <card> card
When the user applies a filter using a label
Then only the cards matching the filter criteria should be displayed

Examples:
   | name      | card    |
   | Christmas | NewCard |

