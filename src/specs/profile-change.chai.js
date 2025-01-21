const ProfilePage = require("../pageobjects/pages/profile.page");
const LoginPage = require("../pageobjects/pages/login.page");
const { should } = require("chai");
should();
const { logout } = require("../hooks");
const user = process.env.USER;
const password = process.env.PASSWORD;
const badNewName = "testName";
const goodNewName = "ieva_test";

describe("Change profile", () => {
  beforeEach(async () => {
    await LoginPage.open();
    await LoginPage.login(user, password);
  });
  afterEach(async () => {
    await logout(); // Perform logout after each test
  });
  it("should login with valid credentials", async () => {
    await browser.waitUntil(
      async () => {
        const curentUrl = await browser.getUrl();

        return curentUrl.includes("boards"); // Check if the URL contains 'boards'
      },
      {
        timeout: 20000, // Maximum wait time (in milliseconds)
        timeoutMsg:
          "Expected URL to contain 'boards', but it didn't after 20 seconds.",
      }
    );
    const curentUrl = await browser.getUrl();
    curentUrl.should.include(
      "boards",
      `Expected URL to contain 'boards', but got: ${curentUrl}`
    );
  });

  it("Should get an error, when trying to update name with incorrect format", async () => {
    await ProfilePage.profileIcon.click();
    await ProfilePage.profileLink.click();

    await browser.waitUntil(
      async () => {
        const currentTitle = await browser.getTitle();
        return currentTitle.includes("Profile");
      },
      {
        timeout: 10000,
        timeoutMsg: `Expected title to contain 'Profile', but it didn't after 10 seconds.`,
      }
    );
    const currentTitle = await browser.getTitle();
    currentTitle.should.include(
      "Profile",
      `Expected URL to contain 'Profile', but got: ${currentTitle}`
    );

    await ProfilePage.editProfileName(badNewName);
    await browser.pause(10000);

    const error = await ProfilePage.usernameError.getText();
    error.should.equal(
      "Username is invalid: only lowercase letters, underscores, and numbers are allowed",
      `Expected error message to be "Username is invalid: only lowercase letters, underscores, and numbers are allowed", but got: "${error}"`
    );
  });
  it("Update profile information and save, new name displays in the profile", async () => {
    await ProfilePage.profileIcon.click();
    await ProfilePage.profileLink.click();

    await browser.waitUntil(
      async () => {
        const currentTitle = await browser.getTitle();
        return currentTitle.includes("Profile");
      },
      {
        timeout: 10000,
        timeoutMsg: `Expected title to contain 'Profile', but it didn't after 10 seconds.`,
      }
    );
    const currentTitle = await browser.getTitle();
    currentTitle.should.include(
      "Profile",
      `Expected URL to contain 'Profile', but got: ${currentTitle}`
    );
    await ProfilePage.editProfileName(goodNewName);
    await browser.waitUntil(
      async () => {
        const updatedName = await ProfilePage.usernameHeader.getText();
        return updatedName.includes(goodNewName);
      },
      {
        timeout: 5000,
        timeoutMsg: `Expected the username header to include "${goodNewName}", but it did not after 5 seconds.`,
      }
    );
    const updatedName = await ProfilePage.usernameHeader.getText();
    updatedName.should.include(
      goodNewName,
      `Expected the username header to include "${goodNewName}", but got: "${updatedName}"`
    );
    // await logout();
  });
});
