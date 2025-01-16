const BaseComponent = require("../common/base.component");

class ProfileForm extends BaseComponent {
  constructor() {
    super('//form[@data-testid="profile-form"]');
  }
  get profileNameInput() {
    return this.rootEl.$("#username");
  }
  get saveProfileButton() {
    return this.rootEl.$("//button[@type='submit']");
  }
  get usernameError() {
    return this.rootEl.$("#SaveProfileError_Field_username");
  }
  get profileHeader(){
    return $('//h1[contains(text(),"Manage your personal information")]')
   }
}

module.exports = ProfileForm;
