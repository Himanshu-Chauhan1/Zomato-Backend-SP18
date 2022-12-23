const express = require("express")
const orderRouter = express.Router()
const validate = require("../../validators/customers/order")
const { create, update, index } = require("../../controllers/customers/order");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderRouter.post('/customersupport/:customerSupportId/orders', [validate.createOrder], create);
orderRouter.put('/customersupport/:customerSupportId/orders/:orderId', [validate.updateOrder], update);
orderRouter.get('/customersupport/:customerSupportId/orders', [validate.getOrder], index);

module.exports = orderRouter