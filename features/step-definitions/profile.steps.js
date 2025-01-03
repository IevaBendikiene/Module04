const { Given, When, Then } = require("@wdio/cucumber-framework");
const ProfilePage = require("../pageobjects/profile.page");
const LoginPage = require("../pageobjects/login.page");
const assert = require("assert");
const user = "strawberry0816@gmail.com";
const password = "demo123!";

Given("the user is logged into Trello", async () => {
  await LoginPage.open();
  await LoginPage.login(user, password);
  const currentUrl = await browser.getUrl();
  assert(
    currentUrl.includes("trello.com"),
    `Expected to be redirected back to Trello, but was on: ${currentUrl}`
  );
});

When("the user clicks profile icon", async () => {
  await ProfilePage.profileIcon.click();
});
When("the user clicks the profile link button", async () => {
  await ProfilePage.profileLink.click();
});
When("user is navigated to profile page", async () => {
 
  const headerElement = await ProfilePage.profileHeader;

  await browser.waitUntil(async() => await headerElement.isDisplayed(), {
    timeout: 15000,
    timeoutMsg: `Expected header "Manage your personal information" to be displayed, but it wasn't.`
  })
  const isDisplayed = await headerElement.isDisplayed();
  assert.strictEqual(
    isDisplayed,
    true,
    'Expected "profileHeader" element to be displayed, but it was not.'
  );
});
When("the user changes their profile name", async () => {
  await ProfilePage.editProfileName("strawberry1608");
});

Then(
  "the updated information should be saved and displayed in the profile",
  async () => {
    const updatedName = await ProfilePage.getProfileName();
    const expectedName = "strawberry1608";
    assert.strictEqual(
      updatedName,
      expectedName,
      `Profile name was not updated. Expected: ${expectedName}, Got: ${updatedName}`
    );
  }
);
