const express = require('express');
const getABlogRouter = require('./get-a-blog');
const getBlogBySlugRouter = require('./get-blog-by-slug');
const getAllBlogRouter = require('./get-all-blogs');
const createBlogRouter = require('./admin/create-a-blog');
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
blogRouter.use(getBlogBySlugRouter);

module.exports = blogRouter;
