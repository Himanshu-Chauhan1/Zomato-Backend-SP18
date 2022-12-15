const express = require("express")
const foodCategoryRouter = express.Router()
const validate = require("../../validators/restaurants/foodCategory")
const { authentication } = require("../../middlewares/authentication");
const { create, update, index, destroy} = require("../../controllers/restaurants/foodCategory");
// const { authorization } = require("../../middleware/authorization")


foodCategoryRouter.post('/foodcategory', [validate.createFoodCategory], create);
foodCategoryRouter.put('/foodcategory/:id', [validate.updateFoodCategory], update);
foodCategoryRouter.get('/foodcategory', index);
foodCategoryRouter.delete('/foodcategory/:id', [validate.deleteFoodCategory], destroy);

module.exports = foodCategoryRouter