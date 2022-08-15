import passport, { use, serializeUser, deserializeUser } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { createHash, isValidPassword } from "./bcrypt/bcrypt";
import { findOne, create, findById } from "../dao/models/userMongoose";

use(
  "local-login",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField:
        "email",
      passwordField: "password",
    },
    async function (req, username, password, done) {
      console.log("run Passport Login");
      console.log(req.body);
      try {
        const userFinded = await findOne({ email: req.body.email });

        if (!userFinded) {
          console.log("User not found");
          return done(
            null,
            false,
            console.log("message", "User not found")
          );
        }

        if (!isValidPassword(req.body.password, userFinded.password)) {
          console.log("Contraseña incorrecta");
          return done(
            null,
            false,
            console.log("message", "Incorrect user or password")
          );
        }

        console.log(userFinded);

        return done(null, userFinded);
      } catch (error) {
        console.log(error);
      }
    }
  )
);

use(
  "signup-local",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField:
        "email",
      passwordField: "password",
    },
    async function (req, username, password, done) {
      /*NOSE SI EXISTE ESE findOrCreate */
      // userModel.findOrCreate({ username: username }, function (err, user) {
      //   if (err) {
      //     return done(err);
      //   }
      //   if (!user) {
      //     return done(null, false);
      //   }
      //   if (!user.verifyPassword(password)) {
      //     return done(null, false);
      //   }
      //   return done(null, user);
      // });
      console.log("run singup-local passport");

      try {
        console.log("Ingresó a authPassportLocal => Sign Up");
        const userFinded = await findOne({ email: req.body.email });

        if (userFinded) {
          return done(
            null,
            false,
            console.log("There is a registered user with his email")
          );
        } else {
          const userToCreate = {
            name: req.body.name,
            lastname: req.body.lastname,
            age: req.body.age,
            number: req.body.number,
            address: req.body.address,
            email: req.body.email,
            avatar: `/static/avatar/${req.file.filename}`,
            password: createHash(req.body.password),
          };

          console.log(userToCreate);

          await create(userToCreate);

          return done(null, userToCreate);
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);

serializeUser(function (user, done) {
  // done(null, user.email);
  done(null, user);
});

deserializeUser(async function (id, done) {
  // userModel.findById(id, function (err, user) {
  //   done(err, user);
  // });

  try {
    const userFinded = findById(id);
    return done(null, userFinded);
  } catch (err) {
    console.log(err);
  }
});

export default passport;
