const express = require("express")
const adminRouter = express.Router()
const validate = require("../../validators/admin/admin")
const { create, login, update, get, index, destroy } = require('../../controllers/admin/admin')
const { authentication } = require("../../middlewares/authentication");
// const { authorization } = require("../../middlewares/authorization");


adminRouter.post('/admins', [validate.createAdmin], create);
adminRouter.put('/admins/:id', [authentication, validate.updateAdmin], update);
adminRouter.get('/admins/filter', [authentication], get);
adminRouter.get('/admins', [authentication], index);
adminRouter.delete('/admins/:id', [authentication, validate.deleteAdmin], destroy);
adminRouter.post('/admins/login', [validate.login], login);


module.exports = adminRouter