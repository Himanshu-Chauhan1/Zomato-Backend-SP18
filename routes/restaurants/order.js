const express = require("express")
const orderRouter = express.Router()
const validate = require("../../validators/restaurants/order")
const { update, index } = require("../../controllers/restaurants/order");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");

orderRouter.put('/restaurants/:id/orders/:orderId', [authentication, authorization, validate.updateOrder], update);
orderRouter.get('/restaurants/:id/orders', [authentication, authorization, validate.getOrder], index);

module.exports = orderRouter