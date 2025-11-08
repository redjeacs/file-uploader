exports.renderBinder = async (req, res) => {
  if (req.user) {
    res.render("binder");
  } else {
    res.render("signin");
  }
};
