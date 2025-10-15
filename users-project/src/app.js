const express = require('express')
const port = 8001
const app = express();

//Db connection
const dbConnect = require('./config/dbConnect')
dbConnect();

//middleware
app.use(express.urlencoded())
app.use(express.json())
app.use("/uploads",express.static("src/uploads"));

//routes
app.use("/api" ,require('./routes/index.routes'))

app.listen(port, () => console.log(`server start at:http://localhost:${port}`));
