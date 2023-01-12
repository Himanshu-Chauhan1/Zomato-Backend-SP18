const express = require("express")
const superAdminRouter = express.Router()
const validate = require("../../validators/superAdmin/superAdmin")
const { create, login, update, index } = require('../../controllers/superadmin/superAdmin')
const { authentication } = require("../../middlewares/authentication");
const { authorization } = require("../../middlewares/authorization");


superAdminRouter.post('/superadmins', [validate.createSuperAdmin], create);
superAdminRouter.put('/superadmins/:id', [authentication, authorization, validate.updateSuperAdmin], update);
superAdminRouter.get('/superadmins', [authentication, validate.getSuperAdmin], index);
superAdminRouter.post('/superadmins/login', [validate.login], login);

module.exports = superAdminRouter