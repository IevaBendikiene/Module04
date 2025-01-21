const { assert } = require("chai"); // Import Chai assert interface
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
    await browser.pause(2000);
    const errorMessage = await LoginPage.loginErrorMessage.getText();

    assert.include(
      errorMessage,
      "Incorrect email address and / or password.",
      `Expected error message to include "Incorrect email address and / or password.", but got: "${errorMessage}"`
    );
  });

  it.only("should login with valid credentials", async () => {
    await LoginPage.login(user, password);
    await browser.waitUntil(
      async () => {
        const currentUrl = await browser.getUrl();
        return currentUrl.includes("trello.com");
      },
      {
        timeout: 20000,
        timeoutMsg:
          "Expected URL to contain 'trello', but it didn't after 10 seconds.",
      }
    );
    const currentUrl = await browser.getUrl();
    assert.include(
      currentUrl,
      "trello.com",
      `Expected URL to contain 'boards', but got: ${currentUrl}`
    );
    await logout();
  });
});
