const express = require("express")
const addressRouter = express.Router()
const validate = require("../../validators/admin/address")
const { create, update, index, destroy } = require("../../controllers/admin/address");
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


addressRouter.post('/admins/:adminId/address', [validate.createAddress], create);
addressRouter.put('/admins/:adminId/address/:addressId', [validate.updateAddress], update);
addressRouter.get('/admins/:adminId/address', [validate.getAddress], index);
addressRouter.delete('/admins/:adminId/address/:addressId', [validate.deleteAddress], destroy);

module.exports = addressRouter