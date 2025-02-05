const { $ } = require('@wdio/globals');
const Page = require('./page');
const { ProfileForm } = require('./../components');

class ProfilePage extends Page {
  constructor() {
    super('trello.com/u/');
    this.profileForm = new ProfileForm();
  }
  get usernameHeader() {
    return $('.M7DuYRS8ksp5f8');
  }
  async editProfileName(name) {
    await this.profileForm.profileNameInput.click();
    await this.profileForm.profileNameInput.setValue(name);
    await this.profileForm.saveProfileButton.click();
  }
}
module.exports = new ProfilePage();
