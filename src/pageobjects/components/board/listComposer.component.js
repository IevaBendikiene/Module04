const { $ } = require('@wdio/globals');
const BaseComponent = require('../common/base.component');

class ListComposerComponent extends BaseComponent {
  constructor() {
    super('#board');
  }
  get addListBtn() {
    return $('//button[@data-testid="list-composer-button"]');
  }
  get listTitleInput() {
    return $(
      '//textarea[@data-testid="list-name-textarea" and @aria-label="Enter list name…"]',
    );
  }
  get submitNewListBtn() {
    return $('//button[@data-testid="list-composer-add-list-button"]');
  }
}
module.exports = ListComposerComponent;
