const express = require("express");
const verifyToken = require("../middleware/validate.token");

const { getProductbyVideoId, createProduct } = require("../controllers/product.controller");

const routerProduct = express.Router();

routerProduct.use(verifyToken);
routerProduct.route("/:videoId").get(getProductbyVideoId).post(createProduct)

module.exports = routerProduct;
