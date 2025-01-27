const Page = require("./page");
const { LogoutForm } = require("./../components");
const url =
  "https://id.atlassian.com/logout?continue=https%3A%2F%2Ftrello.com%2Flogout%3Fdsc%3D3c0c0158e916e1fdbf86c071f1cbcc8ad5b585971009beb70cf441054cd5e4aa";

class LogoutPage extends Page {
  constructor() {
    super(url);
    this.logoutForm = new LogoutForm();
  }
}
module.exports = new LogoutPage();
