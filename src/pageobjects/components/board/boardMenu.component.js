const BaseComponent = require('../common/base.component');

class BoardMenuComponent extends BaseComponent {
  constructor() {
    super('.board-menu');
  }
  get closeBoardBtn() {
    return $('//div[text()="Close board"]');
  }
  get confirmcloseBoardBtn() {
    return $('//button[@data-testid="popover-close-board-confirm"]');
  }
  get deleteBordBtn() {
    return $('//button[@data-testid="close-board-delete-board-button"]');
  }
  get confirmDeleteBoardBtn() {
    return $(
      '//button[@data-testid="close-board-delete-board-confirm-button"]',
    );
  }
}
module.exports = BoardMenuComponent;
