const { Router } = require("express");
const binderRouter = Router();
const binderController = require("../controllers/binderController");

binderRouter.get("/", binderController.renderBinder);
binderRouter.get("/folder", binderController.createFolder);
binderRouter.get("/folder/:folderId", binderController.renderFolder);
binderRouter.get("/folder/delete/:folderId", binderController.deleteFolder);
binderRouter.get(
  "/folder/edit/:folderId",
  binderController.renderEditFolderForm
);
binderRouter.post("/folder/edit/:folderId", binderController.editFolder);

module.exports = binderRouter;
