import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER_WHATSAPP } from "../../config/globals.js";
  
  const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  
  export default (text, number) => {
    client.messages
      .create({
        body: text,
        from: `whatsapp:${TWILIO_NUMBER_WHATSAPP}`,
        to: `whatsapp:${number}`,
      })
      .then((message) => console.log(message.sid))
      .catch(console.log);
  };
  