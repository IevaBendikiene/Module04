const { Given, When, Then } = require("@wdio/cucumber-framework");
const LoginPage = require("../pageobjects/pages/login.page");
const assert = require("assert");
const username = process.env.USER;
const password = process.env.PASSWORD;

Given(/^the user is on the Trello login page$/, async () => {
  await LoginPage.open();
});

When(/^the user logs in with username and password$/, async () => {
  await LoginPage.login(username, password);
});

Then(/^the user is redirected back to Trello$/, async () => {
  const currentUrl = await browser.getUrl();
  assert(
    currentUrl.includes("trello.com"),
    `Expected to be redirected back to Trello, but was on: ${currentUrl}`
  );
});
