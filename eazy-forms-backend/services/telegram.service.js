const axios = require("axios");
const { htmlTelegramMessageTemplate } = require("../helpers/templates");

const sendTelegramMessageOnResponse = async (chat_id, token, data) => {
  console.log("telegram: sending message...");
  // const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=Hello+World`;
  let url = "https://api.telegram.org/bot" + token + "/sendMessage";
  try {
    const response = await axios.post(url, {
      chat_id,
      text: htmlTelegramMessageTemplate(true, data),
      parse_mode: "HTML",
    });
    console.log({ telegram_response: response.data || response.response.data });
  } catch (error) {
    console.log({ error });
  }
};

module.exports = { sendTelegramMessageOnResponse };
