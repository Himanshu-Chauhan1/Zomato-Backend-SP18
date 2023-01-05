const express = require("express")
const orderQueryRouter = express.Router()
const validate = require("../../validators/customerSupport/query")
const { create, update, index } = require("../../controllers/customerSupport/query");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderQueryRouter.post('/customersupport/:id/orderqueries', [authentication, authorization, validate.createOrderQuery], create);
orderQueryRouter.put('/customersupport/:id/orderqueries/:queryId', [authentication, authorization, validate.updateOrderQuery], update);
orderQueryRouter.get('/customersupport/:id/orderqueries', [authentication, authorization, validate.getOrderQuery], index);

module.exports = orderQueryRouter