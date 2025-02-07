const { Given, When, Then } = require('@wdio/cucumber-framework');
const LoginPage = require('../pageobjects/pages/login.page');
const Boards = require('../pageobjects/pages/boards.page');
const HomePage = require('../pageobjects/pages/home.page');
const SearchPage = require('../pageobjects/pages/search.page');
const assert = require('assert');
const user = process.env.USER;
const password = process.env.PASSWORD;

// Scenario: Create a Board
Given(/^the user is logged in and on the main page$/, async () => {
  await LoginPage.open();
  await LoginPage.login(user, password);
  const currentUrl = await browser.getUrl();
  assert(
    currentUrl.includes('trello.com'),
    `Expected to be redirected back to Trello, but was on: ${currentUrl}`,
  );
});

When('the user clicks the create button', async () => {
  await HomePage.header.createButton.click();
});

When('chooses create board option', async () => {
  await HomePage.header.createBoardButton.click();
});

When(/^provides a (.*) for the board$/, async (title) => {
  await HomePage.createBoard.boardTitleInput.setValue(title);
});

When(/^clicks submit button$/, async () => {
  await HomePage.createBoard.finalCreateBoardBtn.click();
});
Then(/^the new board should be created and displayed in the new (.*) workspace$/,
  async (title) => {
    const newTitle = title.toLowerCase().replace(/\s+/g, '');
    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl.includes(newTitle);
      },
      {
        timeout: 15000, // Wait up to 10 seconds
        timeoutMsg: `Expected URL to include "${newTitle}", but it didn't change in time.`,
      },
    );

    const currentUrl = await browser.getUrl();
    assert(
      currentUrl.includes(newTitle),
      `Expected URL "${currentUrl}" to include "${newTitle}"`,
    );
  },
);

// Scenario: Search for a Board

Given(/^the user is logged in and has boards created$/, async () => {
  const currentUrl = await browser.getUrl();
  assert(
    currentUrl.includes('trello.com'),
    `Expected to be redirected back to Trello, but was on: ${currentUrl}`,
  );
});

When(/^the user enters a board (.*) in the search bar$/, async (title) => {
  await HomePage.header.searchInput.waitForClickable(2000);
  await HomePage.header.searchInput.click();
  await HomePage.header.searchInput.setValue(title);
});
When(/^presses the View all results link$/, async () => {
  await HomePage.header.viewAllResultsLink.click();
});
Then(
  /^the list of (.*) matching boards should be displayed$/,
  async (title) => {
    const searchResults = await SearchPage.searchCanvas.allSearchResults;
    for (const div of searchResults) {
      const span = await div.$(`span=${title}`);
      const exists = await span.isExisting();
      assert.strictEqual(
        exists,
        true,
        `Expected <div role="presentation"> to contain a <span> with text ${title}.`,
      );
    }
  },
);

// Scenario Create a List

Given(/^the user is on an existing (.*) board$/, async (name) => {
  await Boards.open(name);
});

When('the user clicks on the add a list button', async () => {
  await Boards.listComposer.addListBtn.click();
});

When(/^enters a (.*) for the list and clicks add list$/, async (title) => {
  await Boards.listComposer.listTitleInput.setValue(title);
  await Boards.listComposer.submitNewListBtn.click();
});

Then(/^the new list list should appear on the board$/, async () => {
  const listElement = await Boards.list.listElement;
  await browser.waitUntil(async () => await listElement.isDisplayed(), {
    timeout: 15000,
    timeoutMsg: `Expected list to be displayed, but it wasn't.`,
  });
  const isDisplayed = await listElement.isDisplayed();
  assert.strictEqual(
    isDisplayed,
    true,
    `Expected list  to be displayed, but it wasn't.`,
  );
});

// Scenario Create Card

When(/^the user is on a (.*) board$/, async (name) => {
  await Boards.open(name);
});
When(/^on existing list (.*)$/, async (listName) => {
  const listElement = await Boards.list.getlistElement(listName);
  await browser.waitUntil(async () => await listElement.isDisplayed(), {
    timeout: 15000,
    timeoutMsg: `Expected list to be displayed, but it wasn't.`,
  });
});
When(
  /^the user clicks the Add a Card button under the list name$/,
  async () => {
    await Boards.list.addCardBtn.click();
  },
);
When(/^enters a card (.*)$/, async (title) => {
  await Boards.list.cardTextareaInput.setValue(title);
  await Boards.list.finalAddCardBtn.click();
});
Then(/^the new card (.*) should appear under the list$/, async (title) => {
  const cardElement = await Boards.list.getCardLink(title);
  const isDisplayed = await cardElement.isDisplayed();
  assert.strictEqual(
    isDisplayed,
    true,
    `Expected card with name ${title} to be displayed, but it wasn't.`,
  );
});

// Scenario:Filter Cards
Given(/^the user is on a (.*) board with multiple cards$/, async (title) => {
  await Boards.open(title);
});
When(/^user sets filter on (.*) card$/, async (card) => {
  await Boards.list.getCardLink(card).waitForDisplayed({
    timeout: 5000,
    timeoutMsg: "Expected the card label to be displayed, but it wasn't.",
  });
  await Boards.list.getCardLink(card).click();
  await Boards.editCardModal.editLabelBtn.waitForDisplayed({
    timeout: 5000,
    timeoutMsg:
      "Expected the edit label button to be displayed, but it wasn't.",
  });
  await Boards.editCardModal.editLabelBtn.click();
  await Boards.editCardModal.greenLabelMarker.click();
  await Boards.editCardModal.closeLabelPopoverBtn.click();
  await Boards.editCardModal.closeEditCardBtn.click();
});
When(/^the user applies a filter using a label$/, async () => {
  await Boards.header.filterBtn.click();
  await Boards.filterPopover.greenCheckboxEl.click();
  await Boards.filterPopover.closePopoverBtn.click();
});
Then(
  /^only the cards matching the filter criteria should be displayed$/,
  async () => {
    const spanElement = Boards.list.trelloCard.$('span[data-color="green"]');
    const isDisplayed = await spanElement.isDisplayed();
    assert.strictEqual(
      isDisplayed,
      true,
      'Expected a <span> with data-color="green" to be visible within the card element.',
    );
  },
);
