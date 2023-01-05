const express = require("express")
const orderRouter = express.Router()
const validate = require("../../validators/customerSupport/order")
const { update, index } = require("../../controllers/customerSupport/order");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderRouter.put('/customersupport/:id/orders/:orderId', [authentication, authorization, validate.updateOrder], update);
orderRouter.get('/customersupport/:id/orders', [authentication, authorization, validate.getOrder], index);

module.exports = orderRouter