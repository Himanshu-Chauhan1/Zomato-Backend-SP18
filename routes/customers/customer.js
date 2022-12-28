const express = require("express")
const customerRouter = express.Router()
const validate = require("../../validators/customers/customer")
const { create, update, destroy, login, get, index } = require("../../controllers/customers/customer");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");



customerRouter.post('/customers', [validate.createCustomer], create);
customerRouter.put('/customers/:id', [authentication, authorization, validate.updateCustomer], update);
customerRouter.get('/customers/filter', [authentication], get);
customerRouter.get('/customers', index);
customerRouter.delete('/customers/:id', [authentication, authorization, validate.deleteCustomer], destroy);
customerRouter.post('/customers/login', [validate.login], login);

module.exports = customerRouter