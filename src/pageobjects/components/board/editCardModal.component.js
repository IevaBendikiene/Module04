const { $ } = require('@wdio/globals');
const BaseComponent = require('../common/base.component');

class EditCardModal extends BaseComponent {
  get editLabelBtn() {
    return $('//button[@data-testid="card-back-labels-button"]'); // cardmodal componento viduje
  }
  get greenLabelMarker() {
    return $('//span[@data-color="green" and @data-testid="card-label"]');
  }
  get closeEditCardBtn() {
    return $('//button[@aria-label="Close dialog"]'); // cardmodal
  }
  get closeLabelPopoverBtn() {
    return $('//button[@data-testid="popover-close"]');
  }
}
module.exports = EditCardModal;
