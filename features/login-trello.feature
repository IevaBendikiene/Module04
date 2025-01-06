Feature: Login to Trello webpage
  As a registered Trello user
  I want to log in

  @logout
  Scenario: Successful login to Trello with valid credentials
    Given the user is on the Trello login page
    When the user logs in with username and password
    Then the user is redirected back to Trello
   
