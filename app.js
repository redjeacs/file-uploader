const express = require("express");
const app = express();
const path = require("node:path");
const passport = require("passport");
const sessionConfig = require("./config/sessionConfig");

const PORT = process.env.PORT || 8000;

const indexRouter = require("./routes/indexRouter");
const binderRouter = require("./routes/binderRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Session

app.use(sessionConfig());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

require("./config/passportConfig");

// Routes

app.use("/", indexRouter);
app.use("/binder", binderRouter);

// Error

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Server

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Express app listening on port ${PORT}`);
});
