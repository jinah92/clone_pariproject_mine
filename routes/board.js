const express = require('express');
const con = require('./mysql_con');
const router = express.Router();

router.get('/write_form', (req, res)=>{
    res.render('report_board', {title: "게시글 등록"});
});

router.get('/read', (req, res)=>{
    res.render('view_board', {title: "게시판 조회"});
});

router.post('/write', (req, res)=>{
    //res.json({message: `확인`});
    
    const time=req.body.time;    //발견 시간
    const r_title=req.body.r_title;
    const threat_type = req.body.threat_type;
    const os = req.body.os;
    const victim_ip = req.body.victim_ip;
    const victim_port = req.body.victim_port;
    const attack_ip = req.body.attack_ip;
    const r_comment=req.body.r_comment;
    
    let sql = `INSERT INTO pp_board (time, title, threat_type, os, victim_ip, victim_port, attack_ip, comment) VALUES ('${time}', '${r_title}', '${threat_type}', '${os}', ${victim_ip}, ${victim_port}, ${attack_ip}, '${r_comment}')`;
    
    console.log(time + ':' + threat_type + ':' + os + ':' + victim_ip  + ':' + r_title + ':' + r_comment);

    con.query(sql, (err, result)=>{
        if(err) {
            console.log('Insert Failed');
            console.log(err);
            res.json({message: `게시글 등록 실패`});
        } else {
            console.log('Insert Success');
            res.json({message: `게시글 등록 성공`});
        }

        con.end();
    });
});

module.exports = router;