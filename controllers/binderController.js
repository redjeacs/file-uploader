const db = require("../db/queries");

exports.renderBinder = async (req, res) => {
  if (req.user) {
    const user = await db.getUser("id", req.user.id);
    res.render("binder", { user: user });
  } else {
    res.render("signin");
  }
};

exports.createFolder = async (req, res) => {
  const userId = req.user.id;
  await db.createFolder(userId);
  res.redirect("/binder");
};

exports.getFolder = async (req, res) => {
  const folderId = req.params.folderId;
};
