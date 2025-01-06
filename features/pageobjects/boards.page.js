const { $, $$ } = require("@wdio/globals");
const Page = require("./page");

class BoardsPage extends Page {

  get createButton() {
    return $('//button[@data-testid="header-create-menu-button"]');
  }
  get createBoardButton() {
    return $('//button[@data-testid="header-create-board-button"]');
  }
  get boardTitleInput() {
    return $('//input[@data-testid="create-board-title-input"]');
  }
  get finalCreateBoardBtn() {
    return $('//button[@data-testid="create-board-submit-button"]');
  }
  get searchInput() {
    return $('//input[contains(@placeholder, "Search")]');
  }
  get viewAllResultsLink() {
    return $('//*[text()="View all results"]');
  }
  get allSearchResults() {
    return $$('//a[@data-testid="advanced-search-board-result-item"]');
  }
  get boardsLink() {
    return $('//span[@data-testid="BoardIcon"]');
  }
  get workspaceNav() {
    return $('//button[@data-testid="workspace-switcher"]');
  }
  get myWorkspaceLink() {
    return $('//a[@data-testid="workspace-switcher-popover-tile"]');
  }
  get myTrelloBoard() {
    return $('//a[@title="My Trello Board"]');
  }
  get addListBtn() {
    return $('//button[@data-testid="list-composer-button"]');
  }
  get listTitleInput() {
    return $(
      '//textarea[@data-testid="list-name-textarea" and @aria-label="Enter list name…"]'
    );
  }
  get submitNewListBtn() {
    return $('//button[@data-testid="list-composer-add-list-button"]');
  }
  get listElement() {
    return $('div[data-testid="list"]');
  }
  getlistElement(name) {
    return $(
      `//li[@data-testid="list-wrapper" and .//h2[@data-testid="list-name" and contains(text(), "${name}")]]`
    );
  }
  get addCardBtn() {
    return $('//button[@data-testid="list-add-card-button"]');
  }
  get cardTextareaInput() {
    return $('//textarea[@data-testid="list-card-composer-textarea"]');
  }
  get finalAddCardBtn() {
    return $('//button[@data-testid="list-card-composer-add-card-button"]');
  }

  getCardLink(name) {
    return $(`//a[@data-testid="card-name" and text()="${name}"]`);
  }
  get editLabelBtn() {
    return $('//button[@data-testid="card-back-labels-button"]');
  }

  get greenLabelMarker() {
    return $('//span[@data-color="green" and @data-testid="card-label"]');
  }
  get closeEditCardBtn() {
    return $('//span[@data-testid="CloseIcon"]');
  }
  get filterBtn() {
    return $('//button[@data-testid="filter-popover-button"]');
  }
  get filterPopover() {
    return $('//section[header[h2[@title="Filter"]]]');
  }
  get checkboxEl() {
    return $(
      '//label[@data-testid="clickable-checkbox" and .//span[@data-color="green" and @data-testid="card-label"]]'
    );
  }
  get trelloCard() {
    return $('//div[@data-testid="trello-card"]');
  }
  // get cardWithGreenLabel() {
  //   return $(
  //     '//div[@data-testid="trello-card" and .//span[@data-color="green"]]'
  //   );
  // }
  get listEditBtn() {
    return $$('//button[@data-testid="list-edit-menu-button"]');
  }

  get archiveListBtn() {
    return $('//button[@data-testid="list-actions-archive-list-button"]');
  }
  getCreatedCards(name) {
    return $$(`//a[@title="${name}"]`);
  }
  get boardMenuBtn() {
    return $('//button[@aria-label="Show menu"]');
  }
  get closeBoardBtn() {
    return $('//div[text()="Close board"]');
  }
  get confirmcloseBoardBtn() {
    return $('//button[@data-testid="popover-close-board-confirm"]');
  }
  async apllyFilterForcards() {
    await this.filterBtn.click();
    const popover = this.filterPopover;
    // await expect(popover).toBeDisplayed()
    await this.checkboxEl.click();
  }
  async open() {
   
    await this.workspaceNav.waitForClickable({ timeout: 5000 });
    await this.workspaceNav.click();
    await this.myWorkspaceLink.waitForClickable({ timeout: 5000 });
    await this.myWorkspaceLink.click();
    await this.myTrelloBoard.waitForClickable({ timeout: 5000 });
    await this.myTrelloBoard.click();
  }
}

module.exports = new BoardsPage();
