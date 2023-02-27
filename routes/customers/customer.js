const express = require("express")
const customerRouter = express.Router()
const validate = require("../../validators/customers/customer")
const { create, update, destroy, login, index, change, reset, verify, verifyOtp, resetOtp, set, logout } = require("../../controllers/customers/customer");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");



customerRouter.post('/customers/create', [validate.createCustomer], create);
customerRouter.put('/customers/:id', [authentication, authorization, validate.updateCustomer], update);
customerRouter.get('/customers',[authentication], index);
customerRouter.delete('/customers/:id', [authentication, authorization, validate.deleteCustomer], destroy);
customerRouter.post('/customers/login', [validate.login], login);
customerRouter.post('/customers/logout', logout);
customerRouter.put('/customers/:id/changepassword', [authentication, authorization, validate.changePassword], change);
customerRouter.post('/customers/resetpassword', [validate.resetPasswordUsingEmail], reset);
customerRouter.post('/customers/:token/verifypassword', [validate.verifyPasswordUsingEmail], verify);
customerRouter.post('/customers/sendotp', [validate.resetPasswordUsingPhone], resetOtp);
customerRouter.post('/customers/:id/verifyotp', [validate.verifyPasswordUsingPhone], verifyOtp);
customerRouter.post('/customers/:token/setpassword', [validate.setPasswordUsingPhone], set);

module.exports = customerRouter