const express = require("express")
const orderQueryRouter = express.Router()
const validate = require("../../validators/restaurants/query")
const { create, update, index } = require("../../controllers/restaurants/query");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


orderQueryRouter.post('/restaurants/orderqueries', [validate.createOrderQuery], create);
orderQueryRouter.put('/restaurants/orderqueries/:id', [validate.updateOrderQuery], update);
orderQueryRouter.get('/restaurants/orderqueries', [validate.getOrderQuery], index);

module.exports = orderQueryRouter