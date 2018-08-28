const Application = require("spectron").Application;
const assert = require("assert");
const path = require("path");
const fs = require("fs");

const appPath = "nteract/applications/desktop/dist/squashfs-root/nteract";
const cleanNotebookPath = "notebooks/node-example.ipynb";
const executedNotebookPath = "notebooks/node-example-executed.ipynb";

const delay = time => new Promise(resolve => setTimeout(resolve, time));

jest.setTimeout(15000);

let nextTestNb = executedNotebookPath;
describe("Testing notebook actions in python with dirty notebook", () => {
  beforeEach(() => {
    app = new Application({
      path: appPath,
      args: [nextTestNb]
    });
    return app.start();
  });

  afterEach(async () => {
    if (app && app.isRunning()) {
      await delay(2000);
      return app.stop();
    }
  });

  it("Open dirty notebook example, clears all cells", async () => {
    await delay(12000);
    await app.client.windowByIndex(0);
    await app.browserWindow.send("menu:clear-all");
    await app.browserWindow.send("menu:save-as", "notebooks/clear-all.ipynb");
    // Setting the path for the starting notebook for the next test. Inelegant for sure, but it works ¯\_(ツ)_/¯
    nextTestNb = cleanNotebookPath;
  });

  it("Open clean notebook example, runs all cells", async () => {
    await delay(12000);
    await app.client.windowByIndex(0);
    await app.browserWindow.send("menu:run-all");
    await app.browserWindow.send("menu:save-as", "notebooks/run-all.ipynb");
  });
});

describe("tests jest snapshots of executed notebooks", () => {
  it("tests clear all-cells", () => {
    const nbPath = "notebooks/clear-all.ipynb";
    const nb = JSON.parse(fs.readFileSync(nbPath));
    expect(nb).toMatchSnapshot();
  });

  it("tests run-all-cells", () => {
    const nbPath = "notebooks/run-all.ipynb";
    const nb = JSON.parse(fs.readFileSync(nbPath));
    expect(nb).toMatchSnapshot();
  });
});
