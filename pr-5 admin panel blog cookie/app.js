const express = require('express');
const port = 8001;
const path = require('path');

const app = express();
const db = require("./config/db");
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'views'));

app.use(express.urlencoded()); 
app.use(express.static(path.join(__dirname, 'assets')));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser());

app.use('/', require("./routes/index"));          
app.use('/admin', require('./routes/admin.routes')); 
app.use('/admin', require('./routes/blog.routes')); 


app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`server is running on http://localhost:${port}`);
    }
});
