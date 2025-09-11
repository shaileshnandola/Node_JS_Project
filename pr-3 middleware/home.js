const express = require('express');

const port = 8000;

const app = express();

app.set('view engine', 'ejs');

const db = require('./config/db')

const path = require('path');

app.use('/assets', express.static(path.join(__dirname, 'assets')));

const checkage = (req, res, next) => {
    let age = req.query.age;
    if (age >= 18) {
        next();
    } else {
        return res.redirect('/');
    }
}

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/about', checkage, (req, res) => {
    res.render('about');
})

app.get('/contact', checkage, (req, res) => {
    res.render('contact');
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is running on port ${port}`);
})