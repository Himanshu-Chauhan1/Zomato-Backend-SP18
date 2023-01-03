const express = require("express")
const orderRouter = express.Router()
const validate = require("../../validators/deliveryPartners/order")
const { update, index } = require("../../controllers/deliveryPartners/order");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderRouter.put('/deliverypartners/:id/orders/:orderId', [authentication, authorization, validate.updateOrder], update);
orderRouter.get('/deliverypartners/:id/orders', [authentication, authorization, validate.getOrder], index);

module.exports = orderRouter