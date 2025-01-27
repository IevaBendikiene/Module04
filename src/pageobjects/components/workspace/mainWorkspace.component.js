const BaseComponent = require("../common/base.component");

class MainWorkspace extends BaseComponent {

  getTrelloBoard(name) {
      return $(`//a[@title="${name}"]`);
    }
}
module.exports = MainWorkspace;