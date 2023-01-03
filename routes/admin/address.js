const express = require("express")
const addressRouter = express.Router()
const validate = require("../../validators/admin/address")
const { create, update, index, destroy } = require("../../controllers/admin/address");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


addressRouter.post('/admins/:id/address', [authentication, authorization, validate.createAddress], create);
addressRouter.put('/admins/:id/address/:addressId', [authentication, authorization, validate.updateAddress], update);
addressRouter.get('/admins/:id/address', [authentication, authorization, validate.getAddress], index);
addressRouter.delete('/admins/:id/address/:addressId', [authentication, authorization, validate.deleteAddress], destroy);

module.exports = addressRouter