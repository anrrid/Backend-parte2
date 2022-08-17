
import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER } from "../config/globals.js";
  
  const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  
  export default (user, text) => {
    client.messages
      .create({
        body: `El usuario ${user} escribio administrador y el siguiente texto: ${text}`,
        from: TWILIO_NUMBER,
        to: "+541135826970",
      })
      .then((message) => console.log(message.sid))
      .catch(console.log);
  };
  