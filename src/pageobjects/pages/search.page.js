const Page = require('./page');
const { SearchCanvas } = require('./../components');
class SearchPage extends Page {
  constructor() {
    super('.eQ9di9xFp2WSc0');
    this.searchCanvas = new SearchCanvas();
  }
}
module.exports = new SearchPage();
