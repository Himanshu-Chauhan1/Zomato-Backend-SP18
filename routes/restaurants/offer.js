const express = require("express")
const offerRouter = express.Router()
const validate = require("../../validators/restaurants/offer")
// const { authentication } = require("../../middlewares/authentication");
const { create, update, index, destroy} = require("../../controllers/restaurants/offer");
// const { authorization } = require("../../middleware/authorization")


offerRouter.post('/offers', [validate.createOffer], create);
offerRouter.put('/offers/:id', [validate.updateOffer], update);
offerRouter.get('/offers', index);
offerRouter.delete('/offers/:id', [validate.deleteOffer], destroy);

module.exports = offerRouter