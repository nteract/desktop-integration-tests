// A simple test to verify a visible window is opened with no title
var Application = require("spectron").Application;
var assert = require("assert");
var path = require("path");

var appPath = "nteract/applications/desktop/dist/squashfs-root";
var app = new Application({
  path: path.join(process.cwd(), appPath, "nteract")
});

app
  .start()
  .then(function() {
    // Check if the window is visible
    return app.browserWindow.isVisible();
  })
  .then(function(isVisible) {
    // Verify the window is visible
    assert.equal(isVisible, true);
  })
  .then(function() {
    // Get the window's title
    return app.client.getTitle();
  })
  .then(function(title) {
    // Verify the window's title
    console.log(title);
    assert.equal(title, "");
  })
  .then(function() {
    // Stop the application
    return app.stop();
  })
  .then(function() {
    console.log("Success!");
  })
  .catch(function(error) {
    // Log any failures
    console.error("Test failed", error.message);
  });
