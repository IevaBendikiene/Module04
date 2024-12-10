const { $, browser } = require("@wdio/globals");
const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
const login =
  "https://id.atlassian.com/login?application=trello&continue=https%3A%2F%2Ftrello.com%2Fauth%2Fatlassian%2Fcallback%3Fdisplay%3DeyJ2ZXJpZmljYXRpb25TdHJhdGVneSI6InNvZnQifQ%253D%253D&display=eyJ2ZXJpZmljYXRpb25TdHJhdGVneSI6InNvZnQifQ%3D%3D";

class LoginPage extends Page {

  get userInput() {
    return $("#username");
  }
 
  get continuteBtn(){
    return $("//div[@role='presentation' and @data-testid='password-container']")
  }
 get passwordInput(){
    return $("#password")
 }
 get loginBtn(){
    return $("#login-submit")
 }
  async login(username, password) {
    await this.usernameInput.setValue(username) 
    await this.continuteBtn.click()

    await browser.waitUntil(
        async () => this.passwordInput.isDisplayed(),
        { timeout: 10000, timeoutMsg: "Password input not displayed" }
      );
    await this.passwordInput.setValue(password)
    await this.loginBtn.click()
  }

  open() {
    return super.open(login);
  }
}

module.exports = new LoginPage();
