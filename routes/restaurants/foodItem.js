const express = require("express")
const foodItemRouter = express.Router()
const validate = require("../../validators/restaurants/foodItem")
const { authentication } = require("../../middlewares/authentication");
const { create, update, index, destroy, upload } = require("../../controllers/restaurants/foodItem");
const { authorization } = require("../../middlewares/authorization")


foodItemRouter.post('/restaurants/:id/fooditems', [authentication, authorization, validate.createFoodItem], create);
foodItemRouter.put('/restaurants/:id/fooditems/:foodItemId', [authentication, authorization, validate.updateFoodItem], update);
foodItemRouter.get('/restaurants/:id/fooditems', [authentication, authorization], index);
foodItemRouter.delete('/restaurants/:id/fooditems/:foodItemId', [authentication, authorization, validate.deleteFoodItem], destroy);
foodItemRouter.post('/restaurants/:id/fooditems/upload', [authentication, authorization], upload);



module.exports = foodItemRouter