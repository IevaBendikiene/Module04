const { $ } = require("@wdio/globals");
const Page = require("./page");

class ProfilePage extends Page {
  get profileIcon() {
    return $("//button[@data-testid='header-member-menu-button']");
  }
  get profileLink() {
    return $("//a[@data-testid='account-menu-profile']");
  }
  get profileHeader() {
    return $('//h1[contains(text(),"Manage your personal information")]');
  }
  get profileNameInput() {
    return $("#username");
  }
  get saveProfileButton() {
    return $("//button[@type='submit']");
  }
  get usernameHeader() {
    return $(".M7DuYRS8ksp5f8");
  }
  get usernameError() {
    return $("#SaveProfileError_Field_username");
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
