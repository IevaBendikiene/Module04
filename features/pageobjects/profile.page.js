const { $ } = require("@wdio/globals");
const Page = require("./page");

class ProfilePage extends Page {
  get profileIcon() {
    return $("//button[@aria-label='Open member menu']");
  }

  get profileLink() {
    return $("//a[@data-testid='account-menu-profile']");
  }

  get profileNameInput() {
    return $("#username");
  }
  get saveProfileButton() {
    return $("//button[@type='submit']");
  }

  async openProfileMenu() {
    await this.profileIcon.click();
  }
  async navigateToUserProfile() {
    await this.profileLink.click();
  }
  async isLoggedIn(username) {
    const usernamePart = username.split("@")[0];
    const currentUrl = await browser.getUrl();
    return currentUrl.includes(usernamePart);
  }

  async editProfileName(newName) {
    await this.profileNameInput.click();
    await this.profileNameInput.setValue(newName);
    await this.saveProfileButton.click();
  }

  async getProfileName() {
    return await this.profileNameInput.getValue();
  }
}

module.exports = new ProfilePage();
