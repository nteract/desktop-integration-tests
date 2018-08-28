const Application = require("spectron").Application;
const assert = require("assert");
const path = require("path");
const fs = require("fs");
const appPath = "nteract/applications/desktop/dist/squashfs-root/nteract";

const cleanNotebookPath = "notebooks/node-example.ipynb";
const executedNotebookPath = "notebooks/node-example-executed.ipynb";

const delay = time => new Promise(resolve => setTimeout(resolve, time));

jest.setTimeout(15000);

let i = 0;
let nextTestNb = executedNotebookPath;
describe("Testing notebook actions in python with dirty notebook", () => {
  beforeEach(() => {
    i += 1;
    const newNotebook = `notebooks/notebook${i}.ipynb`;
    fs.createReadStream(nextTestNb).pipe(fs.createWriteStream(newNotebook));
    app = new Application({
      path: appPath,
      args: [newNotebook]
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
    await app.browserWindow.send("menu:save");
    nextTestNb = cleanNotebookPath;
  });

  it("Open clean notebook example, runs all cells", async () => {
    await delay(12000);
    await app.client.windowByIndex(0);
    await app.browserWindow.send("menu:run-all");
    await app.browserWindow.send("menu:save");
  });
});

describe("tests jest snapshots of executed notebooks", () => {
  it("tests clear all-cells", () => {
    const nbPath = `notebooks/notebook1.ipynb`;
    const nb = JSON.parse(fs.readFileSync(nbPath));
    expect(nb).toMatchSnapshot();
  });

  it("tests run-all-cells", () => {
    const nbPath = `notebooks/notebook2.ipynb`;
    const nb = JSON.parse(fs.readFileSync(nbPath));
    expect(nb).toMatchSnapshot();
  });
});
