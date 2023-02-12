const axios = require("axios");
const { response } = require("express");

const sendSlackMessageOnResponse = async (data, url) => {
  console.log("slack: sending message...");
  const dataFields =
    data && data.response
      ? Object.keys(data.response).map((field) => {
          return field !== "_response_type"
            ? {
                text: `${field} : ${data.response[field]}`,
              }
            : null;
        })
      : [];
  try {
    const response = await axios.post(
      url,
      {
        text: data.is_spam ? "Spam detected" : "New response recieved.",
        attachments: [...dataFields],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log({ slack_response: response.data });
  } catch (error) {
    console.log({ error });
  }
};

module.exports = { sendSlackMessageOnResponse };
