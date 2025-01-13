const { browser } = require('@wdio/globals')

module.exports = class Page {
   
    async open (path) {
        return browser.url(`${path}`)
    }
}
