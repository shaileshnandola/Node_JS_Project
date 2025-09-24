const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://shailesh:shailesh123@cluster0.37ay1t4.mongodb.net/blogging")

const db = mongoose.connection;

db.once('open', (err) => {
    err ? console.log(err) : console.log('db is connected');
})