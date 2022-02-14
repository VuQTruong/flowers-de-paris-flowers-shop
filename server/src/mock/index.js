const express = require('express');
const updateCategoriesProducts = require('./clear-categories-products');
const createCategories = require('./create-mock-categories');
const createProducts = require('./create-mock-products');
const mockRouter = express.Router();

mockRouter.use(createCategories);
mockRouter.use(updateCategoriesProducts);
mockRouter.use(createProducts);

module.exports = mockRouter;
