const express = require("express")
const orderRouter = express.Router()
const validate = require("../../validators/customers/order")
const { create, update, index } = require("../../controllers/customers/order");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderRouter.post('/customersupport/:id/orders', [validate.createOrder], create);
orderRouter.put('/customersupport/:id/orders/:orderId', [validate.updateOrder], update);
orderRouter.get('/customersupport/:id/orders', [validate.getOrder], index);

module.exports = orderRouter