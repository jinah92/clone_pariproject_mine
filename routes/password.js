const con = require("./mysql_con");
const express = require("express");
const router = express.Router();

router.get("/form", (req, res, next) => {
  res.render("password_form", { title: "비밀번호 찾기" });
});

router.post("/process", (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;

  con.query(
    `SELECT * FROM pp_members where email='${email}'`,
    (err, result, fields) => {
      if (err) {
        //con.end();
        console.log(err);
        res.json({ message: `비밀번호 찾기 오류입니다.`, flag: 0 });
      } else if (
        name == result[0].name &&
        email == result[0].email &&
        phone == result[0].phone
      ) {
        const pw = result[0].pw;
        res.json({
          message: `비밀번호는 ${pw}입니다.`,
          flag: 1
        });
        } else {
          res.json({ message: `정보가 정확하지 않습니다.`, flag: 0 });
        }
    }
  ); //end query
});

module.exports = router;