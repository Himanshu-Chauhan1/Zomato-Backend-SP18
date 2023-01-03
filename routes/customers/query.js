const express = require("express")
const orderQueryRouter = express.Router()
const validate = require("../../validators/customers/query")
const { create, update, index } = require("../../controllers/customers/query");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderQueryRouter.post('/customers/:id/orderqueries', [authentication, authorization, validate.createOrderQuery], create);
orderQueryRouter.put('/customers/:id/orderqueries/:queryId', [authentication, authorization, validate.updateOrderQuery], update);
orderQueryRouter.get('/customers/:id/orderqueries', [authentication, authorization, validate.getOrderQuery], index);

module.exports = orderQueryRouter