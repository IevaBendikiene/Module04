const { Given, When, Then } = require("@wdio/cucumber-framework");
const LoginPage = require("../pageobjects/pages/login.page");
const Boards = require("../pageobjects/pages/boards.page");
const assert = require("assert");
const user = process.env.USER;
const password = process.env.PASSWORD;

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
  await Boards.searchInput.waitForClickable(2000);
  await Boards.searchInput.click();
  await Boards.searchInput.setValue(title);
});
When(/^presses the View all results link$/, async () => {
  await Boards.viewAllResultsLink.click();
});
Then(
  /^the list of (.*) matching boards should be displayed$/,
  async (title) => {
    const searchResults = await Boards.allSearchResults;
    for (const div of searchResults) {
      const span = await div.$(`span=${title}`);
      const exists = await span.isExisting();
      assert.strictEqual(
        exists,
        true,
        `Expected <div role="presentation"> to contain a <span> with text ${title}.`
      );
    }
  }
);

// Scenario Create a List

Given(/^the user is on an existing (.*) board$/, async (name) => {
  await Boards.open(name);
});

When("the user clicks on the add a list button", async () => {
  await Boards.addListBtn.click();
});

When(/^enters a (.*) for the list and clicks add list$/, async (title) => {
  await Boards.listTitleInput.setValue(title);
  await Boards.submitNewListBtn.click();
});

Then(/^the new list (.*) should appear on the board$/, async (title) => {
  // await browser.pause(60000)
  const listElement = await Boards.listElement;
  await browser.waitUntil(async () => await listElement.isDisplayed(), {
    timeout: 15000,
    timeoutMsg: `Expected list to be displayed, but it wasn't.`,
  });
  const isDisplayed = await listElement.isDisplayed();
  assert.strictEqual(
    isDisplayed,
    true,
    `Expected list  to be displayed, but it wasn't.`
  );
});

// Scenario Create Card

When(/^the user is on a (.*) board$/, async (name) => {
  await browser.pause(3000);
  await Boards.open(name);
});
When(/^on existing list (.*)$/, async (listName) => {
  const listElement = await Boards.getlistElement(listName);
  await browser.waitUntil(async () => await listElement.isDisplayed(), {
    timeout: 15000,
    timeoutMsg: `Expected list to be displayed, but it wasn't.`,
  });
});
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
  await Boards.getCardLink(title).waitForDisplayed({
    timeout: 5000,
    timeoutMsg: "Expected the card label to be displayed, but it wasn't.",
  });
  await Boards.getCardLink(title).click();
  await Boards.editLabelBtn.waitForDisplayed({
    timeout: 5000,
    timeoutMsg:
      "Expected the edit label button to be displayed, but it wasn't.",
  });
  await Boards.editLabelBtn.click();
  await Boards.greenLabelMarker.click();
  await Boards.closeEditCardBtn.click();
});
// Scenario:Filter Cards
Given(/^the user is on a (.*) board with multiple cards$/, async (title) => {
  await Boards.open(title);
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
