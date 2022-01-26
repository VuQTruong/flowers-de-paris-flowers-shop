const express = require('express');
const createBlogRouter = require('./create-a-blog');
const getABlogRouter = require('./get-a-blog');
const getAllBlogRouter = require('./get-all-blogs');
const updateABlogRouter = require('./update-a-blog');
const deleteABlogRouter = require('./delete-a-blog');
const blogRouter = express.Router();

blogRouter.use(createBlogRouter);
blogRouter.use(getABlogRouter);
blogRouter.use(getAllBlogRouter);
blogRouter.use(updateABlogRouter);
blogRouter.use(deleteABlogRouter);

module.exports = blogRouter;
