require("dotenv").config();
const db = require("../../models");
const { FoodItem } = db
const { Op } = require("sequelize");

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
                        { restaurantId: { [Op.eq]: restaurantId } },
                        { categoryName: { [Op.eq]: categoryName } }, 
                        { itemName: { [Op.eq]: itemName } }, 
                    ],
                }
            })

            if (!findMenuByFilter.length)
                return res.status(404).send({ status: 1006, message: "No Food items found as per the filters applied" })

            return res.status(200).send({ status: 1010, data: findMenuByFilter })
        } else {

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