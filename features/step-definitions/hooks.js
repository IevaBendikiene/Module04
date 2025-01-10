const { After } = require("@wdio/cucumber-framework");
const Boards = require("../../src/pageobjects/pages/boards.page");
const LoginPage = require("../../src/pageobjects/pages/login.page");
const ProfilePage = require("../../src/pageobjects/pages/profile.page");

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
  await logout()
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
  const title = this.parameters?.title || "Default";
  const createdCards = await Boards.getCreatedCards(title);
  for (let card of createdCards) {
    await card.click();
    await Boards.boardMenuBtn.click();
    await Boards.closeBoardBtn.click();
    await Boards.confirmcloseBoardBtn.click();
  }
});

