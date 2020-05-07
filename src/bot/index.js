const BotFactory = () => {
  const AutomaticTweetFactory = require("./tweet");
  const AutomaticReplyFactory = require("./quote");
  // const HistoryFactory = require("../factory/history");

  // const History = HistoryFactory();

  // ===========================================================================================
  // This function is a Wrapper for to inialize all bot features
  // ===========================================================================================
  const initialize = () => {
    const AutomaticTweet = AutomaticTweetFactory();
    const AutomaticReply = AutomaticReplyFactory();

    AutomaticTweet.enable();
    AutomaticReply.enable();
  };

  const public = {
    initialize,
  };

  return Object.freeze(public);
};

module.exports = BotFactory;
