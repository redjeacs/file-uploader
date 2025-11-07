const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", indexController.renderHomePage);

indexRouter.get("/signup", indexController.renderSignUp);
indexRouter.post("/signup", indexController.signupPost);
indexRouter.get("/signin", indexController.renderSignIn);
indexRouter.post("/signin", indexController.signinPost);

module.exports = indexRouter;
