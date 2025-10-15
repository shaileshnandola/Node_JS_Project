const jwt = require('jsonwebtoken');
const Usermodel = require('../model/user.model');

const VerifyTokan =async (req, res, next) => {
    let Authorization = req.headers.authorization
    if (!Authorization) {
        return res.json({ message: "Authorization missing" })
    }
    let Token = Authorization.split(" ")[1];
    let {userId}=jwt.verify(Token, "testing");
    let user=await Usermodel.findById(userId)
    if(!user){
        res.json({message:"Authorization success"})
    }
    req.user=user;
    next();
}
module.exports = VerifyTokan