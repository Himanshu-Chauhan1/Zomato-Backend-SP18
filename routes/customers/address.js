const express = require("express")
const addressRouter = express.Router()
const validate = require("../../validators/customers/address")
const { create, update, index, destroy } = require("../../controllers/customers/address");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


addressRouter.post('/customers/:id/address', [authentication, authorization, validate.createAddress], create);
addressRouter.put('/customers/:id/address/:addressId', [authentication, authorization, validate.updateAddress], update);
addressRouter.get('/customers/:id/address', [authentication, authorization, validate.getAddress], index);
addressRouter.delete('/customers/:id/address/:addressId', [authentication, authorization, validate.deleteAddress], destroy);

module.exports = addressRouter