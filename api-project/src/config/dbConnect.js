const mongoose = require('mongoose');

const dbConnect =async () => {
     await mongoose.connect('mongodb://localhost:27017/api-project')
            .then (() => console.log(`db connected`))
            .catch((err) => console.log("err"));
}
module.exports = dbConnect;