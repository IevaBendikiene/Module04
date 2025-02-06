const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../../src/pageobjects/pages/login.page');

const username = process.env.USER;
const password = process.env.PASSWORD;

Given('the user is on the Trello login page', async function () {
  await LoginPage.open();
});

When('the user logs in with username and password', async function () {
  await LoginPage.login(username, password);
});

Then('the user is redirected back to Trello', async function () {
  const currentUrl = await browser.getUrl();
  assert(
    currentUrl.includes('trello.com'),
    `Expected to be redirected back to Trello, but was on: ${currentUrl}`
  );
});