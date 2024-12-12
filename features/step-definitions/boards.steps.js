const { Given, When, Then } = require("@wdio/cucumber-framework");
const LoginPage = require("../pageobjects/login.page");
const Boards = require("../pageobjects/boards.page")
const assert = require("assert");
const user = "strawberry0816@gmail.com"
const password = "demo123!"


// Scenario: Create a Board
Given(/^the user is logged in and on the main page$/, async () => {
  await LoginPage.open();
  await LoginPage.login(user, password );
    const currentUrl = await browser.getUrl();
  assert(
    currentUrl.includes("trello.com"),
    `Expected to be redirected back to Trello, but was on: ${currentUrl}`
  );
})
Given(/^the user is logged in and has boards created$/, async () => {
  const currentUrl = await browser.getUrl();
  assert(
    currentUrl.includes("trello.com"),
    `Expected to be redirected back to Trello, but was on: ${currentUrl}`
  );
})
When('the user clicks the creat button', async () => {
  await Boards.openCreatMenu()
})

When('chooses create board option', async () => {
 await Boards.openCreatBoardDropdown()
})

When(/^provides a (.*) for the board$/, async(title) => {
  await Boards.setBoardTitle(title)
})

When(/^clicks submit button$/, async() => {
  await Boards.creatNewBoard()
})
Then(/^the new board should be created and displayed in the new (.*) workspace$/, async(title) => {
   await Boards.boardIsCreated(title)
  
})

// Scenario: Search for a Board

When(/^the user enters a board (.*) in the search bar$/, async (title) => {
  await Boards.searchIsSet(title)
})

Given('the user is on an existing board', async() => {
  await Boards.openBoard()
})

When('the user clicks on the add a list button', async () => {
  await Boards.creatListActiveted()
})

When(/^enters a (.*) for the list and clicks add list$/, async(title) => {
  await Boards.enterListName(title)
  // Write code here that turns the phrase above into concrete actions
})




