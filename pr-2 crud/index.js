const express = require('express');

const app = express();

const port = 8000;
const path = require('path')

app.set('view engine', 'ejs');

app.use(express.urlencoded());
app.use('/assets', express.static(path.join(__dirname, 'assets')))

let users = [
    { id: 111, name: "shailesh", email: "shailesh123@gmail.com", password: 1244 },
    { id: 222, name: "move", email: "move@gmail.com", password: 12445 }
];

app.get('/', (req, res) => {
    return res.render('viewuser', {
        userslist: users
    });
});

app.get('/adduser', (req, res) => {
    return res.render('add-user');
});

app.post('/adddata', (req, res) => {
    const { name, email, password } = req.body;
    let obj = {
        id: Math.floor(Math.random() * 100000),
        name,
        email,
        password
    };
    users.push(obj);
    console.log('Record added');
    return res.redirect('/');
});

app.get('/deleteuser', (req, res) => {
    let id = req.query.id;
    let deletedata = users.filter(user => user.id != id);
    users = deletedata
    console.log('record deleted');

    return res.redirect('/');
});

app.get('/edituser', (req, res) => {
    let id = req.query.id;
    let single = users.find(user => user.id == id);
    return res.render('edit-user', {
        single
    });
});
app.post('/updatedata', (req, res) => {
    const { editid, name, email, password } = req.body;

    let up = users.map((val) => {
        if (val.id == editid) {
            val.name = name;
            val.email = email;
            val.password = password;
        }
        return val
    })
    users = up;
    console.log('record updated');
    return res.redirect('/')
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is running on port: ${port}`);
});
