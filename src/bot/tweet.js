const AutomaticTweetFactory = () => {
  const TwitterReplyFactory = require("../factory/reply");
  const ConsoleFactory = require("../factory/console");

  const TwitterReply = TwitterReplyFactory();
  const Console = ConsoleFactory();

  // 15 minutes
  const timeInterval = 1000 * 60 * 15;

  let loopId = null;

  // ===========================================================================================
  // This function is called every [timeInterval] for to make a new tweet in bot profile
  // Therefore, she get the TwitterReply factory and send a request for to make a Tweet
  // And when task ends, this set another setTimeout to call sheself, making a infinite loop
  // ===========================================================================================
  const loop = () => {
    Console.write(Console.yellow("Starting tweet generation..."));

    const whenTaskEnds = () => {
      Console.write(Console.yellow("Complete! Tweet was sent..."));

      loopId = setTimeout(loop, timeInterval);
    };

    const getStatus = (media) => ({
      status: "#StayAtHome",
      media_ids: media.media_id_string,
    });

    TwitterReply.send(getStatus, whenTaskEnds);
  };

  // ===========================================================================================
  // This function enable a loop for to make a tweet in profile bot every [timeInterval]
  // ===========================================================================================
  const enable = () => {
    loop();
  };

  // ===========================================================================================
  // This function disable the loop clearing the timeOut Javascript function
  // ===========================================================================================
  const disable = () => {
    clearTimeout(loopId);
  };

  const public = {
    enable,
    disable,
  };

  return Object.freeze(public);
};

module.exports = AutomaticTweetFactory;
