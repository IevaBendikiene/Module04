// import pkg from 'wdio-mochawesome-reporter';
// const { mergeResults } = pkg;

export const config = {
  // ====================
  // Runner Configuration
  // ====================
  runner: 'local',

  // ==================
  // Specify Test Files
  // ==================
  specs: ['../specs/**/login.chai.js'],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],

  // ============
  // Capabilities
  // ============
  maxInstances: 2,
  capabilities: [
    {
      browserName: process.env.BROWSER,
      'goog:chromeOptions': { args: ['--disable-gpu'] },
      'ms:edgeOptions': { args: ['--headless', '--disable-gpu'] },
    },
  ],

  // ===================
  // Test Configurations
  // ===================
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 20000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: ['visual'],
  framework: 'mocha',
  reporters: [
    [
      'spec',
      {
        symbols: {
          passed: '[PASS]',
          failed: '[FAIL]',
        },
      },
    ],
    [
      'mochawesome',
      {
        outputDir: './Results',
        outputFileFormat: function (opts) {
          return `results-${opts.cid}.json`;
        },
      },
    ],
  ],
  onComplete: async function (exitCode, config, capabilities, results) {
   
    // const mergeResult = new Promise(
    //   (resolve) => {
    //   setTimeout(async () => resolve(await mergeResults('./Results', 'results-*')), 60000);
    // });
    // const data = await mergeResult;
    // console.log('Merging Mochawesome reports...');
   
    try {
      const { mergeResults } = await import('wdio-mochawesome-reporter/mergeResults.js'); // ✅ Use dynamic import
      await mergeResults('./Results', 'results-*');
      console.log("Mochawesome reports merged successfully.");
    } catch (err) {
      console.error("Error merging Mochawesome reports:", err);
    }
    // try {
      // await mergeResults("./Results", "results-*");
    //   console.log("Mochawesome report merged successfully.");
    // } catch (err) {
    //   console.error("Error merging Mochawesome reports:", err);
    // }
  },
  // mochawesomeOpts: {
  //   includeScreenshots: true, // Embed screenshots in report
  //   screenshotUseRelativePath: true, // Use relative paths for portability
  // },

  // Hook to merge results after tests complete
  // onComplete: function (exitCode, config, capabilities, results) {
  //   console.log("Merging Mochawesome reports...");
  //   mergeResults("./Results", "results-*");
  // },
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
    retry: 2,
    require: ['esm'],
  },

  reporterSyncTimeout: 10000,
  // =====
  // Hooks
  // =====

  // onPrepare: function (config, capabilities) {},
  // onWorkerStart: function (cid, caps, specs, args, execArgv) {},
  // onWorkerEnd: function (cid, exitCode, specs, retries) {},
  // beforeSession: function (config, capabilities, specs, cid) {},
  // before: function (capabilities, specs) {},
  // beforeCommand: function (commandName, args) {},
  // beforeSuite: function (suite) {},
  // beforeTest: function (test, context) {},
  // beforeHook: function (test, context, hookName) {},
  // afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {},
  // afterTest: function(test, context, { error, result, duration, passed, retries }) {},
  // afterSuite: function (suite) {},
  // afterCommand: function (commandName, args, result, error) {},
  // after: function (result, capabilities, specs) {},
  // afterSession: function (config, capabilities, specs) {},
  // onComplete: function(exitCode, config, capabilities, results) {},
  // onReload: function(oldSessionId, newSessionId) {},
  // beforeAssertion: function(params) {},
  // afterAssertion: function(params) {},
};
