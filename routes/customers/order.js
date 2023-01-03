const express = require("express")
const orderRouter = express.Router()
const validate = require("../../validators/customers/order")
const { create, update, index } = require("../../controllers/customers/order");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderRouter.post('/customers/:id/orders', [authentication, authorization, validate.createOrder], create);
orderRouter.put('/customers/:id/orders/:orderId', [authentication, authorization, validate.updateOrder], update);
orderRouter.get('/customers/:id/orders', [authentication, authorization, validate.getOrder], index);

module.exports = orderRouter