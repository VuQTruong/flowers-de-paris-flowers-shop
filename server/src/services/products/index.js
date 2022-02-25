const express = require('express');
const getProductById = require('./get-a-product-by-id');
const getProductBySlug = require('./get-a-product-by-slug');
const getAllProducts = require('./get-all-products');
const getAllProductsByCategory = require('./get-all-product-by-category');
const createProductRouter = require('./admin/create-a-product');
const updateProductRouter = require('./admin/update-a-product');
const deleteProductRouter = require('./admin/delete-a-product');
const adGetAllProducts = require('./admin/ad-get-all-products');
const productRouter = express.Router();

// Admin routes
productRouter.use(createProductRouter);
productRouter.use(updateProductRouter);
productRouter.use(deleteProductRouter);
productRouter.use(adGetAllProducts);

// Client routes
productRouter.use(getProductBySlug);
productRouter.use(getProductById);
productRouter.use(getAllProducts);
productRouter.use(getAllProductsByCategory);

module.exports = productRouter;
