const express = require("express")
const deliveryPartnerRouter = express.Router()
const validate = require("../../validators/deliveryPartners/deliveryPartner")
const { create, update, destroy, login, get, index } = require("../../controllers/deliveryPartners/deliveryPartner");
const { authentication } = require("../../middlewares/authentication")
const { authorization } = require("../../middlewares/authorization")


deliveryPartnerRouter.post('/deliverypartners', [validate.createDeliveryPartner], create);
deliveryPartnerRouter.put('/deliverypartners/:id', [authentication, authorization, validate.updateDeliveryPartner], update);
deliveryPartnerRouter.get('/deliverypartners/filter', [authentication], get);
deliveryPartnerRouter.get('/deliverypartners', [authentication], index);
deliveryPartnerRouter.delete('/deliverypartners/:id', [authentication, authorization, validate.deleteDeliveryPartner], destroy);
deliveryPartnerRouter.post('/deliverypartner/login', [validate.login], login);

module.exports = deliveryPartnerRouter