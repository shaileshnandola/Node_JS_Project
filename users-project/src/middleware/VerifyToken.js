const jwt = require('jsonwebtoken');
const Usermodel = require('../model/users.model');

const VerifyTokan = async (req, res, next) => {
    let Authorization = req.headers.authorization
    // console.log("Auth: ",Authorization);
    if (!Authorization) {
        return res.json({ message: "Authorization missing" })
    }
    let Token = Authorization.split(" ")[1];
    // console.log('TOken', Token);
    let { id } = jwt.verify(Token, "testing");
    let user = await Usermodel.findById(id)
    // console.log("user: ", user);
    if (!user) {
        res.json({ message: "Authorization success", data: user })
    }
    req.user = user;
    next();
}

module.exports = VerifyTokan;
