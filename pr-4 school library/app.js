const express = require('express');

const port = 8001;

const app = express();

const db = require("./config/db")

const path = require('path')

const Todomodel = require('./models/todomodel')

app.use(express.urlencoded())

app.set('view engine', 'ejs')

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', async (req, res) => {
    let todos = await Todomodel.find();
    res.render('viewbook', {
        'alltaskdata': todos
    });
})

app.get('/todo', (req, res) => {
    res.render('addbook');
})

app.post('/addtodo', Todomodel.uploads, async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    if (req.file) {
        req.body.image = '/uploads/' + req.file.filename;
    }
    req.body.isbn = Math.floor(Math.random() * 1000000000000);
    await Todomodel.create(req.body);
    return res.redirect('/viewtodo');
})

app.get('/viewtodo', async (req, res) => {
    let alltask = await Todomodel.find();
    return res.render('viewbook', { 'alltaskdata': alltask });
});
 
app.get('/task/:id', async (req, res) => {
    const task = await Todomodel.findById(req.params.id);
    console.log(task);
    res.render('viewsinglebook', {
        task: task
    });
});

app.get('/delete/:id', async (req, res) => {
    await Todomodel.findByIdAndDelete(req.params.id);
    return res.redirect('/viewtodo');
});

app.get('/edit/:id', async (req, res) => {
    const task = await Todomodel.findById(req.params.id);
    res.render('editbook', {
        task: task
    });
});

app.post('/update/:id', Todomodel.uploads, async (req, res) => {
    if (req.file) {
        req.body.image = '/uploads/' + req.file.filename;
    }
    await Todomodel.findByIdAndUpdate(req.params.id, req.body);
    return res.redirect('/viewtodo');
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server is start on port:${port}`);
})