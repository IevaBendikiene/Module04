const { Given, When, Then } = require("@wdio/cucumber-framework");
const LoginPage = require("../pageobjects/login.page");
const assert = require("assert");


Given("the user is on the Trello login page", async () => {
  await LoginPage.open();
});

// This step now takes username and password as arguments from the feature file.
When(
  /^the user logs in with (.*) and (.*)$/,
  async (username, password) => {
    await LoginPage.login(username, password); // Use the passed parameters
  }
);

Then("the user is redirected back to Trello", async () => {
  const currentUrl = await browser.getUrl();
  assert(
    currentUrl.includes("trello.com"),
    `Expected to be redirected back to Trello, but was on: ${currentUrl}`
  );
});

// Given("the user is on the Trello login page", async () => {
//   await LoginPage.open();
// });

// When(
//   /^the user logs in with (.*) and (.*)$/,
//   async () => {
//     await LoginPage.login("strawberry0816@gmail.com", "demo123!");
//   }
// );

// Then("the user is redirected back to Trello", async () => {
//   const currentUrl = await browser.getUrl();
//   assert(
//     currentUrl.includes("trello.com"),
//     `Expected to be redirected back to Trello, but was on: ${currentUrl}`
//   );
// });

// When('the user logs with username and password', () => {
//   // Write code here that turns the phrase above into concrete actions
// })
