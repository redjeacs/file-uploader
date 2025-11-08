const db = require("../db/queries");
const { validationResult, matchedData } = require("express-validator");
const CustomNotFoundError = require("../middlewares/CustomNotFoundError");
const validators = require("../middlewares/validators");
const passport = require("passport");
const bcrypt = require("bcryptjs");

exports.renderHomePage = async (req, res) => {
  res.render("index");
};

exports.renderSignUp = async (req, res) => {
  res.render("signup");
};

exports.signupPost = [
  validators.signupValidator,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signup", { errors: errors.array() });
    }
    try {
      const data = matchedData(req);
      if (!data)
        throw new CustomNotFoundError("provided user information is invalid");
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await db.createUser(req.body.username, hashedPassword);
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];

exports.renderSignin = async (req, res) => {
  res.render("signin");
};

exports.signinPost = [
  validators.signinValidator,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).render("signin", { errors: errors.array() });
    try {
      const data = matchedData(req);
      if (!data) throw new CustomNotFoundError("login information is invalid!");
      passport.authenticate("local", {
        successRedirect: "/", //change to /library later
        failureRedirect: "/signin",
      })(req, res, next);
    } catch (err) {
      return next(err);
    }
  },
];

exports.signoutGet = async (req, res, next) => {
  req.logout(async (err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
