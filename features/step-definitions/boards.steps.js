const { Given, When, Then } = require("@wdio/cucumber-framework");
const LoginPage = require("../pageobjects/login.page");
const Boards = require("../pageobjects/boards.page");
const assert = require("assert");
const user = "strawberry0816@gmail.com";
const password = "demo123!";

// Scenario: Create a Board
Given(/^the user is logged in and on the main page$/, async () => {
  await LoginPage.open();
  await LoginPage.login(user, password);
  const currentUrl = await browser.getUrl();
  assert(
    currentUrl.includes("trello.com"),
    `Expected to be redirected back to Trello, but was on: ${currentUrl}`
  );
});

When("the user clicks the create button", async () => {
  await Boards.createButton.click();
});

When("chooses create board option", async () => {
  await Boards.createBoardButton.click();
});

When(/^provides a (.*) for the board$/, async (title) => {
  await Boards.boardTitleInput.setValue(title);
});

When(/^clicks submit button$/, async () => {
  await Boards.finalCreateBoardBtn.click();
});
Then(
  /^the new board should be created and displayed in the new (.*) workspace$/,
  async (title) => {
    const newTitle = title.toLowerCase().replace(/\s+/g, "");
    await browser.pause(10000);
    const currentUrl = await browser.getUrl();
    assert(
      currentUrl.includes(newTitle),
      `Expected URL "${currentUrl}" to include "${newTitle}"`
    );
  }
);

// Scenario: Search for a Board

Given(/^the user is logged in and has boards created$/, async () => {
  const currentUrl = await browser.getUrl();
  assert(
    currentUrl.includes("trello.com"),
    `Expected to be redirected back to Trello, but was on: ${currentUrl}`
  );
});

When(/^the user enters a board (.*) in the search bar$/, async (title) => {
  await Boards.searchInput.click();
  await Boards.searchInput.setValue(title);
});
When(/^presses the View all results link$/, async () => {
  await Boards.viewAllResultsLink.click();
});
Then(/^the list of (.*) matching boards should be displayed$/, async (title) => {
  const searchResults = await Boards.allSearchResults
  for (const div of searchResults) {
    const span = await div.$(`span=${title}`); 
    const exists = await span.isExisting();
    assert.strictEqual(
      exists,
      true,
      `Expected <div role="presentation"> to contain a <span> with text ${title}.`
    );
  }
})

// Scenario Create a List

Given("the user is on an existing board", async () => {
  await Boards.workspaceNav.click();
  await Boards.myWorkspaceLink.click();
  await Boards.myTrelloBoard.click();
});

When("the user clicks on the add a list button", async () => {
  await Boards.addListBtn.click();
});

When(/^enters a (.*) for the list and clicks add list$/, async (title) => {
  await Boards.listTitleInput.setValue(title);
  await Boards.submitNewListBtn.click();
});

Then(/^the new list (.*) should appear on the board$/, async (title) => {
  const listElement = await Boards.getlistElement(title);
  // await browser.waitUntil(async () => await listElement.isDisplayed(), {
  //     timeout: 15000,
  //     timeoutMsg: `Expected list with name ${title} to be displayed, but it wasn't.`,
  // });
  // const isDisplayed = await listElement.isDisplayed();
  // assert.strictEqual(isDisplayed, true, `Expected list with name ${title} to be displayed, but it wasn't.`);
});

// Scenario Create Card

Given(
  /^the user is on an existing list (.*) within a board$/,
  async (listName) => {
    await Boards.getlistElement(listName).click();
  }
);
When(
  /^the user clicks the Add a Card button under the list name$/,
  async () => {
    await Boards.addCardBtn.click();
  }
);
When(/^enters a card (.*)$/, async (title) => {
  await Boards.cardTextareaInput.setValue(title);
  await Boards.finalAddCardBtn.click();
});
Then(/^the new card (.*) should appear under the list$/, async (title) => {
  const cardElement = await Boards.getCardLink(title);
  const isDisplayed = await cardElement.isDisplayed();
  assert.strictEqual(
    isDisplayed,
    true,
    `Expected card with name ${title} to be displayed, but it wasn't.`
  );
});
When(/^set filter on (.*) card$/, async (title) => {
  await Boards.getCardLink(title).click();
  await Boards.editLabelBtn.click();
  await Boards.greenLabelMarker.click();
  await Boards.closeEditCardBtn.click();
});
// Scenario:Filter Cards
Given(/^the user is on a board with multiple cards$/, async () => {
  const currentUrl = await browser.getUrl();
  assert(
    currentUrl.includes("my-trello-board"),
    `Expected to be on My Trello board, but was on: ${currentUrl}`
  );
});
When(/^the user applies a filter using a label$/, async () => {
  await Boards.apllyFilterForcards();
});

Then(
  /^only the cards matching the filter criteria should be displayed$/,
  async () => {
    const spanElement = Boards.trelloCard.$('span[data-color="green"]');
    const isDisplayed = await spanElement.isDisplayed();
    assert.strictEqual(
      isDisplayed,
      true,
      'Expected a <span> with data-color="green" to be visible within the card element.'
    );
  }
);
