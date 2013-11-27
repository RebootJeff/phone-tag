exports.client = require('webdriverjs').remote({
  host: "localhost",
  port: 4444,
  desiredCapabilities: {
    browserName: 'phantomjs'
  },
  logLevel: 'silent'
});
