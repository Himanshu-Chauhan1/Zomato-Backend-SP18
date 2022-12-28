const express = require("express")
const offerRouter = express.Router()
const validate = require("../../validators/restaurants/offer")
// const { authentication } = require("../../middlewares/authentication");
const { create, update, index, destroy } = require("../../controllers/restaurants/offer");
// const { authorization } = require("../../middleware/authorization")


offerRouter.post('/restaurants/:restaurantId/offers', [validate.createOffer], create);
offerRouter.put('/restaurants/:restaurantId/offers/:offerId', [validate.updateOffer], update);
offerRouter.get('/restaurants/:restaurantId/offers', [validate.getOffer], index);
offerRouter.delete('/restaurants/:restaurantId/offers/:offerId', [validate.deleteOffer], destroy);

module.exports = offerRouter