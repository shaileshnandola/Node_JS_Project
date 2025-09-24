const express = require('express');
const port = 8001;
const path = require('path');

const app = express();
const db = require("./config/db");
const cookieParser = require('cookie-parser');
const passport = require('passport');
const localstratergy = require('./config/localstratergy')
const session = require('express-session')

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'assets')));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());


app.use(session({
    name: "testing",
    secret: "admin-panel",
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))

app.use(passport.session());
app.use(passport.initialize())
app.use(passport.setAuthenticateUser);

app.use('/', require("./routes/index"));


app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`server is running on http://localhost:${port}`);
    }
});
