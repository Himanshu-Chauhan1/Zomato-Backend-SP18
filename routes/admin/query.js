const express = require("express")
const orderQueryRouter = express.Router()
const validate = require("../../validators/admin/query")
const { create, update, index, destroy } = require("../../controllers/admin/query");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderQueryRouter.post('/admin/orderqueries', [validate.createOrderQuery], create);
orderQueryRouter.put('/admin/orderqueries/:id', [validate.updateOrderQuery], update);
orderQueryRouter.get('/admin/orderqueries', [validate.getOrderQuery], index);
orderQueryRouter.delete('/admin/orderqueries/:id', [validate.deleteOrderQuery], destroy);

module.exports = orderQueryRouter