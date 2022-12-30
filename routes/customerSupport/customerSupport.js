const express = require("express")
const customerSupportRouter = express.Router()
const validate = require("../../validators/customerSupport/customerSupport")
const { create, update, destroy, login, get, index } = require("../../controllers/customerSupport/customerSupport");
// const { authentication } = require("../../middlewares/authentication")
// const { authorization } = require("../../middleware/authorization")



customerSupportRouter.post('/customersupports', [validate.createCustomerSupport], create);
customerSupportRouter.put('/customersupports/:customerSupportId', [validate.updateCustomerSupport], update);
customerSupportRouter.get('/customersupports/filter', get);
customerSupportRouter.get('/customersupports', index);
customerSupportRouter.delete('/customersupports/:customerSupportId', [validate.deleteCustomerSupport], destroy);
customerSupportRouter.post('/customersupports/login', [validate.login], login);

module.exports = customerSupportRouter