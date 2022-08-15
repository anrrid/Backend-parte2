import { transporterEthereal, transporterGmail } from "../../mailing/nodemailing.js";
  
  export function   mailingEthereal(mailOptions) {
    transporterEthereal.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return err;
      }
      console.log(info);
    });
  }
  
  export function   mailingGmail(mailOptions) {
    transporterGmail.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return err;
      }
      console.log(info);
    });
  }
  