module.exports = {
  default: {
    require: ["./features/step-definitions/*.js"], // Ensure same step definitions as WebdriverIO
    format: ["progress-bar", "json:./reports/cucumber-report.json"], // Reporting formats
    parallel: 2,
    retry: 1, 
    publishQuiet: true,
  },
};
