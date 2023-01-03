const express = require("express")
const addressRouter = express.Router()
const validate = require("../../validators/customerSupport/address")
const { create, update, index, destroy } = require("../../controllers/customerSupport/address");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


addressRouter.post('/customersupports/:id/address', [validate.createAddress], create);
addressRouter.put('/customersupports/:id/address/:addressId', [validate.updateAddress], update);
addressRouter.get('/customersupports/:id/address', [validate.getAddress], index);
addressRouter.delete('/customersupports/:id/address/:addressId', [validate.deleteAddress], destroy);

module.exports = addressRouter