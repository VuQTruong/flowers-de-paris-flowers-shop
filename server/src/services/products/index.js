const express = require('express');
const getProductById = require('./get-a-product');
const getAllProducts = require('./get-all-products');
const getAllProductsByCategory = require('./get-all-product-by-category');
const createProductRouter = require('./admin/create-a-product');
const updateProductRouter = require('./admin/update-a-product');
const deleteProductRouter = require('./admin/delete-a-product');
const productRouter = express.Router();

productRouter.use(getProductById);
productRouter.use(getAllProducts);
productRouter.use(getAllProductsByCategory);

// Admin routes
productRouter.use(createProductRouter);
productRouter.use(updateProductRouter);
productRouter.use(deleteProductRouter);

module.exports = productRouter;
