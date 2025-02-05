const Page = require('./page');
const WorkspacePage = require('./workspace.page');
const {
  ListComposerComponent,
  ListComponent,
  EditCardModal,
  FilterPopover,
  BoardMenuComponent,
  BoardHeader,
} = require('./../components');

class BoardsPage extends Page {
  constructor() {
    super('trello.com/b');
    this.header = new BoardHeader();
    this.listComposer = new ListComposerComponent();
    this.list = new ListComponent();
    this.editCardModal = new EditCardModal();
    this.filterPopover = new FilterPopover();
    this.boardsMenu = new BoardMenuComponent();
  }

  async open(name) {
    try {
      await WorkspacePage.open();
      const board = WorkspacePage.workspace.getTrelloBoard(name);
      await board.waitForDisplayed({ timeout: 5000 });
      await board.click();
    } catch (error) {
      throw new Error(
        `Failed to open the Trello board "${name}": ${error.message}`,
      );
    }
  }
}
module.exports = new BoardsPage();

// get listEditBtn() {
//   return $$('//button[@data-testid="list-edit-menu-button"]');
// }
// get archiveListBtn() {
//   return $('//button[@data-testid="list-actions-archive-list-button"]');
// } situ gali nereiket nes valant board nelieka ir listo
// getCreatedCards(name) {
//   return $$(`//a[@title="${name}"]`);
// }
