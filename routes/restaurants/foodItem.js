const express = require("express")
const foodItemRouter = express.Router()
const validate = require("../../validators/restaurants/foodItem")
// const { authentication } = require("../../middlewares/authentication");
const { create, update, index, destroy, upload } = require("../../controllers/restaurants/foodItem");
// const { authorization } = require("../../middleware/authorization")


foodItemRouter.post('/restaurants/:restaurantId/fooditems', [validate.createFoodItem], create);
foodItemRouter.put('/restaurants/:restaurantId/fooditems/:foodItemId', [validate.updateFoodItem], update);
foodItemRouter.get('/restaurants/:restaurantId/fooditems', index);
foodItemRouter.delete('/restaurants/:restaurantId/fooditems/:foodItemId', [validate.deleteFoodItem], destroy);
foodItemRouter.post('/restaurants/:restaurantId/fooditems/upload', upload);



module.exports = foodItemRouter