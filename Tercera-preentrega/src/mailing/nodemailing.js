import { createTransport } from "nodemailer";
import { GMAIL_USER, GMAIL_USER_PASS } from "../config/globals.js";

const transporterEthereal = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: 'donny67@ethereal.email',
    pass: 'pgJngkC9hHsdaG5bfU',
  },
});

const transporterGmail = createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_USER_PASS,
  },
});

const transporter = {
  transporterGmail: transporterGmail,
  transporterEthereal: transporterEthereal,
};

export default transporter;
