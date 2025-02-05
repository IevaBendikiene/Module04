const LoginPage = require('./login.page');
const BoardsPage = require('./boards.page');
const HomePage = require('./home.page');
const LogoutPage = require('./logout.page');
const ProfilePage = require('./profile.page');
const SearchPage = require('./search.page');
const WorkspacePage = require('./workspace.page');

function pages(name) {
  const items = {
    boards: new BoardsPage(),
    login: new LoginPage(),
    home: new HomePage(),
    logout: new LogoutPage(),
    profile: new ProfilePage(),
    search: new SearchPage(),
    workspace: new WorkspacePage(),
  };
  return items[name.toLowerCase()];
}
module.exports = {
  BoardsPage,
  LoginPage,
  HomePage,
  LogoutPage,
  ProfilePage,
  SearchPage,
  WorkspacePage,
  pages,
};
