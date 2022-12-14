const express = require("express")
const restaurantRouter = express.Router()
const validate = require("../../validators/restaurants/restaurant")
const { create, update, destroy, login, get, index } = require("../../controllers/restaurants/restaurant");
const { authentication } = require("../../middlewares/authentication")
// const { authorization } = require("../../middleware/authorization")


restaurantRouter.post('/restaurants', [validate.createRestaurant], create);
restaurantRouter.put('/restaurants/:id', [authentication,validate.updateRestaurant], update);
restaurantRouter.get('/restaurants/filter',[authentication], get);
restaurantRouter.get('/restaurants',[authentication], index);
restaurantRouter.delete('/restaurants/:id', [authentication,validate.deleteRestaurant], destroy);
restaurantRouter.post('/restaurants/login', [validate.login], login);

module.exports = restaurantRouter