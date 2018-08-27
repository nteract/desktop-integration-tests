const Application = require("spectron").Application;
const assert = require("assert");
const path = require("path");
const appPath = "nteract/applications/desktop/dist/squashfs-root";

const clearNotebookPath = "notebooks/node-example.ipynb";
const executedNotebookPath = "notebooks/node-example-executed.ipynb";

const delay = time => new Promise(resolve => setTimeout(resolve, time));

jest.setTimeout(15000);

describe("Testing notebook actions in python with clean notebook", () => {
  beforeEach(() => {
    app = new Application({
      path: appPath,
      args: [clearNotebookPath]
    });
    return app.start();
  });

  afterEach(async () => {
    if (app && app.isRunning()) {
      // app.stop();
      await delay(2000);
      return app.browserWindow.destroy();
    }
  });

  it("Open python example, clears all cells", async () => {
    await delay(12000);
    await app.client.windowByIndex(0);
    await app.browserWindow.send("menu:clear-all");
    await app.browserWindow.send("menu:run-all");
  });
});

describe("Testing notebook actions in python with dirty notebook", () => {
  beforeEach(() => {
    app = new Application({
      path: appPath,
      args: [executedNotebookPath]
    });
    return app.start();
  });

  afterEach(async () => {
    if (app && app.isRunning()) {
      // app.stop();
      await delay(2000);
      return app.browserWindow.destroy();
    }
  });

  it("Open python example, clears all cells", async () => {
    await delay(12000);
    await app.client.windowByIndex(0);
    await app.browserWindow.send("menu:clear-all");
  });
});
