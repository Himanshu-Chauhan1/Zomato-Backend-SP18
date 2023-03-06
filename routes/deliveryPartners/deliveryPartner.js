const express = require("express")
const deliveryPartnerRouter = express.Router()
const validate = require("../../validators/deliveryPartners/deliveryPartner")
const { create, update, destroy, login, index, change, reset, verify, logout } = require("../../controllers/deliveryPartners/deliveryPartner");
const { authentication } = require("../../middlewares/authentication")
const { authorization } = require("../../middlewares/authorization")


deliveryPartnerRouter.post('/deliverypartners', [validate.createDeliveryPartner], create);
deliveryPartnerRouter.put('/deliverypartners/:id', [authentication, authorization, validate.updateDeliveryPartner], update);
deliveryPartnerRouter.get('/deliverypartners', [authentication, validate.getDeliveryPartner], index);
deliveryPartnerRouter.delete('/deliverypartners/:id', [authentication, authorization, validate.deleteDeliveryPartner], destroy);
deliveryPartnerRouter.post('/deliverypartner/login', [validate.login], login);
deliveryPartnerRouter.post('/deliverypartner/logout', logout);
deliveryPartnerRouter.put('/deliverypartners/:id/changepassword', [authentication, authorization, validate.changePassword], change);
deliveryPartnerRouter.post('/deliverypartners/resetpassword', [validate.resetPassword], reset);
deliveryPartnerRouter.post('/deliverypartners/:token/verifypassword', [validate.verifyPassword], verify);

module.exports = deliveryPartnerRouter