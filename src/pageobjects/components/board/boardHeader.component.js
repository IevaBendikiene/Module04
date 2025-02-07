const BaseComponent = require('../common/base.component');

class BoardHeader extends BaseComponent {
  constructor() {
    super('.board-header');
  }
  get boardMenuBtn() {
    return this.rootEl.$('//button[@aria-label="Show menu"]');
  }
  get filterBtn() {
    return this.rootEl.$('//button[@data-testid="filter-popover-button"]'); // board header
  }
  get clearFilterBtn() {
    return $('//button[@data-testid="filter-popover-button-x"]');
  }
}
module.exports = BoardHeader;
