const { Then } = require('@wdio/cucumber-framework');
const SearchPage = require('../../pageobjects/pages/search.page');
const Boards = require('../../pageobjects/pages/boards.page');

const assert = require('assert');
Then(
  /^the new board should be created and displayed in the new (.*) workspace$/,
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

Then(/^the new card (.*) should appear under the list$/, async (title) => {
  const cardElement = await Boards.list.getCardLink(title);
  const isDisplayed = await cardElement.isDisplayed();
  assert.strictEqual(
    isDisplayed,
    true,
    `Expected card with name ${title} to be displayed, but it wasn't.`,
  );
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

module.exports = {};
