const Twit = require("twit");
const config = require("./config");
const bot = require("./app");

const client = new Twit(config);

bot(client);
