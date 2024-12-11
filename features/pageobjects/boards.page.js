const { $, browser } = require("@wdio/globals");
const Page = require("./page");

class BoardsPage extends Page {
  get createButton() {
    return $('//button[@data-testid="header-create-menu-button"]');
  }
  get creatBoardButton(){
    return $('//span[contains(text(), "Create board")]')
  }
  get boardTitleInput (){
    return $('//input[@data-testid="create-board-title-input"]')
  }
  // get visibilityOptions () {
  //   return $('//div[@data-testid="create-board-select-visibility"]')
  // }
  get finalCreatBoardBtn(){
    return $('//button[@data-testid="create-board-submit-button"]')
  }

  async openCreatMenu (){
    await this.createButton.click()
  }
  async openCreatBoardDropdown (){
    await this. creatBoardButton.click()
  }
  async setBoardTitle (name) {
    await this.boardTitleInput.setValue(name)
  }
  async creatNewBoard() {
    await this.finalCreatBoardBtn.click()
  }
  async boardIsCreated(title) {
    const newTitle = title.toLowerCase().replace(/\s+/g, '')
    const currentUrl = await browser.getUrl()
    return currentUrl.includes(newTitle)
  }
}

module.exports = new BoardsPage();
