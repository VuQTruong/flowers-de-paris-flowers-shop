const express = require('express');
const createCategory = require('./create-category');
const updateCategory = require('./update-category');
const getAllCategories = require('./get-all-categories');
const getCategory = require('./get-a-category');
const getCategoryBySlug = require('./get-category-by-slug');
const deleteCategory = require('./delete-category');

const categoryRouter = express.Router();

categoryRouter.use(createCategory);
categoryRouter.use(updateCategory);
categoryRouter.use(getAllCategories);
categoryRouter.use(getCategory);
categoryRouter.use(getCategoryBySlug);
categoryRouter.use(deleteCategory);

module.exports = categoryRouter;
