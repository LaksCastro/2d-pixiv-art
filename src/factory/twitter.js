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
  const requestReply = (imageData, getStatus) => {
    client = get();

    client.post("media/upload", { media: imageData }, function (error, media) {
      if (error) {
        Console.error(error);
      } else {
        const status = getStatus(media);

        client.post("statuses/update", status, function (error) {
          if (error) return Console.error(error);
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
