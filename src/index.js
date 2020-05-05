const Twit = require("twit");
const axios = require("axios");
const config = require("./config");

const Twitter = new Twit(config);

const NekoBotLife = async () => {
  try {
    const endpoint = "https://nekobot.xyz/api/image?type=neko";

    const response = await axios.get(endpoint);

    const {
      data: { img_name: imgName, message, color },
    } = response;

    const twitterEndpoint = "/statuses/update";

    const teste = await Twitter.post(twitterEndpoint, {
      status: message,
    });

    console.log(teste);
  } catch (error) {
    const date = new Date();

    const datelog = {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };

    console.log(datelog);

    console.log(error);
  }
};

// 1000 miliseconds = 1 second
// * 60 = 60 seconds = 1 minute
// * 15 = 15 minutes
// Time interval: 15 minutes
const timeInterval = 1000 * 60 * 15;

// Every [timeInterval] execute NekoBotLife to create a Tweet
setInterval(NekoBotLife, timeInterval);

// Init Nekobot life
NekoBotLife();
