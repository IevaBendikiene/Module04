const { $ } = require("@wdio/globals");
const BaseComponent = require("../common/base.component")

class ListComponent extends BaseComponent{
  
  get listElement() {
    return $('div[data-testid="list"]');// 
  }
  getlistElement(name) {
    return $(`//li[@data-testid="list-wrapper" and .//h2[@data-testid="list-name" and contains(text(), "${name}")]]`);//listcomponentas
  }
  get addCardBtn() {
    return $('//button[@data-testid="list-add-card-button"]');// list componento viduje
  }
  get cardTextareaInput() {
    return $('//textarea[@data-testid="list-card-composer-textarea"]');
  }
  get finalAddCardBtn() {
    return $('//button[@data-testid="list-card-composer-add-card-button"]');
  }
  getCardLink(name) {
    return $(`//a[@data-testid="card-name" and text()="${name}"]`);
  }
  get trelloCard() {
    return $('//div[@data-testid="trello-card"]');
  }
}
module.exports = ListComponent