const express = require("express")
const cartRouter = express.Router()
const validate = require("../../validators/customers/cart")
const { create, update, destroy, index } = require("../../controllers/customers/cart");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");



cartRouter.post('/customers/:customerId/cart', [validate.createCart], create);
cartRouter.put('/customers/:customerId/cart/:cartId', [validate.updateCart], update);
cartRouter.get('/customers/:customerId/cart', index);
cartRouter.delete('/customers/:customerId/cart/:cartId',[validate.deleteCart], destroy);

module.exports = cartRouter