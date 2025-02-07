Feature: user profile

@logout
Scenario: Edit User Profile
Given the user is on the Trello login page
And the user logs in with username and password
When the user clicks profile icon
And the user clicks the profile link button
When user is navigated to profile page
And the user changes their profile name
Then the updated information should be saved and displayed in the profile
