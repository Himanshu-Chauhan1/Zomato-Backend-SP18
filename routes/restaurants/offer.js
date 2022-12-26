const express = require("express")
const offerRouter = express.Router()
const validate = require("../../validators/restaurants/offer")
// const { authentication } = require("../../middlewares/authentication");
const { create, update, index, destroy } = require("../../controllers/restaurants/offer");
// const { authorization } = require("../../middleware/authorization")


offerRouter.post('/restaurantId/:restaurantId/offers', [validate.createOffer], create);
offerRouter.put('/restaurantId/:restaurantId/offers/:offerId', [validate.updateOffer], update);
offerRouter.get('/restaurantId/:restaurantId/offers', index);
offerRouter.delete('/restaurantId/:restaurantId/offers/:offerId', [validate.deleteOffer], destroy);

module.exports = offerRouter