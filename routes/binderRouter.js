const { Router } = require("express");
const binderRouter = Router();
const binderController = require("../controllers/binderController");

binderRouter.get("/", binderController.renderBinder);
binderRouter.get("/folder", binderController.createFolder);
binderRouter.get("/:folderId", binderController.getFolder);

module.exports = binderRouter;
