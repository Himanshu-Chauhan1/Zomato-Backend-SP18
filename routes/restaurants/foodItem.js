const express = require("express")
const foodItemRouter = express.Router()
const validate = require("../../validators/restaurants/foodItem")
// const { authentication } = require("../../middlewares/authentication");
const { create, update, index, destroy, upload } = require("../../controllers/restaurants/foodItem");
// const { authorization } = require("../../middleware/authorization")


foodItemRouter.post('/fooditems', [validate.createFoodItem], create);
foodItemRouter.put('/fooditems/:id', [validate.updateFoodItem], update);
foodItemRouter.get('/fooditems', index);
foodItemRouter.delete('/fooditems/:id', [validate.deleteFoodItem], destroy);
foodItemRouter.post('/fooditems/upload', upload);



module.exports = foodItemRouter