const express = require("express")
const orderStatusRouter = express.Router()
const validate = require("../../validators/customers/orderStatus")
const { update, index } = require("../../controllers/customers/orderStatus");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderStatusRouter.put('/orderstatus/:id', [validate.updateOrderStatus], update);
orderStatusRouter.get('/orderstatus', index);

module.exports = orderStatusRouter