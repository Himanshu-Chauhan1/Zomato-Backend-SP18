const express = require("express")
const addressRouter = express.Router()
const validate = require("../../validators/customerSupport/address")
const { create, update, index, destroy } = require("../../controllers/customerSupport/address");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


addressRouter.post('/customersupports/:id/address', [authentication, authorization, validate.createAddress], create);
addressRouter.put('/customersupports/:id/address/:addressId', [authentication, authorization, validate.updateAddress], update);
addressRouter.get('/customersupports/:id/address', [authentication, authorization, validate.getAddress], index);
addressRouter.delete('/customersupports/:id/address/:addressId', [authentication, authorization, validate.deleteAddress], destroy);

module.exports = addressRouter