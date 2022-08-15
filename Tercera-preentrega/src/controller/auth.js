
import userModel from "../daos/models/userSchema.js";
userModel;

import { mailingEthereal, mailingGmail } from "../daos/services/mailingContainer.js";
import { authenticate } from "../auth/passportLocal.js";

export const signUpLocal = authenticate("signup-local", {
  failureRedirect: "/failsignup",
});

export async function signUpLocalCallback(req, res, next) {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const mailOptions = {
    from: "Server Node js",
    to: ["donny67@ethereal.email", process.env.GMAIL_USER],
    subject: `New user: ${req.body.email} @ ${date}, ${time}`,
    html: `User ${req.body.user} // ${date}, ${time}. 
    Data:
        name ${req.body.name}
        lastname ${req.body.lastname}
        age ${req.body.age}
        phone ${req.body.number}
        address ${req.body.address}
        email ${req.body.email}
        avatar ${req.body.avatar}`,
  };
  mailingEthereal(mailOptions);
  mailingGmail(mailOptions);

  res.redirect("/login");
}

export const logIn = authenticate("local-login", {
  failureRedirect: "/faillogin",
});

export async function logInCallback(req, res, next) {
  res.redirect("/welcome");
}


/*Controlador de deslogeo */
export async function logOut(req, res, next) {
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const mailOptions = {
    from: "Servidor de Node.js",
    to: ["donny67@ethereal.email", req.session.passport.user.email],
    subject: `user ${req.session.passport.user.email} disconnected on ${date} at ${time}`,
    html: `<h2>${req.session.passport.user.firstName} ${req.session.passport.user.lastName} user disconnected on ${date} at ${time}</h2>`,
    attachments: [
      {
        // filename and content type is derived from path
        path: req.session.passport.user.photo,
      },
    ],
  };
  mailingEthereal(mailOptions);
  mailingGmail(mailOptions);
  req.session.destroy();
  res.clearCookie("isRegistered");
  res.redirect("/goodbye");
}
