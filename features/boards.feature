Feature: Trello board

Scenario: Create a Board

Given the user is logged in and on the main page
When the user clicks the create button
And chooses create board option
And provides a <title> for the board
And clicks submit button
Then the new board should be created and displayed in the new <title> workspace

Examples:
   | title|
   | Christmas |

Scenario: Search for a Board

Given the user is logged in and has boards created
When the user enters a board <title> in the search bar
And presses the View all results link
Then the list of <title> matching boards should be displayed

Examples:
   | title|
   | Christmas |



Scenario: Create a List
Given the user is on an existing board
When the user clicks on the add a list button
And enters a <title> for the list and clicks add list
Then the new list <title> list should appear on the board

Examples:
   | title|
   | ToDo |

Scenario: Create a Card
Given the user is on an existing list <listName> within a board
When the user clicks the Add a Card button under the list name
And enters a card <title>
Then the new card <title> should appear under the list
And set filter on <title> card

Examples:
  | listName | title  |
  | ToDo | NewCard |

Scenario: Filter Cards
Given the user is on a board with multiple cards
When the user applies a filter using a label
Then only the cards matching the filter criteria should be displayed