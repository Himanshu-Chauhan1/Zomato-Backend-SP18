const express = require("express")
const orderStatusRouter = express.Router()
const validate = require("../../validators/admin/orderStatus")
const {create, update, index, destroy } = require("../../controllers/admin/orderStatus");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderStatusRouter.post('/orderstatus', [validate.createOrderStatus], create);
orderStatusRouter.put('/orderstatus/:id', [validate.updateOrderStatus], update);
orderStatusRouter.get('/orderstatus', index);
orderStatusRouter.delete('/orderstatus/:id',[validate.deleteOrderStatus], destroy);

module.exports = orderStatusRouter