const express = require("express")
const orderQueryRouter = express.Router()
const validate = require("../../validators/admin/query")
const { create, update, index } = require("../../controllers/admin/query");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderQueryRouter.post('/admins/:id/orderqueries', [authentication, authorization, validate.createOrderQuery], create);
orderQueryRouter.put('/admins/:id/orderqueries/:queryId', [authentication, authorization, validate.updateOrderQuery], update);
orderQueryRouter.get('/admins/:id/orderqueries', [authentication, authorization, validate.getOrderQuery], index);


module.exports = orderQueryRouter