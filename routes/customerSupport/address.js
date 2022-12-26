const express = require("express")
const addressRouter = express.Router()
const validate = require("../../validators/customerSupport/address")
const { create, update, index, destroy } = require("../../controllers/customerSupport/address");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


addressRouter.post('/customersupports/:customerSupportId/address', [validate.createAddress], create);
addressRouter.put('/customersupports/:customerSupportId/address/:addressId', [validate.updateAddress], update);
addressRouter.get('/customersupports/:customerSupportId/address', [validate.getAddress], index);
addressRouter.delete('/customersupports/:customerSupportId/address/:addressId', [validate.deleteAddress], destroy);

module.exports = addressRouter