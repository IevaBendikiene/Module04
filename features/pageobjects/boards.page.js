const { $, browser, expect } = require("@wdio/globals");
const Page = require("./page");

class BoardsPage extends Page {

  get createButton() {
    return $('//button[@data-testid="header-create-menu-button"]');
  }
  get creatBoardButton() {
    return $('//button[@data-testid="header-create-board-button"]');
  }
  get boardTitleInput() {
    return $('//input[@data-testid="create-board-title-input"]');
  }
  get finalCreatBoardBtn() {
    return $('//button[@data-testid="create-board-submit-button"]');
  }
   get searchInput() {
    return $('//input[@data-test-id="search-dialog-input"]');
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
  get listElement(){
    return $('//li[@data-testid="list-wrapper"]')
  }
  get addCardBtn(){
    return $('//button[@data-testid="list-add-card-button"]')
  }
  get cardTextareaInput(){
    return $('//textarea[@data-testid="list-card-composer-textarea"]')
  }
  get finalAddCardBtn(){
    return $('//button[@data-testid="list-card-composer-add-card-button"]')
  }
  get cardLink(){
    return $('//a[@data-testid="card-name"]')
  }
  get filterBtn(){
  return $('//button[@data-testid="filter-popover-button"]')
  }
  get filterPopover(){
    return $('//section[header[h2[@title="Filter"]]]')
  }
  get checkboxEl(){
    return $('//label[@data-testid="clickable-checkbox"]')
  }
  get matchedCardsText(){
    return $('//p[contains(text(), "cards match filters")]')
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
    const searchEl = this.searchInput
    await searchEl.waitForDisplayed({timeout: 10000, timeoutMsg: "Search input not found"})
    await searchEl.click() 
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
  async checkListWasCreated() {
    const listElement = this.listElement;
    await expect(listElement).toBeDisplayed()
  }
  async activateAddCard(){
    await this.addCardBtn.click()
  }
  async setCardValue(name){
    await this.cardTextareaInput.setValue(name)
    await this.finalAddCardBtn.click()
  }
  async checkCardIsCreated(){
    const card= this.cardLink
    await expect(card).toBeDisplayed()
  }
  async apllyFilterForcards(){
    await this.filterBtn.click()
    const popover = this.filterPopover
    await expect(popover).toBeDisplayed()
    await this.checkboxEl.click()
  }
  async filteredCards(){
    const filterMatches =  this.matchedCardsText
    await expect(filterMatches).toBeDisplayed()
  }
}

module.exports = new BoardsPage();
