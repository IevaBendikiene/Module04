module.exports = {
  default: {
    require: ["./features/step_definitions/*.js"], // Ensure same step definitions as WebdriverIO
    format: ["progress-bar", "json:./reports/cucumber-report.json"], // Reporting formats
    parallel: 2,
    retry: 1,
  },
};
