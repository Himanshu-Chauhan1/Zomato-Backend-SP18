const express = require("express")
const orderQueryRouter = express.Router()
const validate = require("../../validators/customers/query")
const { create, update, index } = require("../../controllers/customers/query");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderQueryRouter.post('/customers/orderqueries', [validate.createOrderQuery], create);
orderQueryRouter.put('/customers/orderqueries/:id', [validate.updateOrderQuery], update);
orderQueryRouter.get('/customers/orderqueries', [validate.getOrderQuery], index);

module.exports = orderQueryRouter