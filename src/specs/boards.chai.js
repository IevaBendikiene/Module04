const { expect } = require("chai"); // Import Chai
const Boards = require("../pageobjects/pages/boards.page");
const LoginPage = require("../pageobjects/pages/login.page");
const { logout, removeList, removeBoard } = require("../hooks");

const user = process.env.USER;
const password = process.env.PASSWORD;
const title = "Jokes";
const listName = "Family";
const cardName = "Dads";

describe("Check boards page features are working correctly", () => {
  beforeEach(async () => {
    await LoginPage.open(); // Step 1: Open the login page
    await LoginPage.login(user, password); // Step 2: Log in with valid credentials
  });

  afterEach(async () => {
    await logout(); // Perform logout after each test
  });

  it("should login with valid credentials", async () => {
    // Wait for the URL to contain 'boards'
    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl.includes("boards");
      },
      {
        timeout: 20000, // Maximum wait time (in milliseconds)
        timeoutMsg:
          "Expected URL to contain 'boards', but it didn't after 20 seconds.",
      }
    );
    const currentUrl = await browser.getUrl();
    expect(currentUrl).to.include(
      "boards",
      `Expected URL to contain 'boards', but got: ${currentUrl}`
    );
  });
  it("Board should be created", async () => {
    await Boards.createButton.click();
    await Boards.createBoardButton.click();
    await Boards.boardTitleInput.setValue(title);
    await Boards.finalCreateBoardBtn.click();
    const newTitle = title.toLowerCase().replace(/\s+/g, "");
    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl.includes(newTitle);
      },
      {
        timeout: 15000, // Adjust timeout if necessary
        timeoutMsg: `Expected URL to include "${newTitle}", but it didn't after 15 seconds.`,
      }
    );
    const currentUrl = await browser.getUrl();
    expect(currentUrl).to.include(
      newTitle,
      `Expected URL "${currentUrl}" to include "${newTitle}"`
    );
  });
  it("Search for a board", async () => {
    await Boards.searchInput.waitForClickable();
    await Boards.searchInput.click();
    await Boards.searchInput.setValue(title);
    await Boards.viewAllResultsLink.click();
    const searchResults = await Boards.allSearchResults;
    for (const div of searchResults) {
      const span = await div.$(`span=${title}`);
      const exists = await span.isExisting();
      expect(
        exists,
        `Expected <div role="presentation"> to contain a <span> with text ${title}.`
      ).to.be.true;
    }
  });
  it("List should be created", async () => {
    await Boards.open(title);
    await Boards.addListBtn.click();
    await Boards.listTitleInput.setValue(listName);
    await Boards.submitNewListBtn.click();
    const listElement = await Boards.listElement;
    await browser.waitUntil(async () => await listElement.isDisplayed(), {
      timeout: 15000,
      timeoutMsg: `Expected list to be displayed, but it wasn't.`,
    });

    const isDisplayed = await listElement.isDisplayed();
    expect(isDisplayed, `Expected list to be displayed, but it wasn't.`).to.be
      .true;
  });

  it("Should create card in the list", async () => {
    await Boards.open(title);
    const listElement = await Boards.getlistElement(listName);
    await browser.waitUntil(async () => await listElement.isDisplayed(), {
      timeout: 15000,
      timeoutMsg: `Expected list with name "${listName}" to be displayed, but it wasn't.`,
    });

    await Boards.addCardBtn.click();
    await Boards.cardTextareaInput.setValue(cardName);
    await Boards.finalAddCardBtn.click();
    // await browser.pause(2000);
    const card = Boards.getCardLink(cardName);
    const cardIsDisplayed = await card.isDisplayed();
    expect(cardIsDisplayed).to.be.true;
  });
  it("Should filter cards", async () => {
    await Boards.open(title);
    await Boards.getCardLink(cardName).click();
    await Boards.editLabelBtn.click();
    await Boards.greenLabelMarker.click();
    await Boards.closeEditCardBtn.click();
    await Boards.apllyFilterForcards();
    const spanElement = await Boards.trelloCard.$('span[data-color="green"]');
    const isDisplayed = await spanElement.isDisplayed();

    expect(isDisplayed).to.be.true;

    await Boards.clearFilterBtn.click();
    await removeList();
    await removeBoard(title);
  });
});
