const express = require("express")
const orderQueryRouter = express.Router()
const validate = require("../../validators/customerSupport/query")
const { create, update, index } = require("../../controllers/customerSupport/query");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderQueryRouter.post('/customersupport/orderqueries', [validate.createOrderQuery], create);
orderQueryRouter.put('/customersupport/orderqueries/:id', [validate.updateOrderQuery], update);
orderQueryRouter.get('/customersupport/orderqueries', [validate.getOrderQuery], index);

module.exports = orderQueryRouter