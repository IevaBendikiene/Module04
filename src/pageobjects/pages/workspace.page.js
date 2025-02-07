const Page = require('./page');
const HomePage = require('./home.page');
const { MainWorkspace } = require('./../components');

class WorkspacePage extends Page {
  constructor() {
    super('trello.com/w');
    this.workspace = new MainWorkspace();
  }
  async open() {
    const { header } = HomePage;
    await header.workspaceNav.waitForClickable({ timeout: 6000 });
    await header.workspaceNav.click();

    await header.myWorkspaceLink.waitForClickable({ timeout: 5000 });
    await header.myWorkspaceLink.click();
  }
}
module.exports = new WorkspacePage();
