const express = require('express');
const getABlogRouter = require('./get-a-blog');
const getBlogBySlugRouter = require('./get-blog-by-slug');
const getAllBlogRouter = require('./get-all-blogs');

const adCreateBlogRouter = require('./admin/admin-create-a-blog');
const adUpdateABlogRouter = require('./admin/admin-update-a-blog');
const adDeleteABlogRouter = require('./admin/admin-delete-a-blog');
const adGetAllBlogsRouter = require('./admin/admin-get-all-blogs');
const adGetBlogRouter = require('./admin/admin-get-blog');
const adSetActiveRouter = require('./admin/admin-set-active');

const blogRouter = express.Router();

/* admin routes */
blogRouter.use(adCreateBlogRouter);
blogRouter.use(adUpdateABlogRouter);
blogRouter.use(adDeleteABlogRouter);
blogRouter.use(adGetAllBlogsRouter);
blogRouter.use(adGetBlogRouter);
blogRouter.use(adSetActiveRouter);

/* client routes */
blogRouter.use(getABlogRouter);
blogRouter.use(getAllBlogRouter);
blogRouter.use(getBlogBySlugRouter);

module.exports = blogRouter;
