const express = require("express")
const orderRouter = express.Router()
const validate = require("../../validators/restaurants/order")
const { create, update, index } = require("../../controllers/restaurants/order");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");

orderRouter.put('/restaurants/:restaurantId/orders/:orderId', [validate.updateOrder], update);
orderRouter.get('/restaurants/:restaurantId/orders', [validate.getOrder], index);

module.exports = orderRouter