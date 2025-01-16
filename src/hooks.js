const Boards = require("./pageobjects/pages/boards.page");
const HomePage = require("./pageobjects/pages/home.page")
const LogoutPage = require("./pageobjects/pages/logout.page")

const logout = async () => {
  await HomePage.header.profileIcon.click();
  const logoutButton = await HomePage.memberMenu.logoutBtn;
  await logoutButton.waitForDisplayed({ timeout: 2000 });
  await logoutButton.click();
  
  const logoutSubmitButton = await LogoutPage.logoutForm.logoutSubmitBtn;
  await logoutSubmitButton.waitForClickable({ timeout: 2000 });
  await logoutSubmitButton.click();
};

const removeBoard = async (name) => {
  await Boards.open(name);
  await Boards.header.boardMenuBtn.waitForDisplayed({ timeout: 2000 });
  await Boards.header.boardMenuBtn.click();
  await Boards.boardsMenu.closeBoardBtn.click();
  await Boards.boardsMenu.confirmcloseBoardBtn.click();
  await Boards.boardsMenu.deleteBordBtn.click();
  await Boards.boardsMenu.confirmDeleteBoardBtn.click();
};
module.exports = { logout, removeBoard };

const removeList = async () => {
  // const listEditButtons = await Boards.listEditBtn;
  // for (let btn of listEditButtons) {
  //   await btn.click();
  //   await Boards.archiveListBtn.waitForDisplayed({ timeout: 2000 });
  //   await Boards.archiveListBtn.click();
  // }
};