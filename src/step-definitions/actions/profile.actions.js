const { When } = require('@wdio/cucumber-framework');
const ProfilePage = require('../../pageobjects/pages/profile.page');
const HomePage = require('../../pageobjects/pages/home.page');
const assert = require('assert');
const newName = '2025test';

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

module.exports = {};
