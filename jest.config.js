module.exports = {
  testEnvironment: 'node',
  reporters: [
    "default",
    ["./node_modules/jest-html-reporter", {
      "pageTitle": "tubemaphistory.api"
    }]
  ]
};