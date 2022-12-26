const express = require("express")
const foodCategoryRouter = express.Router()
const validate = require("../../validators/restaurants/foodCategory")
// const { authentication } = require("../../middlewares/authentication");
const { create, update, index, destroy} = require("../../controllers/restaurants/foodCategory");
// const { authorization } = require("../../middleware/authorization")


foodCategoryRouter.post('/restaurants/:restaurantId/foodcategory', [validate.createFoodCategory], create);
foodCategoryRouter.put('/restaurants/:restaurantId/foodcategory/:categoryId', [validate.updateFoodCategory], update);
foodCategoryRouter.get('/restaurants/:restaurantId/foodcategory', index);
foodCategoryRouter.delete('/restaurants/:restaurantId/foodcategory/:categoryId', [validate.deleteFoodCategory], destroy);

module.exports = foodCategoryRouter