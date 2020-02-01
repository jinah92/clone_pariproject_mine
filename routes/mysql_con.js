const mysql = require('mysql');

const con = mysql.createConnection({  //연결 객체를 생성
    host: "70.12.113.165",
    user: "test",
    password: "test",
    port: "3307",
    database: "nodejs"
});

module.exports = con; //연결해준 상태를 리턴