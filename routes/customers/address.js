const express = require("express")
const addressRouter = express.Router()
const validate = require("../../validators/customers/address")
const { create, update, index, destroy } = require("../../controllers/customers/address");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


addressRouter.post('/customers/:customerId/address', [validate.createAddress], create);
addressRouter.put('/customers/:customerId/address/:addressId', [validate.updateAddress], update);
addressRouter.get('/customers/:customerId/address', [validate.getAddress], index);
addressRouter.delete('/customers/:customerId/address/:addressId', [validate.deleteAddress], destroy);

module.exports = addressRouter