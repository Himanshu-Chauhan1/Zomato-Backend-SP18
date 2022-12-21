const express = require("express")
const orderStatusRouter = express.Router()
const validate = require("../../validators/customerSupport/orderStatus")
const { create, update, index } = require("../../controllers/customerSupport/orderStatus");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");

orderStatusRouter.post('/orderstatus', [validate.createOrderStatus], create);
orderStatusRouter.put('/orderstatus/:id', [validate.updateOrderStatus], update);
orderStatusRouter.get('/orderstatus', [validate.getOrderStatus], index);

module.exports = orderStatusRouter