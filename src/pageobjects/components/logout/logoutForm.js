const BaseComponent = require('../common/base.component');

class LogoutForm extends BaseComponent {
  constructor() {
    super('//form[@data-testid="logout-form"]');
  }
  get logoutSubmitBtn() {
    return this.rootEl.$('button#logout-submit');
  }
}
module.exports = LogoutForm;
