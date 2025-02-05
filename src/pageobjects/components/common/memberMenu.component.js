const BaseComponent = require('../common/base.component');
// const Button = require("../../controls/button");

class MemberMenuComponent extends BaseComponent {
  get profileLink() {
    return $("//a[@data-testid='account-menu-profile']");
  }
  get logoutBtn() {
    return $('//button[@data-testid="account-menu-logout"]');
  }
}

module.exports = MemberMenuComponent;
