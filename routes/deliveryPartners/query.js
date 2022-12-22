const express = require("express")
const orderQueryRouter = express.Router()
const validate = require("../../validators/deliveryPartners/query")
const { create, update, index } = require("../../controllers/deliveryPartners/query");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderQueryRouter.post('/deliverypartner/orderqueries', [validate.createOrderQuery], create);
orderQueryRouter.put('/deliverypartner/orderqueries/:id', [validate.updateOrderQuery], update);
orderQueryRouter.get('/deliverypartner/orderqueries', [validate.getOrderQuery], index);

module.exports = orderQueryRouter