let client = null;

// All Quotes Reply Feature Listener is here
const WaifuBotQuoteFeature = () => {
  console.log("ok");
};

const init = (clientInstance) => {
  client = clientInstance;

  // Init Waifu Listener for Quotes Event Feature
  WaifuBotQuoteFeature();
};

module.exports = init;
