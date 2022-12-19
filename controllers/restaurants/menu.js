require("dotenv").config();
const db = require("../../models");
const { FoodItem } = db
const { Op } = require("sequelize");

//========================================GET/GET-ALL-MENU==========================================================//

const index = async function (req, res) {
    try {

        let data = req.query

        let findMenuByFilter = await FoodItem.findAll({
            where: {
                [Op.or]: [{ categoryName: { [Op.eq]: data.categoryName } }, { itemName: { [Op.eq]: data.itemName } },
                { itemPrice: { [Op.eq]: data.itemPrice } }, { isActive: { [Op.eq]: data.isActive } }],
            }
        })

        if (!findMenuByFilter.length)
            return res.status(404).send({ status: 1006, message: "No such documents found" })

        return res.status(200).send({ status: 1010, Menu: findMenuByFilter })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

module.exports = {
    index
}