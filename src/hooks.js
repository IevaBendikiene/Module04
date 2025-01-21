// const { After } = require("@wdio/cucumber-framework");
const Boards = require("./pageobjects/pages/boards.page");
const LoginPage = require("./pageobjects/pages/login.page");
const ProfilePage = require("./pageobjects/pages/profile.page");
const { browser } = require("@wdio/globals");

const logout = async () => {
  await ProfilePage.profileIcon.click();
  const logoutButton = await LoginPage.logoutBtn;

  await logoutButton.waitForDisplayed({ timeout: 5000 });
  await logoutButton.click();
  // await browser.pause(1000);//use waitUntil
  const logoutSubmitButton = await LoginPage.logoutSubmitBtn;
  await logoutSubmitButton.waitForClickable({ timeout: 5000 });
  await logoutSubmitButton.click();
};
const removeList = async () => {
  const listEditButtons = await Boards.listEditBtn;
  for (let btn of listEditButtons) {
    await btn.click();
    await Boards.archiveListBtn.waitForDisplayed({ timeout: 2000 });
    await Boards.archiveListBtn.click();
  }
};
const removeBoard = async (name) => {
  await Boards.open(name);
  await Boards.boardMenuBtn.waitForDisplayed({ timeout: 2000 });
  await Boards.boardMenuBtn.click();
  await Boards.closeBoardBtn.click();
  await Boards.confirmcloseBoardBtn.click();
  await Boards.deleteBordBtn.click();
  await Boards.confirmDeleteBoardBtn.click();
};
module.exports = { logout, removeList, removeBoard };

// After({ name: "removing list", tags: "@removeList" }, async () => {
// await removeList()
// });

// After({ name: "removing board", tags: "@removeBoard" }, async () => {
//   await removeBoard()
//   }
// });

// After({ name: "logout user", tags: "@logout" }, async () => {
//   await logout()
// });
