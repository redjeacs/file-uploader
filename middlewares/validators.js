const { body } = require("express-validator");
const db = require("../db/queries");

const emptyMsg = "is required";
const length = "should be between 1 and 50 characters";

exports.signupValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username " + emptyMsg)
    .isLength({ min: 1, max: 50 })
    .withMessage("username " + length)
    .custom(async (value) => {
      const user = await db.getUser("username", value);
      if (user) throw new Error("Username already exists");
      else return true;
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password " + emptyMsg)
    .isLength({ min: 1, max: 50 })
    .withMessage("username " + length),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("password confirmation " + emptyMsg)
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Passwords do not match");
      return true;
    }),
];

exports.signinValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username " + emptyMsg)
    .isLength({ min: 1, max: 50 })
    .withMessage("username " + length),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password " + emptyMsg)
    .isLength({ min: 1, max: 50 })
    .withMessage("username " + length),
];
