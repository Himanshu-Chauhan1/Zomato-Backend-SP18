const express = require("express")
const orderQueryRouter = express.Router()
const validate = require("../../validators/customers/query")
const { create, update, index } = require("../../controllers/customers/query");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderQueryRouter.post('/customers/:customerId/orderqueries', [validate.createOrderQuery], create);
orderQueryRouter.put('/customers/:customerId/orderqueries/:queryId', [validate.updateOrderQuery], update);
orderQueryRouter.get('/customers/:customerId/orderqueries', [validate.getOrderQuery], index);

module.exports = orderQueryRouter