const express = require("express")
const adminRouter = express.Router()
const validate = require("../../validators/admin/admin")
const { create, login, update, index, destroy, reset, change, verify } = require('../../controllers/admin/admin')
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


adminRouter.post('/admins', [validate.createAdmin], create);
adminRouter.put('/admins/:id', [authentication, authorization, validate.updateAdmin], update);
adminRouter.get('/admins', [authentication, validate.getAdmin], index);
adminRouter.delete('/admins/:id', [authentication, authorization, validate.deleteAdmin], destroy);
adminRouter.post('/admins/login', [validate.login], login);
adminRouter.put('/admins/:id/changepassword', [authentication, authorization, validate.changePassword], change);
adminRouter.post('/admins/resetpassword', [validate.resetPassword], reset);
adminRouter.post('/admins/:token/verifypassword', [validate.verifyPassword], verify);

module.exports = adminRouter