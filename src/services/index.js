let client = null;

// To Make Http Requests
const axios = require("axios");

// To Convert All Images to Webp Format
const sharp = require("sharp");

// To Manage Files
const fs = require("fs");
// To Manage Files Paths
const path = require("path");

const { random } = require("../utils");

const available_api_types = [
  "neko",
  "hmidriff",
  "coffee",
  "kemonomimi",
  "holo",
];

// Get Endpoint with a type
const getWaifuEndpoint = (type) => `https://nekobot.xyz/api/image?type=${type}`;

// To download and save image from url
const download = async (url, image_path) => {
  const response = await axios({
    url,
    responseType: "stream",
  });
  return await new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(image_path))
      .on("finish", () => resolve())
      .on("error", (e) => reject(e));
  });
};

// Remove file by path
const removeFile = async (file_path) => {
  fs.unlinkSync(file_path);
};

// To get a base 64 from a file by filepath
const getBase64File = (file_path) => {
  return fs.readFileSync(file_path, { encoding: "base64" });
};

// The entire life cycle of the bot is in this function
const replyTo = async (getStatus = null, afterAll = () => {}) => {
  if (!getStatus) throw new Error("Function to get tweet status is necessary");

  client = require("../client").getClient();

  try {
    // ========================================================
    // NEKOBOT API
    // ========================================================

    // GET IMAGE DATA FROM NEKO API
    const response = await axios.get(
      getWaifuEndpoint(
        available_api_types[random(0, available_api_types.length - 1)]
      )
    );

    // ========================================================
    // TREATS THE IMAGE
    // ========================================================

    // GET METADATA OF IMAGE
    const {
      data: { message: imageUrl, img_name: imageFilename },
    } = response;

    const imageName = imageFilename
      .split(".")
      .filter((_, i, all) => i < all.length - 1)
      .join(".");

    const imagePath = path.normalize(
      path.join(__dirname, "..", "temp", imageFilename)
    );

    const imageWebpPath = path.normalize(
      path.join(__dirname, "..", "temp", imageName + ".webp")
    );

    // DOWNLOAD IMAGE
    await download(imageUrl, imagePath);

    // CLONE THE IMAGE BUT WITH WEBP FORMAT
    await sharp(imagePath).toFormat("webp").toFile(imageWebpPath);

    // ========================================================
    // TWITTER API
    // ========================================================

    // GET TWITTER MEDIA RAW FILE
    const imageData = getBase64File(imageWebpPath);

    // UPLOAD WEBP IMAGE TO TWITTER API
    client.post("media/upload", { media: imageData }, function (error, media) {
      if (error) {
        console.log(error);
      } else {
        const status = getStatus(media);

        client.post("statuses/update", status, function (error) {
          if (error) {
            console.log(error);
          } else {
            console.log("Successfully tweeted an image!");
          }
        });
      }
    });

    // ========================================================
    // DELETE ALL IMAGES AFTER UPLOAD TO TWITTER MEDIA API
    // ========================================================
    removeFile(imagePath);
    removeFile(imageWebpPath);
  } catch (error) {
    const date = new Date();

    const datelog = {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };

    console.log(datelog);

    console.log(error);
  } finally {
    afterAll();
  }
};

module.exports = replyTo;
