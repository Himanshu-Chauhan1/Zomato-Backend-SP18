const express = require("express")
const locationRouter = express.Router()
const validate = require("../../validators/customers/location")
const { authentication } = require("../../middlewares/authentication");
const { create, getLocation, index, destroy } = require("../../controllers/customers/location");
const { authorization } = require("../../middlewares/authorization")


locationRouter.post('/customers/locations', [validate.createLocation], create);
locationRouter.get('/customers/locations', getLocation);
locationRouter.get('/customers/locations', [validate.getLocation], index);
locationRouter.delete('/restaurants/locations/:locationId', [authentication, authorization, validate.deleteLocation], destroy);

module.exports = locationRouter