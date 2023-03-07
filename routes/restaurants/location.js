const express = require("express")
const locationRouter = express.Router()
const validate = require("../../validators/restaurants/location")
const { authentication } = require("../../middlewares/authentication");
const { create, update, index, destroy} = require("../../controllers/restaurants/location");
const { authorization } = require("../../middlewares/authorization")


locationRouter.post('/restaurants/:id/locations', [validate.createLocation], create);
locationRouter.put('/restaurants/:id/locations/:locationId', [authentication, authorization, validate.updateLocation], update);
locationRouter.get('/restaurants/:id/locations', [validate.getLocation], index);
locationRouter.delete('/restaurants/:id/locations/:locationId', [authentication, authorization, validate.deleteLocation], destroy);

module.exports = locationRouter