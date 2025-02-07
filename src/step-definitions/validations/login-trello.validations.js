const { Then } = require('@wdio/cucumber-framework');
const assert = require('assert');

Then(/^the user is redirected back to Trello$/, async () => {
  const currentUrl = await browser.getUrl();
  assert(
    currentUrl.includes('trello.com'),
    `Expected to be redirected back to Trello, but was on: ${currentUrl}`,
  );
});

module.exports = {};
