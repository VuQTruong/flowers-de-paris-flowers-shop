const express = require('express');
const pingProduct = require('./ping-product');
const getProductById = require('./get-a-product-by-id');
const getProductBySlug = require('./get-a-product-by-slug');
const getAllProducts = require('./get-all-products');
const getAllProductsByCategory = require('./get-all-products-by-category');
const adCreateProductRouter = require('./admin/admin-create-product');
const adUpdateProductRouter = require('./admin/admin-update-product');
const adDeleteProductRouter = require('./admin/admin-delete-product');
const adGetAllProducts = require('./admin/admin-get-all-products');
const adGetProduct = require('./admin/admin-get-product-by-id');
const adSetProductStatus = require('./admin/admin-set-product-status');
const productRouter = express.Router();

// Admin routes
productRouter.use(adCreateProductRouter); // POST /products
productRouter.use(adUpdateProductRouter); // PATCH /products/:id
productRouter.use(adSetProductStatus); // PATCH /products/setstatus/:id
productRouter.use(adDeleteProductRouter); // DELTE /products/:id
productRouter.use(adGetAllProducts); // GET  /products/admin
productRouter.use(adGetProduct); // GET  /products/admin/:id

// Client routes
productRouter.use(pingProduct); // GET /products/ping/:productId
productRouter.use(getProductBySlug); // GET /products/slug/:slug
productRouter.use(getProductById); // GET /products/:id
productRouter.use(getAllProducts); // GET /products
productRouter.use(getAllProductsByCategory); // GET /products/category/:slug

module.exports = productRouter;
