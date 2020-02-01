const express = require('express');
const con = require('./mysql_con');
const router = express.Router();

router.get('/view_board', (req, res)=>{
    const sql = `SELECT * FROM pp_board ORDER BY upload_time DESC`;
      con.query(sql, (err, result)=>{
          if(err){
              console.error(err);
              res.json({message: "시스템 오류!"});
          }else{
              console.log(req.session.email);
              if(req.session.email){
                console.log('board read OK');
                console.log(result);       
                let flag = 1;
                let name = req.session.name;
                res.render("view_board", {result, flag, name});
                
              } else {
                res.json({message: "로그인이 필요합니다!"});
              }
        
          }
      });
});



router.get('/write_form', (req, res)=>{
    
    if(req.session.email){
        res.render('report_board', {title: "게시글 등록"});
    } else{
        res.json({message: `로그인이 필요합니다!`});
    }
    
});


router.post('/write', (req, res)=>{
    //res.json({message: `확인`});
    const m_no = req.session.m_no;
    const time=req.body.time;    //발견 시간
    const title=req.body.title;
    const threat_type = req.body.threat_type;
    const os = req.body.os;
    const victim_ip = req.body.victim_ip;
    const victim_port = req.body.victim_port;
    const attack_ip = req.body.attack_ip;
    const comment=req.body.comment;
    
    //let sql = `INSERT INTO pp_board (time, title, threat_type, os, victim_ip, victim_port, attack_ip, comment) VALUES ('${time}', '${r_title}', '${threat_type}', '${os}', ${victim_ip}, ${victim_port}, ${attack_ip}, '${r_comment}')`;
    let sql = `INSERT INTO pp_board (m_no, title, comment) VALUES ('${m_no}', '${title}', '${comment}')`;
    console.log(m_no);
    console.log(title);
    console.log(comment);
    console.log(time + ':' + threat_type + ':' + os + ':' + victim_ip  + ':' + title + ':' + comment);

    con.query(sql, (err, result)=>{
        if(err) {
            console.log('Insert Failed');
            console.log(err);
            res.json({message: `게시글 등록 실패`, flag: 0});
        } else {
            console.log('Insert Success');
            res.json({message: `게시글 등록 성공`, flag: 1});
        }
    });
});

module.exports = router;