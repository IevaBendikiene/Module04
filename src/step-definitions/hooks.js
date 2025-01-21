const { After } = require("@wdio/cucumber-framework");
const Boards = require("../pageobjects/pages/boards.page");
const LoginPage = require("../pageobjects/pages/login.page");
const ProfilePage = require("../pageobjects/pages/profile.page");

const logout = async () => {
  await ProfilePage.profileIcon.click();
  const logoutButton = await LoginPage.logoutBtn;

  await logoutButton.waitForDisplayed({ timeout: 3000 });
  await logoutButton.click();
  const logoutSubmitButton = await LoginPage.logoutSubmitBtn;
  await logoutSubmitButton.waitForClickable({ timeout: 2000 });
  await logoutSubmitButton.click();
};
After({ name: "logout user", tags: "@logout" }, async () => {
  await logout();
});

After({ name: "removing list", tags: "@removeList" }, async () => {
  const listEditButtons = await Boards.listEditBtn;
  for (let btn of listEditButtons) {
    await btn.click();
    await Boards.archiveListBtn.waitForDisplayed({ timeout: 2000 });
    await Boards.archiveListBtn.click();
  }
});

After({ name: "removing board", tags: "@removeBoard" }, async () => {
  await Boards.boardMenuBtn.waitForDisplayed({ timeout: 2000 });
  await Boards.boardMenuBtn.click();
  await Boards.closeBoardBtn.click();
  await Boards.confirmcloseBoardBtn.click();
  await Boards.deleteBordBtn.click();
  await Boards.confirmDeleteBoardBtn.click();
});
