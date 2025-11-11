const db = require("../db/queries");
const { formatDate } = require("../middlewares/formatter");

exports.renderBinder = async (req, res) => {
  if (req.user) {
    const userId = req.user.id;
    const data = await db.getUser("id", userId);
    data.folders.forEach((folder) => {
      folder.formattedCreatedAt = formatDate(folder.createdAt);
    });
    data.files.forEach((file) => {
      file.formattedCreatedAt = formatDate(file.createdAt);
    });
    res.render("binder", { data: data });
  } else {
    res.render("signin");
  }
};

exports.createFolder = async (req, res) => {
  const userId = req.user.id;
  await db.createFolder(userId);
  res.redirect("/binder");
};

exports.renderFolder = async (req, res) => {
  const folderId = req.params.folderId;
  const data = await db.getFolder("id", folderId);
  res.render("folder", { data: data });
};
