const Page = require('./page');
const {
  HeaderComponent,
  MemberMenuComponent,
  CreateBoardComponent,
} = require('./../components');

class HomePage extends Page {
  constructor() {
    super('https://trello.com/');

    this.header = new HeaderComponent();
    this.memberMenu = new MemberMenuComponent();
    this.createBoard = new CreateBoardComponent();
  }
}
module.exports = new HomePage();
