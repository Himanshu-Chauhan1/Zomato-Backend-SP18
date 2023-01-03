const express = require("express")
const orderRouter = express.Router()
const validate = require("../../validators/admin/order")
const { create, update, index, destroy } = require("../../controllers/admin/order");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderRouter.post('/admins/:id/orders', [authentication, authorization, validate.createOrder], create);
orderRouter.put('/admins/:id/orders/:orderId', [authentication, authorization, validate.updateOrder], update);
orderRouter.get('/admins/:id/orders', [authentication, authorization, validate.getOrder], index);
orderRouter.delete('/admins/:id/orders/:orderId', [authentication, authorization, validate.deleteOrder], destroy);

module.exports = orderRouter