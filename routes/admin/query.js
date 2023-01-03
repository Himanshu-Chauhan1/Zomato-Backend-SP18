const express = require("express")
const orderQueryRouter = express.Router()
const validate = require("../../validators/admin/query")
const { create, update, index, destroy } = require("../../controllers/admin/query");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderQueryRouter.post('/admin/:id/orderqueries', [authentication, authorization, validate.createOrderQuery], create);
orderQueryRouter.put('/admin/:id/orderqueries/:queryId', [authentication, authorization, validate.updateOrderQuery], update);
orderQueryRouter.get('/admin/:id/orderqueries', [authentication, authorization, validate.getOrderQuery], index);
orderQueryRouter.delete('/admin/:id/orderqueries/:queryId', [authentication, authorization, validate.deleteOrderQuery], destroy);

module.exports = orderQueryRouter