const BaseComponent = require('../common/base.component');

class SearchCanvas extends BaseComponent {
  get allSearchResults() {
    return $$('//a[@data-testid="advanced-search-board-result-item"]');
  }
}
module.exports = SearchCanvas;
