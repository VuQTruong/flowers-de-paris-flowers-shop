const express = require('express');
const adCreateCategory = require('./admin-create-category');
const adUpdateCategory = require('./admin-update-category');
const adSetActiveCategory = require('./admin-category-set-active');
const adGetAllCategories = require('./admin-get-all-categories');
const adDeleteCategory = require('./admin-delete-category');
const getAllCategories = require('./get-all-categories');
const getCategory = require('./get-a-category');
const getCategoryBySlug = require('./get-category-by-slug');

const categoryRouter = express.Router();

/* admin routes */
categoryRouter.use(adCreateCategory);
categoryRouter.use(adUpdateCategory);
categoryRouter.use(adSetActiveCategory);
categoryRouter.use(adDeleteCategory);
categoryRouter.use(adGetAllCategories);

/* client routes */
categoryRouter.use(getAllCategories);
categoryRouter.use(getCategory);
categoryRouter.use(getCategoryBySlug);

module.exports = categoryRouter;
