const { validationResult, matchedData } = require("express-validator");
const CustomNotFoundError = require("../middlewares/CustomNotFoundError");
const db = require("../db/queries");
const { formatDate } = require("../middlewares/formatter");
const validators = require("../middlewares/validators");

exports.renderBinder = async (req, res) => {
  if (req.user) {
    const userId = req.user.id;
    const data = await db.getUser("id", userId);
    data.folders.forEach((folder) => {
      folder.formattedCreatedAt = formatDate(folder.createdAt);
    });
    data.files.forEach((file) => {
      file.formattedUploadedAt = formatDate(file.uploadedAt);
    });
    res.render("binder", { data: data });
  } else {
    res.render("signin");
  }
};

exports.renderFolder = async (req, res) => {
  const folderId = req.params.folderId;
  const data = await db.getFolder("id", folderId);
  res.render("folder", { data: data });
};

exports.renderFile = async (req, res) => {
  const fileId = req.params.fileId;
  const data = await db.getFile("id", fileId);
  res.render("file", { data: data });
};

exports.createFolder = async (req, res) => {
  const userId = req.user.id;
  await db.createFolder(userId);
  res.redirect("/binder");
};

exports.createFile = async (req, res, next) => {
  const file = req.file;
  if (!file) return res.redirect("/binder");
  try {
    const folderId = req.params.folderId;
    if (!folderId) {
      const userId = req.user.id;
      await db.createFile(file, userId);
    } else {
      await db.createFile(file, userId, folderId);
    }
    res.redirect("/binder");
  } catch (err) {
    return next(err);
  }
};

exports.deleteFolder = async (req, res) => {
  const folderId = req.params.folderId;
  await db.deleteFolder(folderId);
  res.redirect("/binder");
};

exports.deleteFile = async (req, res) => {
  const fileId = req.params.fileId;
  await db.deleteFile(fileId);
  res.redirect("/binder");
};

exports.renderEditFolderForm = async (req, res) => {
  const folderId = req.params.folderId;
  res.render("editFolder", { folderId: folderId });
};

exports.editFolder = [
  validators.editValidator,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("editFolder", { errors: errors.array() });
    }
    try {
      const data = matchedData(req);
      if (!data) throw new CustomNotFoundError("login information is invalid!");
      const folderId = req.params.folderId;
      await db.editFolder(folderId, data.name);
      res.redirect("/binder");
    } catch (err) {
      return next(err);
    }
  },
];

exports.renderEditFileForm = async (req, res) => {
  const fileId = req.params.fileId;
  res.render("editFile", { fileId: fileId });
};

exports.editFile = [
  validators.editValidator,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("editFile", { errors: errors.array() });
    }
    try {
      const data = matchedData(req);
      if (!data) throw new CustomNotFoundError("login information is invalid!");
      const fileId = req.params.fileId;
      await db.editFile(fileId, data.name);
      res.redirect("/binder");
    } catch (err) {
      return next(err);
    }
  },
];
