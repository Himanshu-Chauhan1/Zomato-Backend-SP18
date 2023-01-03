const express = require("express")
const orderQueryRouter = express.Router()
const validate = require("../../validators/restaurants/query")
const { create, update, index } = require("../../controllers/restaurants/query");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderQueryRouter.post('/restaurants/:id/orderqueries', [authentication, authorization, validate.createOrderQuery], create);
orderQueryRouter.put('/restaurants/:id/orderqueries/:queryId', [authentication, authorization, validate.updateOrderQuery], update);
orderQueryRouter.get('/restaurants/:id/orderqueries', [authentication, authorization, validate.getOrderQuery], index);

module.exports = orderQueryRouter