const express = require("express")
const offerRouter = express.Router()
const validate = require("../../validators/restaurants/offer")
const { authentication } = require("../../middlewares/authentication");
const { create, update, index, destroy } = require("../../controllers/restaurants/offer");
const { authorization } = require("../../middlewares/authorization")


offerRouter.post('/restaurants/:id/offers', [authentication, authorization, validate.createOffer], create);
offerRouter.put('/restaurants/:id/offers/:offerId', [authentication, authorization, validate.updateOffer], update);
offerRouter.get('/restaurants/:id/offers', [authentication, authorization, validate.getOffer], index);
offerRouter.delete('/restaurants/:id/offers/:offerId', [authentication, authorization, validate.deleteOffer], destroy);

module.exports = offerRouter