const express = require("express")
const orderRouter = express.Router()
const validate = require("../../validators/admin/order")
const { create, update, index, destroy } = require("../../controllers/admin/order");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderRouter.post('/admins/:adminId/orders', [validate.createOrder], create);
orderRouter.put('/admins/:adminId/orders/:orderId', [validate.updateOrder], update);
orderRouter.get('/admins/:adminId/orders', [validate.getOrder], index);
orderRouter.delete('/admins/:adminId/orders/:orderId', [validate.deleteOrder], destroy);

module.exports = orderRouter