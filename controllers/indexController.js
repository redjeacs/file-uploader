const db = require("../db/queries");

exports.renderHomePage = async (req, res) => {
  res.render("index");
};

exports.renderSignUp = async (req, res) => {
  res.render("signup");
};

exports.signupPost = async (req, res, next) => {
  // sign up
};

exports.renderSignin = async (req, res) => {
  res.render("signin");
};

exports.signinPost = async (req, res, next) => {
  // sign in
};
