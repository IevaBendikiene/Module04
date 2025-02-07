const { Given, When} = require('@wdio/cucumber-framework');
const LoginPage = require('../../pageobjects/pages/login.page');
const username = process.env.USER;
const password = process.env.PASSWORD;

Given(/^the user is on the Trello login page$/, async () => {
  await LoginPage.open();
});

When(/^the user logs in with username and password$/, async () => {
  await LoginPage.login(username, password);
});
module.exports = {};