const express = require("express")
const orderRouter = express.Router()
const validate = require("../../validators/customers/order")
const { create, update, index } = require("../../controllers/customers/order");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderRouter.post('/customers/:customerId/orders', [validate.createOrder], create);
orderRouter.put('/customers/:customerId/orders/:orderId', [validate.updateOrder], update);
orderRouter.get('/customers/:customerId/orders', [validate.getOrder], index);

module.exports = orderRouter