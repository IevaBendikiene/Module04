const { expect } = require('chai'); // Import Chai
const Boards = require('../pageobjects/pages/boards.page');
const LoginPage = require('../pageobjects/pages/login.page');
const HomePage = require('../pageobjects/pages/home.page');
const SearchPage = require('../pageobjects/pages/search.page');
const { logout, removeBoard } = require('../hooks');

const user = process.env.USER;
const password = process.env.PASSWORD;
const title = 'Jokes';
const listName = 'Family';
const cardName = 'Dads';

describe('Check boards page features are working correctly', () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login(user, password);
  });

  afterEach(async () => {
    await logout();
  });

  it('should login with valid credentials', async () => {
    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl.includes('boards');
      },
      {
        timeout: 20000, // Maximum wait time (in milliseconds)
        timeoutMsg:
          "Expected URL to contain 'boards', but it didn't after 20 seconds.",
      },
    );
    const currentUrl = await browser.getUrl();
    expect(currentUrl).to.include(
      'boards',
      `Expected URL to contain 'boards', but got: ${currentUrl}`,
    );
  });
  it('Board should be created', async () => {
    await HomePage.header.createButton.click();
    await HomePage.header.createBoardButton.click();
    await HomePage.createBoard.boardTitleInput.setValue(title);
    await HomePage.createBoard.finalCreateBoardBtn.click();
    const newTitle = title.toLowerCase().replace(/\s+/g, '');
    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl.includes(newTitle);
      },
      {
        timeout: 10000,
        timeoutMsg: `Expected URL to include "${newTitle}", but it did not change in time`,
      },
    );
    const currentUrl = await browser.getUrl();
    expect(currentUrl).to.include(
      newTitle,
      `Expected URL "${currentUrl}" to include "${newTitle}"`,
    );
  });
  it('Search for a board', async () => {
    await HomePage.header.searchInput.waitForClickable();
    await HomePage.header.searchInput.click();

    await HomePage.header.searchInput.setValue(title);
    await HomePage.header.viewAllResultsLink.click();
    const searchResults = await SearchPage.searchCanvas.allSearchResults;
    for (const div of searchResults) {
      const span = await div.$(`span=${title}`);
      const exists = await span.isExisting();
      expect(
        exists,
        `Expected <div role="presentation"> to contain a <span> with text ${title}.`,
      ).to.be.true;
    }
  });
  it('List should be created', async () => {
    await Boards.open(title);
    await Boards.listComposer.addListBtn.click();
    await Boards.listComposer.listTitleInput.setValue(listName);
    await Boards.listComposer.submitNewListBtn.click();
    const listElement = await Boards.list.listElement;
    await browser.waitUntil(async () => await listElement.isDisplayed(), {
      timeout: 15000,
      timeoutMsg: `Expected list to be displayed, but it wasn't.`,
    });

    const isDisplayed = await listElement.isDisplayed();
    expect(isDisplayed, `Expected list to be displayed, but it wasn't.`).to.be
      .true;
  });

  it('Should create card in the list', async () => {
    await Boards.open(title);
    const listElement = await Boards.list.getlistElement(listName);
    await browser.waitUntil(async () => await listElement.isDisplayed(), {
      timeout: 15000,
      timeoutMsg: `Expected list with name "${listName}" to be displayed, but it wasn't.`,
    });

    await Boards.list.addCardBtn.click();
    await Boards.list.cardTextareaInput.setValue(cardName);
    await Boards.list.finalAddCardBtn.click();
    const card = Boards.list.getCardLink(cardName);
    const cardIsDisplayed = await card.isDisplayed();
    expect(cardIsDisplayed).to.be.true;
  });
  it('Should filter cards', async () => {
    await Boards.open(title);
    await Boards.list.getCardLink(cardName).click();
    await Boards.editCardModal.editLabelBtn.click();
    await Boards.editCardModal.greenLabelMarker.click();
    await Boards.editCardModal.closeEditCardBtn.click();
    await Boards.header.filterBtn.click();
    await Boards.filterPopover.greenCheckboxEl.click();

    const spanElement = await Boards.list.trelloCard.$(
      '//span[@data-color="green"]',
    );
    const isDisplayed = await spanElement.isDisplayed();

    expect(isDisplayed).to.be.true;

    await Boards.header.clearFilterBtn.click();
    await removeBoard(title);
  });
});
