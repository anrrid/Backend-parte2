import userModel from "../daos/models/userSchema.js"
import passport from "../auth/passportLocal.js"
import { authenticate } from "passport"

export const singUp = authenticate ("singUp", {
    failureRedirect: "/failSingUp"
})

export async function singUpLocal (req, res) {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleDateString();
    const email = {
        from: "Server Node js",
        to: ["email@email", process.env.GMAIL_USER],
        subject: `New user: ${req.body.email} @ ${date}, ${time}`,
        html: `User ${req.body.user}
        Data:
        name ${req.body.name}
        lastname ${req.body.lastname}
        age ${req.body.age}
        phone ${req.body.number}
        address ${req.body.address}
        email ${req.body.email}
        avatar ${req.body.avatar}`,

    };
    //AGREGAR MAILINGSERVICE

    res.redirect("/login")
};

export const logIn = authenticate ("login", {
    failureRedirect: "/failLogin"
});

export async function logInLocal (req, res) {
    res.redirect("/welcome")
}

export async function LogOut (req, res) {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleDateString();
    const email = {
        from: "Server Node js",
        to: ["email@email", req.session.passport.user.email],
        subject: `User disconnected: ${req.body.email}  ${date}, ${time}`,
        html: `user ${req.session.passport.user.name} disconnected on ${date} at ${time}`,
        attachemnts: [
            {
                path: req.session.passport.user.photo,
            }
        ]
    };
    //mailingService falta
    req.session.destroy();
    res.clearCookie("isRegistered");
    res.redirect("/bye")
};
