const { $, browser } = require("@wdio/globals");
const Page = require("./page");

class BoardsPage extends Page {
  get createButton() {
    return $('//button[@data-testid="header-create-menu-button"]');
  }
  get creatBoardButton() {
    return $('//span[contains(text(), "Create board")]');
  }
  get boardTitleInput() {
    return $('//input[@data-testid="create-board-title-input"]');
  }

  get searchInput() {
    return $('//input[@data-testid="cross-product-search-input-skeleton"]');
  }
  get finalCreatBoardBtn() {
    return $('//button[@data-testid="create-board-submit-button"]');
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
    return $('//a[@title="My Trello board"]');
  }

  get addListBtn() {
    return $('//button[@data-testid="list-composer-button"]');
  }
  get listTitleInput() {
    return $('//textarea[@data-testid="list-name-textarea"]');
  }
  get submitNewListBtn() {
    return $('//button[@data-testid="list-composer-add-list-button"]');
  }
  getListName(name) {
    return $(
      `//h2[@data-testid='list-name' and contains(normalize-space(text()), '${name}')]`
    );
  }

  async openCreatMenu() {
    await this.createButton.click();
  }
  async openCreatBoardDropdown() {
    await this.creatBoardButton.click();
  }
  async setBoardTitle(name) {
    await this.boardTitleInput.setValue(name);
  }
  async creatNewBoard() {
    await this.finalCreatBoardBtn.click();
  }
  async boardIsCreated(title) {
    const newTitle = title.toLowerCase().replace(/\s+/g, "");
    const currentUrl = await browser.getUrl();
    return currentUrl.includes(newTitle);
  }
  async searchIsSet(title) {
    await this.searchInput.setValue(title);
  }
  async openBoard() {
    await this.workspaceNav.click();
    await this.myWorkspaceLink.click();
    await this.myTrelloBoard.click();
  }
  async creatListActiveted() {
    await this.addListBtn.click();
  }
  async enterListName(name) {
    await this.listTitleInput.setValue(name);
    await this.submitNewListBtn.click();
  }

  async checkListIsVisible(name) {
    const listNameElement = this.getListName(name);
    await expect(listNameElement).toBeDisplayed();
  }
}

module.exports = new BoardsPage();
