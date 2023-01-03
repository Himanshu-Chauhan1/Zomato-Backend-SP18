const express = require("express")
const orderQueryRouter = express.Router()
const validate = require("../../validators/deliveryPartners/query")
const { create, update, index } = require("../../controllers/deliveryPartners/query");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderQueryRouter.post('/deliverypartner/:id/orderqueries', [authentication, authorization, validate.createOrderQuery], create);
orderQueryRouter.put('/deliverypartner/:id/orderqueries/:queryId', [authentication, authorization, validate.updateOrderQuery], update);
orderQueryRouter.get('/deliverypartner/:id/orderqueries', [authentication, authorization, validate.getOrderQuery], index);

module.exports = orderQueryRouter