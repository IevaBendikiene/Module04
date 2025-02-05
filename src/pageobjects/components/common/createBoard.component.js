const BaseComponent = require('../common/base.component');

class CreateBoardComponent extends BaseComponent {
  get boardTitleInput() {
    return $('//input[@data-testid="create-board-title-input"]');
  }
  get finalCreateBoardBtn() {
    return $('//button[@data-testid="create-board-submit-button"]');
  }
}

module.exports = CreateBoardComponent;
