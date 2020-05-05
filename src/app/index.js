const life = require("./life");
const quote = require("./quote");

const init = (client) => {
  life(client);
  quote(client);
};

module.exports = init;
