Feature: Login to Trello with Google Account
  As a registered Trello user
  I want to log in

  Scenario: Successful login to Trello with valid credentials
    Given the user is on the Trello login page
    When the user logs in with <username> and <password>
    Then the user is redirected back to Trello
   

    Examples:
    | username                 | password |
    | strawberry0816@gmail.com | demo123! |