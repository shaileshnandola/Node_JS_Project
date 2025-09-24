
const express = require('express');

const routes = express.Router();

const blogCtr = require("../controllers/blogCtr")
const addBlog = require('../models/blogmodel');

routes.get("/addBlog", blogCtr.addblog)
routes.get("/viewblog", blogCtr.viewblog)
routes.post('/addBlogInsert', addBlog.uploadimage, blogCtr.addBlogInsert);
routes.get("/deleteBlog/:adminId", blogCtr.deleteBlog)
routes.get("/editBlog/:adminId",blogCtr.editBlog)
routes.post('/EditBlogdata/:adminId', addBlog.uploadimage, blogCtr.EditBlogdata);
routes.get('/blogview/:id', blogCtr.blogview);
routes.get('/viewBlogs', blogCtr.viewBlogs);


module.exports = routes;
