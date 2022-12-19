const express = require("express")
const cartRouter = express.Router()
const validate = require("../../validators/customers/cart")
const { create, update, destroy, index } = require("../../controllers/customers/cart");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");



cartRouter.post('/carts/:id',[validate.createCart], create);
// cartRouter.put('/carts/:id', [authentication, authorization, validate.updateCustomer], update);
// cartRouter.get('/customers', [authentication], index);
// cartRouter.delete('/customers/:id', [authentication, authorization, validate.deleteCustomer], destroy);

module.exports = cartRouter