require("dotenv").config();

process.argv.forEach((value, index) => console.log(index + " => " + value));

export const NODE_ENV = process.env.NODE_ENV;
export const MONGO_URI = process.env.MONGO_URI || "";
export const IS_CLUSTER = process.argv[2] === "CLUSTER" ? true : false;
export const PORT = parseInt(process.argv[3]) || process.env.PORT || 8080;
export const FACEBOOK_CLIENT_ID = process.argv[4]
    ? process.argv[4]
    : process.env.FACEBOOK_CLIENT_ID;
export const FACEBOOK_CLIENT_SECRET = process.argv[5]
    ? process.argv[5]
    : process.env.FACEBOOK_CLIENT_SECRET;
export const GMAIL_USER = process.env.GMAIL_USER;
export const GMAIL_USER_PASS = process.env.GMAIL_USER_PASS;
export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
export const TWILIO_NUMBER = process.env.TWILIO_NUMBER;
export const TWILIO_NUMBER_WHATSAPP = process.env.TWILIO_NUMBER_WHATSAPP;
