const express = require("express")
const addressRouter = express.Router()
const validate = require("../../validators/deliveryPartners/address")
const { create, update, index, destroy } = require("../../controllers/deliveryPartners/address");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


addressRouter.post('/deliverypartners/:deliveryPartnerId/address', [validate.createAddress], create);
addressRouter.put('/deliverypartners/:deliveryPartnerId/address/:addressId', [validate.updateAddress], update);
addressRouter.get('/deliverypartners/:deliveryPartnerId/address', [validate.getAddress], index);
addressRouter.delete('/deliverypartners/:deliveryPartnerId/address/:addressId', [validate.deleteAddress], destroy);

module.exports = addressRouter