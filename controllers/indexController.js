const db = require("../db/queries");
const { validationResult, matchedData } = require("express-validator");
const CustomNotFoundError = require("../middlewares/CustomNotFoundError");
const validators = require("../middlewares/validators");

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
      return res.status(400).render("register", { errors: errors.array() });
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

exports.signinPost = async (req, res, next) => {
  // sign in
};
