const admin = require("firebase-admin");
const { htmlResponseTemplate } = require("../../helpers/templates");
const { dataValidation } = require("../../middlewares/validation.middleware");
const formSchema = require("../../models/form/formSchema");
const responseSchema = require("../../models/response/responseSchema");
const userSchema = require("../../models/user/userSchema");
const { sendSlackMessageOnResponse } = require("../../services/slack.service");
const {
  sendTelegramMessageOnResponse,
} = require("../../services/telegram.service");

const submit = async (req, res) => {
  try {
    const { fid } = req.params;
    const { _secret, provider_form, is_spam, ...finalResponse } = req.body;
    const redirect = req.body._redirect;
    let newRedirect = null;
    if (redirect) {
      newRedirect = new URL(redirect);
      console.log(newRedirect.protocol);
    }
    const newResponse = new responseSchema({
      fid,
      is_spam,
      response: finalResponse,
    });
    console.log({ finalResponse });
    const responseSave = await newResponse.save();
    //call telegram service if present
    if (provider_form.telegram_token && provider_form.telegram_chat_id) {
      sendTelegramMessageOnResponse(
        provider_form.telegram_chat_id,
        provider_form.telegram_token,
        responseSave._doc
      );
    }

    //call slack service if present
    if (provider_form.slack_url) {
      sendSlackMessageOnResponse(responseSave._doc, provider_form.slack_url);
    }
    return res.status(200).json({success:true})
    //check if redirect present
    // if (newRedirect) {
    //   return res.status(301).redirect(newRedirect);
    // } else {
    //   //check the return response type
    //   if (response_type === "html") {
    //     return res.send(htmlResponseTemplate(true, responseSave._doc));
    //   } else {
    //     return res.send({
    //       success: true,
    //       response: responseSave._doc,
    //     });
    //   }
    // }
    
  } catch (error) {
    console.log({ error });
    return res.send({
      success: false,
      error: { message: "Something went wrong" },
    });
  }
};

module.exports = { submit };
