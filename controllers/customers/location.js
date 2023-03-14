const db = require("../../models");
const { Restaurant } = db
const { Op } = require("sequelize");

//=======================================GET/GET-ALL-PLACES-WITHIN-THE-GIVEN-RADIUS====================================================//

const restaurantsNearby = async function (req, res) {
    try {

        let data = req.body
        let { customerLatitude, customerLongitude, radiusInKM } = data

        if (!("radiusInKM" in data)) {
            let findRadiusInKm = await Restaurant.findOne({
                limit: 1,
                attributes: ['radiusInKM']
            })
            radiusInKM = findRadiusInKm.radiusInKM
        }

        function toRadians(degrees) {
            return degrees * (Math.PI / 180);
        }

        let minLatitude = customerLatitude - (radiusInKM / 111.12)
        let maxLatitude = customerLatitude + (radiusInKM / 111.12)
        let minLongitude = customerLongitude - (radiusInKM) / Math.abs(Math.cos(toRadians(customerLongitude)) * 111.12)
        let maxLongitude = customerLongitude + (radiusInKM) / Math.abs(Math.cos(toRadians(customerLongitude)) * 111.12);


        const restaurantsNearby = await Restaurant.findAll({
            where: {
                latitude: {
                    [Op.between]: [minLatitude, maxLatitude]
                },
                longitude: {
                    [Op.between]: [minLongitude, maxLongitude]
                }
            }
        })
        ''
        if (restaurantsNearby.length === 0) {
            return res.status(422).send({ status: 1006, message: "No Restaurants found nearby..." })
        }

        return res.status(200).send({ status: 1010, message: "All Restaurants as per the location:", restaurants: restaurantsNearby.length, data: restaurantsNearby })
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

module.exports = {
    restaurantsNearby
}