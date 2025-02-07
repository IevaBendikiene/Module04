const { Given, When} = require('@wdio/cucumber-framework');

const Boards = require('../../pageobjects/pages/boards.page');
const HomePage = require('../../pageobjects/pages/home.page');

Given(/^the user is logged in and has boards created$/, async () => {
  const currentUrl = await browser.getUrl();
  assert(
    currentUrl.includes('trello.com'),
    `Expected to be redirected back to Trello, but was on: ${currentUrl}`,
  );
});
// Scenario: Create a Board
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

// Scenario: Search for a Board
When(/^the user enters a board (.*) in the search bar$/, async (title) => {
  await HomePage.header.searchInput.waitForClickable(2000);
  await HomePage.header.searchInput.click();
  await HomePage.header.searchInput.setValue(title);
});
When(/^presses the View all results link$/, async () => {
  await HomePage.header.viewAllResultsLink.click();
});

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

// Scenario Create Card
// When(/^the user is on a (.*) board$/, async (name) => {
//   await Boards.open(name);
// });
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

// Scenario:Filter Cards
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

module.exports = {};
