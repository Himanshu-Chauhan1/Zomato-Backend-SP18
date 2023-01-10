const express = require("express")
const restaurantRouter = express.Router()
const validate = require("../../validators/restaurants/restaurant")
const { create, update, destroy, login, index, change, reset, verify } = require("../../controllers/restaurants/restaurant");
const { authentication } = require("../../middlewares/authentication")
const { authorization } = require("../../middlewares/authorization")


restaurantRouter.post('/restaurants', [validate.createRestaurant], create);
restaurantRouter.put('/restaurants/:id', [authentication, authorization, validate.updateRestaurant], update);
restaurantRouter.get('/restaurants', [authentication, validate.getRestaurant], index);
restaurantRouter.delete('/restaurants/:id', [authentication, authorization, validate.deleteRestaurant], destroy);
restaurantRouter.post('/restaurants/login', [validate.login], login);
restaurantRouter.put('/restaurants/:id/changepassword', [authentication, authorization, validate.changePassword], change);
restaurantRouter.post('/restaurants/resetpassword', [validate.resetPassword], reset);
restaurantRouter.post('/restaurants/:token/verifypassword', [validate.verifyPassword], verify);

module.exports = restaurantRouter