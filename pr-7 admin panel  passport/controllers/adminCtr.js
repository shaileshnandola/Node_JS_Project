const AddAdmin = require('../models/adminmodel');

const bcrypt = require("bcrypt");

const moment = require("moment");
const path = require('path');
const fs = require('fs')

module.exports.deshboard = async (req, res) => {
    try {
        return res.render("deshboard")
    }
    catch (err) {
        console.log(err);
        return res.redirect("/")
    }
}
module.exports.addAdmin = async (req, res) => {
    try {
        return res.render("addAdmin")
    }
    catch (err) {
        console.log(err);
        return res.redirect("/")
    }
}
module.exports.viewAdmin = async (req, res) => {
    try {
        if (!(req.cookies.admin && req.cookies.admin._id)) {

            return res.redirect("/");
        }
        let admin = req.cookies.admin;
        var search = "";
        if (req.query.search) {
            search = req.query.search;
        }

        let admindata = await AddAdmin.find({
            $or: [
                {
                    name: { $regex: search, $options: "i" }
                },
                {
                    email: { $regex: search, $options: "i" }
                },
                {
                    city: { $regex: search, $options: "i" }
                }
            ]
        });

        return res.render("viewAdmin", {
            admindata, admin
        });

    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
};

module.exports.addAdmininsertdata = async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    try {
        if (req.file) {
            req.body.profile = ("/uploads/" + req.file.filename)
        }
        req.body.name = req.body.fname + " " + req.body.lname;
        req.body.password = await bcrypt.hash(req.body.password, 10);
        req.body.create_date = moment().format('DD-MM-YYYY, h:mm:ss a');
        req.body.update_date = moment().format('DD-MM-YYYY, h:mm:ss a');
        await AddAdmin.create(req.body);
        return res.redirect("/admin/addAdmin");
    }
    catch (err) {
        console.log(err);
        return res.redirect("/admin/addAdmin")
    }
}
module.exports.deleteAdmin = async (req, res) => {
    try {
        console.log(req.params.adminId);

        let adminRecord = await AddAdmin.findById(req.params.adminId);
        if (adminRecord) {
            try {
                const imagePath = path.join(__dirname, '..', 'uploads', adminRecord.profile);
                fs.unlinkSync(imagePath);

            }
            catch (err) {
                console.log('image not found');
            }
            let deleteAdmin = await AddAdmin.findByIdAndDelete(req.params.adminId);
            if (deleteAdmin) {
                console.log('Record delete');
                return res.redirect("/admin/viewAdmin");
            }
            else {
                console.log('something wrong');
                return res.redirect("/admin/viewAdmin");
            }
        }
        else {
            console.log('Record not found');
            return res.redirect("/admin/viewAdmin");

        }
    }
    catch (err) {
        console.log(err);
        return res.redirect("/admin/viewAdmin");
    }
}
module.exports.editAdmin = async (req, res) => {
    try {
        let admindata = await AddAdmin.findById(req.params.adminId);
        let admin = req.cookies.admin;
        if (admindata) {
            return res.render('updateAdmin', {
                admindata, admin
            });
        }
        else {
            console.log("something wrong");
            return res.redirect('/admin/viewAdmin');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('/admin/viewAdmin');
    }
}
module.exports.EditAdmindata = async (req, res) => {
    try {
        const adminId = req.params.adminId;
        const adminExist = await AddAdmin.findById(adminId);

        if (!adminExist) {
            console.log('Record not found');
            return res.redirect("/admin/viewAdmin");
        }

        if (req.file) {
            try {
                const imagePath = path.join(__dirname, '..', 'uploads', adminExist.profile);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            } catch (err) {
                console.log('Old image not found or cannot delete');
            }
        }

        req.body.profile = req.file ? req.file.filename : adminExist.profile;
        req.body.name = `${req.body.fname} ${req.body.lname}`;
        req.body.update_date = moment().format('DD-MM-YYYY, h:mm:ss a');

        const updatedAdmin = await AddAdmin.findByIdAndUpdate(adminId, req.body);

        if (updatedAdmin) {
            console.log("Admin updated successfully");
        } else {
            console.log('Update failed');
        }

        return res.redirect("/admin/viewAdmin");
    } catch (err) {
        console.error(err);
        return res.redirect("/admin/viewAdmin");
    }
};
module.exports.singleobject = async (req, res) => {
    try {
        console.log(req.params.adminId);
        let admindata = await AddAdmin.findById(req.params.adminId);
        console.log(admindata);

        return res.status(200).json({ status: "success", data: admindata });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: "error", message: "Something went wrong" });
    }
};
