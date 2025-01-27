const { $ } = require("@wdio/globals");
const BaseComponent = require("../common/base.component")
 
class FilterPopover extends BaseComponent{
  get filterPopover() {
    return $('//section[header[h2[@title="Filter"]]]');//filter componentas
  }
  get greenCheckboxEl() {
    return $(
      '//label[@data-testid="clickable-checkbox" and .//span[@data-color="green" and @data-testid="card-label"]]'
    );
  }
  get closePopoverBtn() {
    return $('//button[@data-testid="popover-close"]')
  }
}
 module.exports = FilterPopover
 