const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", indexController.renderHomePage);

indexRouter.get("/signup", indexController.renderSignUp);
indexRouter.post("/signup", indexController.signupPost);
indexRouter.get("/signin", indexController.renderSignin);
indexRouter.post("/signin", indexController.signinPost);
indexRouter.get("/signin/demo", indexController.demoSignin);
indexRouter.get("/signout", indexController.signoutGet);

module.exports = indexRouter;
