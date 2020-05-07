const path = require("path");

const HistoryFactory = () => {
  const FileManagerFactory = require("./file");
  const FileManager = FileManagerFactory();

  const historyPath = path.normalize(
    path.join(__dirname, "..", "history.json")
  );

  const push = (imgData) => {
    const currentHistory = JSON.parse(FileManager.read(historyPath));

    currentHistory.push(imgData);

    FileManager.write(historyPath, JSON.stringify(currentHistory));
  };

  const remove = (imgData) => {};

  const public = {
    push,
    remove,
  };

  return Object.freeze(public);
};

module.exports = HistoryFactory;
