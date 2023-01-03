require("dotenv").config();
const db = require("../../models");
const { FoodCategory } = db
const { Op } = require("sequelize");


//========================================POST /CREATE-A-FOOD-CATEGORY==========================================================//

const create = async function (req, res) {
    try {

        const foodCategoryCreated = await FoodCategory.create(req.body)

        res.status(201).send({ status: 1009, message: "A new food category has been created successfully", data: foodCategoryCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST/UPDATE-A-FOOD-CATEGORY==========================================================//

const update = async function (req, res) {
    try {
        const foodCategoryId = req.params.categoryId
        let data = req.body

        const values = data;
        const condition = { where: { id: foodCategoryId } };
        const options = { multi: true };

        const updateDetails = await FoodCategory.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered food Category details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================GET/GET-ALL-FOOD-CATEGORIES==========================================================//

const index = async function (req, res) {
    try {

        let data = req.query
        let paramsRestaurantId = req.params.id

        const { categoryName, isActive } = data

        if (Object.keys(req.query).length > 0) {
            let findFoodCategoryByFilter = await FoodCategory.findAll({
                where: {
                    restaurantId: { [Op.eq]: paramsRestaurantId },
                    [Op.or]: [
                        { categoryName: categoryName },
                        { isActive: isActive },
                    ],
                }
            })

            if (!findFoodCategoryByFilter.length)
                return res.status(404).send({ status: 1006, message: "No food categories found as per the filters....." })

            return res.status(200).send({ status: 1010, Menu: findFoodCategoryByFilter })
        } else {
            let findAllFoodCategory = await FoodCategory.findAll({ where: { restaurantId: paramsRestaurantId } })

            if (!findAllFoodCategory.length)
                return res.status(404).send({ status: 1006, message: "No food categories found" })

            return res.status(200).send({ status: 1010, data: findAllFoodCategory })
        }
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//========================================DELETE/DELETE-A-FOOD-CATEGORY==========================================================//

const destroy = async function (req, res) {
    try {

        let paramsRestaurantId = req.params.id
        let foodCategoryId = req.params.categoryId

        let deleteFoodCategory = await FoodCategory.destroy({ where: { id: foodCategoryId, restaurantId: paramsRestaurantId } })

        return res.status(200).send({ status: 1010, message: "The food category has been deleted Successfully", data: deleteFoodCategory })
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

module.exports = {
    create,
    update,
    index,
    destroy
}