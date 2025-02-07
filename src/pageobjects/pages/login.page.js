const { $, browser } = require('@wdio/globals');
const Page = require('./page');
const { LoginForm } = require('./../components');

const login =
  'https://id.atlassian.com/login?application=trello&continue=https%3A%2F%2Ftrello.com%2Fauth%2Fatlassian%2Fcallback%3Fdisplay%3DeyJ2ZXJpZmljYXRpb25TdHJhdGVneSI6InNvZnQifQ%253D%253D&display=eyJ2ZXJpZmljYXRpb25TdHJhdGVneSI6InNvZnQifQ%3D%3D';

class LoginPage extends Page {
  get loginErrorMessage() {
    return $('//div[@data-testid="form-error--content"]');
  }
  async login(username, password) {
    await LoginForm.userInput.waitForDisplayed({
      timeout: 10000,
      timeoutMsg: 'Username field not visible',
    });
    await LoginForm.userInput.setValue(username);
    await LoginForm.continuteBtn.click();

    await browser.waitUntil(async () => LoginForm.passwordInput.isDisplayed(), {
      timeout: 10000,
      timeoutMsg: 'Password input not displayed',
    });
    await LoginForm.passwordInput.setValue(password);
    await LoginForm.loginBtn.click();
  }
  open() {
    return super.open(login);
  }
}

module.exports = new LoginPage();
