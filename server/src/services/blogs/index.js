const express = require('express');
const createBlogRouter = require('./admin/create-a-blog');
const getABlogRouter = require('./get-a-blog');
const getAllBlogRouter = require('./get-all-blogs');
const updateABlogRouter = require('./admin/update-a-blog');
const deleteABlogRouter = require('./admin/delete-a-blog');
const adGetAllBlogsRouter = require('./admin/ad-get-all-blogs');
const setActiveRouter = require('./admin/set-active');
const blogRouter = express.Router();

/* admin routes */
blogRouter.use(createBlogRouter);
blogRouter.use(updateABlogRouter);
blogRouter.use(deleteABlogRouter);
blogRouter.use(adGetAllBlogsRouter);
blogRouter.use(setActiveRouter);

/* client routes */
blogRouter.use(getABlogRouter);
blogRouter.use(getAllBlogRouter);

module.exports = blogRouter;
