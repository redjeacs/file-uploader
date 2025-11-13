const { Router } = require("express");
const binderRouter = Router();
const binderController = require("../controllers/binderController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

binderRouter.get("/", binderController.renderBinder);
binderRouter.get("/folder", binderController.createFolder);
binderRouter.get("/folder/:folderId", binderController.renderFolder);
binderRouter.get("/folder/delete/:folderId", binderController.deleteFolder);
binderRouter.get(
  "/folder/edit/:folderId",
  binderController.renderEditFolderForm
);
binderRouter.post("/folder/edit/:folderId", binderController.editFolder);

binderRouter.post("/file", upload.single("file"), binderController.createFile);
binderRouter.get("/file/:fileId", binderController.renderFile);
binderRouter.get("/file/edit/:fileId", binderController.renderEditFileForm);
binderRouter.get("/file/delete/:fileId", binderController.deleteFile);
binderRouter.post("/file/edit/:fileId", binderController.editFile);

module.exports = binderRouter;
