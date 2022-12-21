require("dotenv").config();
const db = require("../../models");
const { FoodItem } = db
const { Op } = require("sequelize");

//========================================GET/GET-ALL-MENU==========================================================//

const index = async function (req, res) {
    try {

        let data = req.query
        let { categoryName, itemName, itemPrice, isActive } = data

        if (Object.keys(req.query).length > 0) {
            let findMenuByFilter = await FoodItem.findAll({
                where: {
                    [Op.or]: [{ categoryName: { [Op.eq]: categoryName } }, { itemName: { [Op.eq]: itemName } },
                    { itemPrice: { [Op.eq]: itemPrice } }, { isActive: { [Op.eq]: isActive } }],
                }
            })

            if (!findMenuByFilter.length)
                return res.status(404).send({ status: 1006, message: "No Food items found" })

            return res.status(200).send({ status: 1010, Menu: findMenuByFilter })
        } else {
            let findOrderStatusByFilter = await FoodItem.findAll()

            if (!findOrderStatusByFilter.length)
                return res.status(404).send({ status: 1006, message: "No Food items found" })

            return res.status(200).send({ status: 1010, data: findOrderStatusByFilter })
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