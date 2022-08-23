import transporter from "../../mailing/nodemailing.js";
const { transporterEthereal, transporterGmail } = transporter

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
  