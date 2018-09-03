const Application = require("spectron").Application;
const assert = require("assert");
const path = require("path");
const fs = require("fs");

// const appPath = "nteract/applications/desktop/dist/squashfs-root/nteract";
const appPath =
  "/Users/acb/contributing/tt/nteract/applications/desktop/dist/mac/nteract.app/Contents/MacOS/nteract";
const cleanNotebookPath = "notebooks/node-example.ipynb";
const executedNotebookPath = "notebooks/node-example-executed.ipynb";
const newCodeCellNotebookPath = "notebooks/newCodeCell-example.ipynb";
const newTextCellNotebookPath = "notebooks/newTextCell-example.ipynb";
const changeThemeDarkNotebookPath = "notebooks/changeThemeDark-example.ipynb";

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
    nextTestNb = newCodeCellNotebookPath;
  });

  it("Open notebook and adds a new code cell", async () => {
    await delay(12000);
    await app.client.windowByIndex(0);
    await app.browserWindow.send("menu:new-code-cell");
    await app.browserWindow.send(
      "menu:save-as",
      "notebooks/new-code-cell.ipynb"
    );
    nextTestNb = newTextCellNotebookPath;
  });

  it("Open notebook and adds a new text cell", async () => {
    await delay(12000);
    await app.client.windowByIndex(0);
    await app.browserWindow.send("menu:new-text-cell");
    await app.browserWindow.send(
      "menu:save-as",
      "notebooks/new-text-cell.ipynb"
    );
    nextTestNb = changeThemeDarkNotebookPath;
  });

  it("Open notebook and changes the theme to dark", async () => {
    await delay(12000);
    await app.client.windowByIndex(0);
    await app.browserWindow.send("menu:theme", "dark");
    await app.browserWindow.send("menu:save-as", "notebooks/dark-theme.ipynb");
    nextTestNb = changeThemeLightNotebookPath;
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

  it("tests new-code-cells", () => {
    const nbPath = "notebooks/new-code-cell.ipynb";
    const nb = JSON.parse(fs.readFileSync(nbPath));
    expect(nb).toMatchSnapshot();
  });

  it("tests new-text-cells", () => {
    const nbPath = "notebooks/new-text-cell.ipynb";
    const nb = JSON.parse(fs.readFileSync(nbPath));
    expect(nb).toMatchSnapshot();
  });

  it("tests change theme to dark", () => {
    const nbPath = "notebooks/dark-theme.ipynb";
    const nb = JSON.parse(fs.readFileSync(nbPath));
    expect(nb).toMatchSnapshot();
  });
});
