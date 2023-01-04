const express = require("express")
const cartRouter = express.Router()
const validate = require("../../validators/customers/cart")
const { create, update, destroy, index } = require("../../controllers/customers/cart");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");



cartRouter.post('/customers/:id/cart', [authentication, authorization, validate.createCart], create);
cartRouter.put('/customers/:id/cart/:cartId', [authentication, authorization, validate.updateCart], update);
cartRouter.get('/customers/:id/cart', [authentication, authorization], index);
cartRouter.delete('/customers/:id/cart/:cartId', [authentication, authorization, validate.deleteCart], destroy);

module.exports = cartRouter