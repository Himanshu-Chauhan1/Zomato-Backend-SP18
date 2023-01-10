const express = require("express")
const customerSupportRouter = express.Router()
const validate = require("../../validators/customerSupport/customerSupport")
const { create, update, destroy, login, index, change, reset, verify } = require("../../controllers/customerSupport/customerSupport");
const { authentication } = require("../../middlewares/authentication")
const { authorization } = require("../../middlewares/authorization")



customerSupportRouter.post('/customersupports', [validate.createCustomerSupport], create);
customerSupportRouter.put('/customersupports/:id', [authentication, authorization, validate.updateCustomerSupport], update);
customerSupportRouter.get('/customersupports', [authentication, validate.getCustomerSupport], index);
customerSupportRouter.delete('/customersupports/:id', [authentication, authorization, validate.deleteCustomerSupport], destroy);
customerSupportRouter.post('/customersupports/login', [validate.login], login);
customerSupportRouter.put('/customersupports/:id/changepassword', [authentication, authorization, validate.changePassword], change);
customerSupportRouter.post('/customersupports/resetpassword', [validate.resetPassword], reset);
customerSupportRouter.post('/customersupports/:token/verifypassword', [validate.verifyPassword], verify);

module.exports = customerSupportRouter