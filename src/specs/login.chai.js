const { assert } = require("chai"); 
const LoginPage = require("../pageobjects/pages/login.page");
const { logout } = require("../hooks");
const user = process.env.USER;
const password = process.env.PASSWORD;
const badPassword = process.env.PASSWORD_B;

describe("Login to Trello", () => {
  beforeEach(async () => {
    await LoginPage.open();
  });
  it("should not log in with invalid credentials", async () => {
    await LoginPage.login(user, badPassword);
   
    const errorMessage = await LoginPage.loginErrorMessage.getText();

    assert.include(
      errorMessage,
      "Incorrect email address and / or password.",
      `Expected error message to include "Incorrect email address and / or password.", but got: "${errorMessage}"`
    );
  });

  it("should login with valid credentials", async () => {
    await LoginPage.login(user, password);
    await browser.waitUntil(
      async () => {
        const currentTitle = await browser.getTitle();
        return currentTitle.includes("Trello");
      },
      {
        timeout: 10000,
        timeoutMsg:
          "Expected Title to contain 'Trello', but it didn't after 10 seconds.",
      }
    );
    const currentTitle = await browser.getTitle();
    assert.include(
      currentTitle,
      "Trello",
      `Expected URL to contain "Trello", but got: ${currentTitle}`
    );
    await logout();
  });
});
