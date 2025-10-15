const User = require('../model/users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const path = require("path")
const fs = require('fs')

module.exports.registerUser = async (req, res) => {
    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        let imagepath = '';
        if (req.file) {
            imagepath = `/uploads/${req.file.filename}`;
        }
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            gender: req.body.gender,
            contact: req.body.contact,
            role: req.body.role,
            profile: imagepath
        });

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.LoginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        let token = jwt.sign({ id: user._id }, "testing")
        res.status(200).json({ message: 'Login successful', data: token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.allAdmin = async (req, res) => {
    try {
        const users = await User.find({isDelete:false}).select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports.myProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User profile fetched successfully', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports.deleteMyProfile = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.profile=="") {
      let oldImagePath = path.join(__dirname, '..', user.profile);
      fs.unlinkSync(oldImagePath,)
    }
     user = await User.findByIdAndUpdate(user, { isDelete: true }, { new: true });

        return res.json({ message: "User soft deleted successfully", status: 200, data: user });
    } catch (err) {
        console.log("Delete Error:", err);
        return res.json({ message: "Server Error", status: 500});
    }
};

module.exports.updateMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let updateData = { ...req.body };

        if (req.file) {
            if (user.profile) {
                const oldImagePath = path.join(__dirname, '..', user.profile);
                fs.unlink(oldImagePath, (err) => {
                    if (err) console.log('Error deleting old profile image:', err);
                    else console.log('Old profile image deleted successfully');
                });
            }

            updateData.profile = `/uploads/${req.file.filename}`;
        }

        const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, { new: true }).select('-password');

        res.status(200).json({ message: 'User profile updated successfully', data: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// manager controller

module.exports.addManager = async (req, res) => {
  try {
    let manager = await User.findOne({ email: req.body.email });
        if (manager) {
            return res.status(400).json({ message: 'manager already exists' });
        }
        let imagepath = '';
        if (req.file) {
            imagepath = `/uploads/${req.file.filename}`;
        }
        let hashedPassword = await bcrypt.hash(req.body.password, 10);
        manager = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            gender: req.body.gender,
            contact: req.body.contact,
            role: req.body.role,
            profile: imagepath
        });

        res.status(200).json({ message: 'manager registered successfully' });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error", status: 500 });
  }
};
module.exports.allManager = async (req, res) => {
  try {
    const allManager = await User
      .find({ role: "manager", isDelete: false })
      .select("-password");
    return res.json({
      message: "All Manager Success",
      status: 200,
      data: allManager,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error", status: 501 });
  }
};

module.exports.editManager = async (req, res) => {
  try {
    const id = req.query.id;
    console.log(req.body);
    console.log(req.file);
    const single = await User.findById(id).select("-password");
    console.log(single);
    if (!single) {
      return res.json({ message: "No Data Found By This Id", status: 404 });
    }
    if (req.file) {
      if (single.profile) {
        oldPath = `..${single.profile}`;
        fs.unlinkSync(path.join(__dirname, oldPath));
        console.log("Profile Delete");
      }
      req.body.profile = `/uploads/${req.file.filename}`;
    }
    await User.findByIdAndUpdate(id, req.body, { new: true });
    const editedManager = await User.findById(id);
    return res.json({
      message: "Edit Manager Success",
      status: 200,
      data: editedManager,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error", status: 501 });
  }
};

module.exports.deleteManager = async (req, res) => {
  try {
    const id = req.query.id;
    const single = await User.findById(id);
    console.log(single);
    if (!single) {
      return res.json({ message: "Data Not Found !", status: 404 });
    }
    if (single.isDelete) {
      return res.json({ message: "Already Deleted This Manager", status: 501 });
    }
    await User.findByIdAndUpdate(id, { isDelete: true }, { new: true });
    return res.json({ message: "Delete Manager Success", status: 200 });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal Server Error", status: 501 });
  }
};
