
const addBlog = require('../models/blogmodel');
const moment = require("moment");
const path = require("path");
const fs = require("fs");

module.exports.addblog = async (req, res) => {
  try {
    return res.render("addblog");

  } catch (err) {
    console.error(err);
    return res.redirect("/");
  }
};

module.exports.viewblog = async (req, res) => {
  try {
    const admin = req.cookies.admin;
    const search = req.query.search || "";

    const blogList = await addBlog.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } }
      ]
    });

    return res.render("viewblog", { blogList, admin });
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};

module.exports.addBlogInsert = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.filename; 
    }

    req.body.create_date = moment().format('DD-MM-YYYY, h:mm:ss a');
    req.body.update_date = moment().format('DD-MM-YYYY, h:mm:ss a');

    await addBlog.create(req.body);

    res.redirect('/admin/viewblog');
  } catch (err) {
    console.error(err);
    res.redirect('/admin/addBlog');
  }
};


module.exports.deleteBlog = async (req, res) => {
  try {
    const blog = await addBlog.findById(req.params.adminId);

    if (blog && blog.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', blog.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await addBlog.findByIdAndDelete(req.params.adminId);
    return res.redirect("/admin/viewblog");

  } catch (err) {
    console.error(err);
    return res.redirect("/admin/viewblog");
  }
};
module.exports.editBlog = async (req, res) => {
  try {
    if (!req.cookies.admin || !req.cookies.admin._id) {
      return res.redirect('/');
    }

    const blog = await addBlog.findById(req.params.adminId);
    if (!blog) {
      return res.redirect('/admin/viewblog');
    }


    res.render('updateblog', { blog, admin: req.cookies.admin });
  } catch (err) {
    console.error(err);
    res.redirect('/admin/viewblog');
  }
};

module.exports.EditBlogdata = async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const blogExist = await addBlog.findById(adminId);

    if (!blogExist) {
      console.log('Record not found');
      return res.redirect("/admin/viewblog");
    }

    if (req.file) {
      try {
        const oldImagePath = path.join(__dirname, '..', 'uploads', blogExist.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log('Old image deleted successfully');
        }
      } catch (err) {
        console.log('Old image not found or cannot delete');
      }
    }

    req.body.image = req.file ? req.file.filename : blogExist.image;

    req.body.update_date = moment().format('DD-MM-YYYY, h:mm:ss a');

    const updatedBlog = await addBlog.findByIdAndUpdate(adminId, req.body);

    if (updatedBlog) {
      console.log("Blog updated successfully");
    } else {
      console.log('Update failed');
    }

    return res.redirect("/admin/viewblog");
  } catch (err) {
    console.error(err);
    return res.redirect("/admin/viewblog");
  }
};

module.exports.blogview = async (req, res) => {
  try {
    let admin = req.cookies.admin;
    const blogId = req.params.id;
    const blog = await addBlog.findById(blogId);

    if (!blog) {
      return res.status(404).send('Blog not found');
    }

    res.render('blogView', { blog, admin });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};
module.exports.viewBlogs = async (req, res) => {
  try {
    const admin = req.cookies.admin;
    const search = req.query.search || "";

    const blogList = await addBlog.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } }
      ]
    });

    return res.render("viewblog", { blogList, admin });
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};




