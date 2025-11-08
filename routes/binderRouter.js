const { Router } = require("express");
const binderRouter = Router();
const binderController = require("../controllers/binderController");

binderRouter.get("/", binderController.renderBinder);

module.exports = binderRouter;
