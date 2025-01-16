const BaseComponent = require("./base.component");

class HeaderComponent extends BaseComponent {
  constructor() {
    super("#header");
  }
  get workspaceNav() {
      return this.rootEl.$('//button[@data-testid="workspace-switcher"]');
    }
    get myWorkspaceLink() {
      return $('//a[@data-testid="workspace-switcher-popover-tile"]');
    }
  get createButton() {
    return this.rootEl.$('//button[@data-testid="header-create-menu-button"]');
  }
  get createBoardButton() {
    return $('//button[@data-testid="header-create-board-button"]');
  }
  get searchInput() {
      return this.rootEl.$('//input[contains(@placeholder, "Search")]');
    }
  get viewAllResultsLink() {
      return $('//*[text()="View all results"]');
    }  
   get profileIcon() {
      return this.rootEl.$("//button[@data-testid='header-member-menu-button']");
    }
}

module.exports = HeaderComponent;
