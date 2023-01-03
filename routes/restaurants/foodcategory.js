const express = require("express")
const foodCategoryRouter = express.Router()
const validate = require("../../validators/restaurants/foodCategory")
const { authentication } = require("../../middlewares/authentication");
const { create, update, index, destroy } = require("../../controllers/restaurants/foodCategory");
const { authorization } = require("../../middlewares/authorization")


foodCategoryRouter.post('/restaurants/:id/foodcategory', [authentication, authorization, validate.createFoodCategory], create);
foodCategoryRouter.put('/restaurants/:id/foodcategory/:categoryId', [authentication, authorization, validate.updateFoodCategory], update);
foodCategoryRouter.get('/restaurants/:id/foodcategory', [authentication, authorization, validate.getFoodCategory], index);
foodCategoryRouter.delete('/restaurants/:id/foodcategory/:categoryId', [authentication, authorization, validate.deleteFoodCategory], destroy);

module.exports = foodCategoryRouter