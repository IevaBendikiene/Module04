const { Given, When, Then } = require("@wdio/cucumber-framework");
const ProfilePage = require("../pageobjects/profile.page");
const LoginPage = require("../pageobjects/login.page");
const assert = require("assert");
const user = "strawberry0816@gmail.com"
const password = "demo123!"

Given("the user is logged into Trello", async () => {
  await LoginPage.open();
  await LoginPage.login(user, password );
    const currentUrl = await browser.getUrl();
  assert(
    currentUrl.includes("trello.com"),
    `Expected to be redirected back to Trello, but was on: ${currentUrl}`
  );
});

When("the user clicks profile icon", async () => {
  await ProfilePage.openProfileMenu()
});

When('the user clicks the profile link button', async () => {
  await ProfilePage.navigateToUserProfile()
});
Then('user is navigated to profile page', async() => {
  await ProfilePage.checkItIsProfilePage(user)
})
When("the user changes their profile name", async () => {
  await ProfilePage.editProfileName("strawberry1608")
});

Then("the updated information should be saved and displayed in the profile", async () => {
  const updatedName = await ProfilePage.getProfileName(); 
  const expectedName = "strawberry1608"; 
  assert.strictEqual(updatedName, expectedName, `Profile name was not updated. Expected: ${expectedName}, Got: ${updatedName}`);
});


