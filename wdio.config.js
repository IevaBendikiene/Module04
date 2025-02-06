exports.config = {
  runner: "local",

  framework: "cucumber",

  cucumberOpts: {
    require: ["./features/step-definitions/*.js"],
    timeout: 60000,
  },

  capabilities: [
    {
      browserName: "chrome",
      "goog:chromeOptions": { args: ["--headless"] },
    },
  ],

  services: ["selenium-standalone"],

  reporters: ["spec"],
};