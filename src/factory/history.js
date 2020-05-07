const path = require("path");

const HistoryFactory = () => {
  const { FileManagerFactory } = require("./index");
  const FileManager = FileManagerFactory();

  const historyPath = path.normalize(
    path.join(__dirname, "..", "history", "index.js")
  );

  const push = (imgData) => {
    const currentHistory = FileManager.read(historyPath);

    console.log(currentHistory);
  };

  const remove = (imgData) => {};

  const public = {
    push,
    remove,
  };

  return Object.freeze(public);
};

module.exports = HistoryFactory;
