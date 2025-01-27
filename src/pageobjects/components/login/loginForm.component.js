const BaseComponent = require("../common/base.component");

class LoginForm extends BaseComponent {
  constructor() {
    super("#form-login")
  }
  get userInput() {
      return this.rootEl.$("#username");
    }
    get continuteBtn(){
      return this.rootEl.$("#login-submit")
    }
   get passwordInput(){
      return this.rootEl.$("#password")
   }
    get loginBtn(){
       return this.rootEl.$("#login-submit")
    }
    get loginErrorMessage(){
      return $('//div[@data-testid="form-error--content"]')
     }
}

module.exports = new LoginForm()