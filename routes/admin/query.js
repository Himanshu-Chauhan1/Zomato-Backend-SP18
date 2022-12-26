const express = require("express")
const orderQueryRouter = express.Router()
const validate = require("../../validators/admin/query")
const { create, update, index, destroy } = require("../../controllers/admin/query");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderQueryRouter.post('/admin/:adminId/orderqueries', [validate.createOrderQuery], create);
orderQueryRouter.put('/admin/:adminId/orderqueries/:id', [validate.updateOrderQuery], update);
orderQueryRouter.get('/admin/:adminId/orderqueries', [validate.getOrderQuery], index);
orderQueryRouter.delete('/admin/:adminId/orderqueries/:id', [validate.deleteOrderQuery], destroy);

module.exports = orderQueryRouter