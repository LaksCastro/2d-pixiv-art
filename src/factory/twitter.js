const TwitterApiFactory = () => {
  const { get } = require("../client/twitter");

  const ConsoleFactory = require("./console");
  const Console = ConsoleFactory();

  let client = null;
  // ===========================================================================================
  // Send a request to Twitter API for to create a Tweet with a text and image
  // ===========================================================================================
  // @param imageData - Image Base 64 File
  // @param getStatus - Function for to convert raw media data in a tweet parameters
  // ===========================================================================================
  const requestReply = (imageData, getStatus, onComplete = () => {}) => {
    client = get();

    const { base64, imageAuthor, availableIn } = imageData;

    client.post("media/upload", { media: base64 }, function (error, media) {
      if (error) {
        Console.error(error);
      } else {
        let tweet = getStatus(media);

        if (imageAuthor)
          tweet.status = `${tweet.status}\nMade with ❤️ by ${imageAuthor}\nAvailable in ${availableIn}`;
        else tweet.status = `${tweet.status}\nAvailable in ${availableIn}`;

        client.post("statuses/update", tweet, function (error) {
          if (error) return Console.error(error);

          onComplete(media);
        });
      }
    });
  };

  const public = {
    requestReply,
  };

  return Object.freeze(public);
};

module.exports = TwitterApiFactory;
