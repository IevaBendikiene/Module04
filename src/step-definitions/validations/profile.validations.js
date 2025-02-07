const { Then } = require('@wdio/cucumber-framework');
const ProfilePage = require('../../pageobjects/pages/profile.page');
const assert = require('assert');
const newName = '2025test';

Then(
  'the updated information should be saved and displayed in the profile',
  async () => {
    await browser.waitUntil(
      async () => {
        const updatedName = await ProfilePage.usernameHeader.getText();
        return updatedName === `@${newName}`;
      },
      {
        timeout: 5000, 
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

module.exports = {};
