const con = require("./mysql_con");
const express = require("express");
const router = express.Router();

router.post("/emailcheck", (req, res) => {
  const email = req.body.email;
  con.query(
    `SELECT * FROM pp_members where email='${email}'`,
    (err, result, fields) => {
      if (err) {
        //con.end();
        console.log(err);
        res.json({ message: `중복확인 실패했습니다.` });
      } else if (!result[0]) {
        res.json({ message: `사용가능` });
      } else {
        res.json({ message: `사용불가` });
      }
    }
  );
});

router.get("/form", (req, res, next) => {
  res.render("login_form", { title: "로그인" });
});

router.post("/process", (req, res, next) => {
  const email = req.body.email;
  const pw = req.body.pw;

  con.query(
    `SELECT * FROM pp_members where email='${email}'`,
    (err, result, fields) => {
      if (err) {
        //con.end();
        console.log(err);
        res.json({ message: `로그인 실패 하셨습니다.` });
      } else {
        if (result[0]) {
          //email이 존재하면
          if (pw == result[0].pw) {
            //email과 pw가 일치한다면
            console.log(result[0]);
            const name = result[0].name;
            req.session.email = email;
            req.session.name = name;
            req.session.m_no = result[0].m_no;
            //con.end();
            res.json({
              message: `${name}님이 로그인 하셨습니다.`,
              flag: 1
            });
          } else {
            res.json({
              message: `비밀번호가 정확하지 않습니다.`,
              flag: 0
            });
          }
        } else {
          //이메일이 없으므로
          //con.end();
          res.json({
            message: "존재하지 않는 이메일입니다.",
            flag: 0
          });
        }
      }
    }
  ); //end query
});
module.exports = router;