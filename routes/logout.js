const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  let message;
  req.session.destroy(() => {
    message = "로그아웃 되었습니다.";
    res.json({ message });
  });
});

module.exports = router;