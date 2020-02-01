const con = require("./mysql_con");
const express = require("express");
const router = express.Router();

router.post("/", (req, res, next) => {
  console.log("Connected!");
  const name = req.body.name;
  const email = req.body.email;
  const pw = req.body.pw;
  const usr_type = req.body.usr_type;
  const phone = req.body.phone;
  const address = req.body.address;
  let sql = `SELECT * FROM pp_members where email='${email}'`;
  con.query(sql, function(err, result) {
    if (err) {
      console.log("insert fail", err);
      res.json({ message: "회원가입 실패" });
      res.json({ message: "회원가입 실패(중복확인 부분)" });
    } else {
      if (result[0]) {
        //email이 존재하면 // flag는 window 안 꺼지게 할려고
        res.json({ message: "이메일이 중복됩니다.", flag: 0 });
      } else {
        //email이 중복되지 않으면
        sql = `INSERT INTO pp_members (name, email, pw, usr_type, phone, address) VALUES ('${name}', '${email}', '${pw}', '${usr_type}', ${phone}, '${address}')`;
        con.query(sql, function(err, result) {
          if (err) {
            console.log("insert fail", err);
            res.json({ message: "회원정보를 정확히 입력해주세요.", flag: 0 });
          } else {
            console.log("1 record inserted");
            res.json({ message: "회원가입 되었습니다.", flag: 1 });
          }
        });
      }
    }
  });
});

module.exports = router;