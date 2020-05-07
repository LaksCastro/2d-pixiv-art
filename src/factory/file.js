const fs = require("fs");

// ===========================================================================================
// Factory to manage files: delete, create a writable stream, get base64
// ===========================================================================================
// @commom params: path - Path to the file
// ===========================================================================================
const FileManagerFactory = () => {
  const del = (path) => fs.unlinkSync(path);

  const create = (path) => fs.createWriteStream(path);

  const read = (path) => fs.readFileSync(path, { encoding: "utf-8" });

  const write = (path, content) => fs.writeFileSync(path, content);

  const getBase64 = (path) => fs.readFileSync(path, { encoding: "base64" });

  const public = {
    del,
    create,
    read,
    write,
    getBase64,
  };

  return Object.freeze(public);
};

module.exports = FileManagerFactory;
