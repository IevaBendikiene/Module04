require('./actions/login-trello.actions');
require('./actions/profile.actions');
require('./validations/profile.validations');

// const { Given} = require('@wdio/cucumber-framework');
// const LoginPage = require('../pageobjects/pages/login.page');

// const assert = require('assert');

// const user = process.env.USER;
// const password = process.env.PASSWORD;

// Given(/^the user is logged into Trello$/, async () => {
//   await LoginPage.open();
//   await LoginPage.login(user, password);
//   const currentUrl = await browser.getUrl();
//   assert(
//     currentUrl.includes('trello.com'),
//     `Expected to be redirected back to Trello, but was on: ${currentUrl}`,
//   );
// });

// When('the user clicks profile icon', async () => {
//   await HomePage.header.profileIcon.click();
// });
// When('the user clicks the profile link button', async () => {
//   await HomePage.memberMenu.profileLink.click();
// });
// When('user is navigated to profile page', async () => {
//   const headerElement = await ProfilePage.profileForm.profileHeader;

//   await browser.waitUntil(async () => await headerElement.isDisplayed(), {
//     timeout: 15000,
//     timeoutMsg: `Expected header "Manage your personal information" to be displayed, but it wasn't.`,
//   });
//   const isDisplayed = await headerElement.isDisplayed();
//   assert.strictEqual(
//     isDisplayed,
//     true,
//     'Expected "profileHeader" element to be displayed, but it was not.',
//   );
// });
// When('the user changes their profile name', async () => {
//   await ProfilePage.editProfileName(newName);
// });
