const passwordRouter = require("./routes/password");
const logoutRouter = require("./routes/logout");
const contactRouter = require("./routes/contact");
const loginRouter = require("./routes/login");
const boardRouter = require('./routes/board');
const indexRouter = require('./routes/index');
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: "미녀 강사 전은수",
        cookie: {
            httpOnly: true,
            secure: false
        }
    })
);

app.use("/password", passwordRouter);
app.use("/logout", logoutRouter);
app.use("/contact", contactRouter);
app.use("/login", loginRouter);
app.use('/board', boardRouter);
app.use('/index', indexRouter);
app.use('/', indexRouter);

/* app.get('/index', (req, res)=>{
    res.render('index', {flag : 1}, {name: req.session.name});
}); */

//로그인 폼에서 회원가입 폼 렌더링 부분
app.get("/contact_form", (req, res) => {
    res.render("contact_form", { title: "회원가입" });
  });



app.listen(3001, ()=>{
    console.log("[Server Run] ChoiKang_pairProject ... ");
});
