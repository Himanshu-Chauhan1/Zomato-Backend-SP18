const express = require("express")
const addressRouter = express.Router()
const validate = require("../../validators/deliveryPartners/address")
const { create, update, index, destroy } = require("../../controllers/deliveryPartners/address");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


addressRouter.post('/deliverypartners/:id/address', [authentication, authorization, validate.createAddress], create);
addressRouter.put('/deliverypartners/:id/address/:addressId', [authentication, authorization, validate.updateAddress], update);
addressRouter.get('/deliverypartners/:id/address', [authentication, authorization, validate.getAddress], index);
addressRouter.delete('/deliverypartners/:id/address/:addressId', [authentication, authorization, validate.deleteAddress], destroy);

module.exports = addressRouter