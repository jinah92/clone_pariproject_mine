const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  let logined = 0;
  if (req.session.email) {
    logined = 1;
  }
  res.render("index", { flag: logined, name: req.session.name });
});

module.exports = router;