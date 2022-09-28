import 'dotenv/config';

const config = {
  sess: {
    options: {
      secret: 'secreto',
      cookie: {
        httpOnly: false,
        secure: false
      },
      rolling: true,
      resave: true,
      saveUninitialized: false
    }
  },
  db: {
    connstr: process.env.MONGO_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  passport: {
    fb: {
      clientID: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRET,
      profileFields: ['id', 'name', 'emails', 'photos']
    }
  },
  srv: {
    port: process.env.PORT,
  },
  twilio: {
    auth: {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN
    },
    options: {
      dev_mail: process.env.DEV_MAIL,
      dev_pass: process.env.DEV_PASS,
      dev_num: process.env.DEV_NUM,
      twilio_num: '+15715209185',
      wsp_num: '+14155238886'
    }
  }
};

export default config;