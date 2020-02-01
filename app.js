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

app.use('/board', boardRouter);
app.use('/', indexRouter);

app.listen(3001, ()=>{
    console.log("[Server Run] ChoiKang_pairProject ... ");
});
