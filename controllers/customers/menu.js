require("dotenv").config();
const db = require("../../models");
const { FoodItem, Location } = db
const { Op } = require("sequelize");
const sequelize = require("sequelize")

//==================================================GET/GET-ALL-MENU==========================================================//

const index = async function (req, res) {
    try {

        let data = req.query
        let { restaurantId, categoryName, itemName } = data

        if (Object.keys(req.query).length > 0) {
            let findMenuByFilter = await FoodItem.findAll({
                where: {
                    isActive: { [Op.eq]: true },
                    [Op.or]: [
                        { restaurantId: { [Op.like]: `%${restaurantId}%` } },
                        { categoryName: { [Op.like]: `%${categoryName}%` } },
                        { itemName: { [Op.like]: `%${itemName}%` } },

                    ],
                }
            }
            )

            if (!findMenuByFilter.length)
                return res.status(404).send({ status: 1006, message: "No Food items found as per the filters applied" })


            return res.status(200).send({ status: 1010, data: findMenuByFilter })
        } else {

            restaurantId="d43a3b46-9bf6-4fb5-bee0-042131bb546e"

            let findLongitude = await Location.findOne({ where: { restaurantId: restaurantId } })
            let longitude=findLongitude.coordinates.coordinates[0]
            let latitude=findLongitude.coordinates.coordinates[1]
            console.log(findLongitude.coordinates.coordinates[0])

            let findCustomerLocation = await Location.findAll({
                where: sequelize.literal(`ST_Distance_Sphere(Point(coordinates), Point(${longitude}, ${latitude})) / 1000 <= 10`),
                order: sequelize.literal(`ST_Distance_Sphere(Point(coordinates), Point(${longitude}, ${latitude}))`)
            })

            console.log(findCustomerLocation.coordinates.coordinates)

            let findAllMenu = await FoodItem.findAll({ where: { isActive: true } })

            if (!findAllMenu.length)
                return res.status(404).send({ status: 1006, message: "No Food items found" })

            return res.status(200).send({ status: 1010, data: findAllMenu })
        }
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

module.exports = {
    index
}