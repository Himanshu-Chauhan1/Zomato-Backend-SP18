const express = require("express")
const locationRouter = express.Router()
const validate = require("../../validators/customers/location")
const { authentication } = require("../../middlewares/authentication");
const { restaurantsNearby } = require("../../controllers/customers/location");
const { authorization } = require("../../middlewares/authorization")


locationRouter.post('/customers/restaurantsnearby', [validate.validateRestaurantsNearby], restaurantsNearby);

module.exports = locationRouter