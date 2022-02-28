const express = require('express');
const getProductById = require('./get-a-product-by-id');
const getProductBySlug = require('./get-a-product-by-slug');
const getAllProducts = require('./get-all-products');
const getAllProductsByCategory = require('./get-all-product-by-category');
const adCreateProductRouter = require('./admin/admin-create-product');
const adUpdateProductRouter = require('./admin/admin-update-product');
const adDeleteProductRouter = require('./admin/admin-delete-product');
const adGetAllProducts = require('./admin/admin-get-all-products');
const adSetProductStatus = require('./admin/admin-set-product-status');
const productRouter = express.Router();

// Admin routes
productRouter.use(adCreateProductRouter);
productRouter.use(adUpdateProductRouter);
productRouter.use(adSetProductStatus);
productRouter.use(adDeleteProductRouter);
productRouter.use(adGetAllProducts);

// Client routes
productRouter.use(getProductBySlug);
productRouter.use(getProductById);
productRouter.use(getAllProducts);
productRouter.use(getAllProductsByCategory);

module.exports = productRouter;
