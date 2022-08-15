const nodemailer = require("nodemailer");
const { GMAIL_USER, GMAIL_USER_PASS } = require("../config/globals");

const transporterEthereal = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: 'donny67@ethereal.email',
    pass: 'pgJngkC9hHsdaG5bfU',
  },
});

const transporterGmail = nodemailer.createTransport({
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

module.exports = transporter;
