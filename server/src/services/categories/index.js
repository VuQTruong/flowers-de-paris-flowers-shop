const express = require('express');
const adCreateCategory = require('./admin/admin-create-category');
const adUpdateCategory = require('./admin/admin-update-category');
const adSetActiveCategory = require('./admin/admin-category-set-active');
const adGetAllCategories = require('./admin/admin-get-all-categories');
const adDeleteCategory = require('./admin/admin-delete-category');
const getAllCategories = require('./get-all-categories');
const adGetCategory = require('./admin/admin-get-a-category');
const getCategoryBySlug = require('./get-category-by-slug');

const categoryRouter = express.Router();

/* admin routes */
categoryRouter.use(adCreateCategory);
categoryRouter.use(adUpdateCategory);
categoryRouter.use(adSetActiveCategory);
categoryRouter.use(adDeleteCategory);
categoryRouter.use(adGetAllCategories);
categoryRouter.use(adGetCategory);

/* client routes */
categoryRouter.use(getAllCategories);
categoryRouter.use(getCategoryBySlug);

module.exports = categoryRouter;
