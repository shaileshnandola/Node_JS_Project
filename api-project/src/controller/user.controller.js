const Usermodel = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const path = require("path")
const fs = require('fs')

exports.registerUser = async (req, res) => {
    try {
        let user = await Usermodel.findOne({ email: req.body.email });
        if (user) {
            return res.json({ message: 'User is already registered' });
        }

        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/${req.file.firstname}`;
        }

        let hashPassword = await bcrypt.hash(req.body.password, 10);
        user = await Usermodel.create({
            ...req.body,
            password: hashPassword,
            profile: imagePath
        });

        return res.json({
            message: 'User registered success',
            status: 201,
        });
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
};


exports.LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await Usermodel.findOne({ email });
        if (!user) {
            return res.json({ message: 'User not found', status: 404 });
        }

        let Matchpass = await bcrypt.compare(password, user.password);
        if (Matchpass) {
            let token = jwt.sign({ userId: user._id }, 'testing')
            return res.json({ message: 'success', status: 201, data: token });
        } else {
            return res.json({ message: 'invalide credential', status: 401 })
        }

    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
};

module.exports.allusers = async (req, res) => {
    try {
        let users = await Usermodel.find().select("-password");
        return res.json({ message: "Fetch all User...", status: 200, data: users })
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
}
module.exports.myprofile = async (req, res) => {
    try {
        return res.json({ message: "Fetch profile", status: 200, data: req.user })
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
}
module.exports.editprofile = async (req, res) => {
    try {
        let user = req.user;
        if (req.file) {
            if (user.profile != "") {
                let imagePath = path.join(__dirname, "..", user.profile);
                try {
                    await fs.unlinkSync(imagePath)
                } catch (error) {
                    console.log(error);
                    return res.json({ message: 'file  missing' });
                }
            }
            req.body.profile = `/uploads/${req.file.filename}`
        }
        user = await Usermodel.findByIdAndUpdate(user._id, req.body, { new: true })
        return res.json({ message: "profile updated", data: user })
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
}
module.exports.deleteprofile = async (req, res) => {
    try {
        let userId = req.query.userId;
        let user = await Usermodel.findById(userId)
        if(!user){
            res.json({message:"user not found"})
        }
        if (req.file) {
            if (user.profile != "") {
                let imagePath = path.join(__dirname, "..", user.profile);
                try {
                    await fs.unlinkSync(imagePath)
                } catch (error) {
                    console.log(error);
                    return res.json({ message: 'file  missing' });
                }
            }
            req.body.profile = `/uploads/${req.file.filename}`
        }
        user = await Usermodel.findByIdAndDelete(user._id)
        return res.json({ message: "delete success" })
    } catch (error) {
        console.log(error);
        return res.json({ message: 'Server Error', status: 500 });
    }
}
