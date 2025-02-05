const { Given, When, Then } = require('@wdio/cucumber-framework');
const ProfilePage = require('../pageobjects/pages/profile.page');
const LoginPage = require('../pageobjects/pages/login.page');
const HomePage = require('../pageobjects/pages/home.page');
const assert = require('assert');

const user = process.env.USER;
const password = process.env.PASSWORD;
const newName = '2025test';

Given(/^the user is logged into Trello$/, async () => {
  await LoginPage.open();
  await LoginPage.login(user, password);
  const currentUrl = await browser.getUrl();
  assert(
    currentUrl.includes('trello.com'),
    `Expected to be redirected back to Trello, but was on: ${currentUrl}`,
  );
});

When('the user clicks profile icon', async () => {
  await HomePage.header.profileIcon.click();
});
When('the user clicks the profile link button', async () => {
  await HomePage.memberMenu.profileLink.click();
});
When('user is navigated to profile page', async () => {
  const headerElement = await ProfilePage.profileForm.profileHeader;

  await browser.waitUntil(async () => await headerElement.isDisplayed(), {
    timeout: 15000,
    timeoutMsg: `Expected header "Manage your personal information" to be displayed, but it wasn't.`,
  });
  const isDisplayed = await headerElement.isDisplayed();
  assert.strictEqual(
    isDisplayed,
    true,
    'Expected "profileHeader" element to be displayed, but it was not.',
  );
});
When('the user changes their profile name', async () => {
  await ProfilePage.editProfileName(newName);
});

Then(
  'the updated information should be saved and displayed in the profile',
  async () => {
    await browser.waitUntil(
      async () => {
        const updatedName = await ProfilePage.usernameHeader.getText();
        return updatedName === `@${newName}`;
      },
      {
        timeout: 5000, // Wait for up to 5 seconds
        timeoutMsg: `Profile name was not updated to @${newName} within the timeout.`,
      },
    );
    const updatedName = await ProfilePage.usernameHeader.getText();
    const expectedName = `@${newName}`;
    assert.strictEqual(
      updatedName,
      expectedName,
      `Profile name was not updated. Expected: ${expectedName}, Got: ${updatedName}`,
    );
  },
);
