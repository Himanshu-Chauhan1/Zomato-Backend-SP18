require("dotenv").config();
const { uploadFile } = require("../../Utils/aws")
const db = require("../../models");
const { FoodItem } = db
const { Op } = require("sequelize");


//========================================POST /CREATE-A-FOOD-ITEM==========================================================//

const create = async function (req, res) {
    try {

        const foodItemCreated = await FoodItem.create(req.body)

        res.status(201).send({ status: 1009, message: "A new food item has been created successfully", data: foodItemCreated })

    } catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================POST/UPDATE-A-FOOD-ITEM==========================================================//

const update = async function (req, res) {
    try {

        const foodItemId = req.params.foodItemId
        let data = req.body

        const values = data;
        const condition = { where: { id: foodItemId } };
        const options = { multi: true };

        const updateDetails = await FoodItem.update(values, condition, options)

        return res.status(200).send({ status: 1010, message: "The entered food details has been Updated Succesfully", updatedData: values })
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

//========================================GET/GET-ALL-FOOD-ITEMS==========================================================//

const index = async function (req, res) {
    try {

        let data = req.query
        let paramsRestaurantId = req.params.restaurantId

        const { categoryName, itemName, itemPrice, isActive } = data

        if (Object.keys(req.query).length > 0) {
            let findFoodItemsByFilter = await FoodItem.findAll({
                where: {
                    restaurantId: { [Op.eq]: paramsRestaurantId },
                    [Op.or]: [
                        { categoryName: categoryName },
                        { restaurantId: paramsRestaurantId },
                        {
                            itemPrice: {
                                $gte: itemPrice,
                                $lte: itemPrice,
                                $gt: itemPrice,
                                $lt: itemPrice
                            }
                        },
                        { itemName: itemName },
                    ],
                }
            })

            if (!findFoodItemsByFilter.length)
                return res.status(404).send({ status: 1006, message: "No food items found as per the filters....." })

            return res.status(200).send({ status: 1010, data: findFoodItemsByFilter })
        } else {
            let findAllFoodItems = await FoodItem.findAll({ where: { restaurantId: paramsRestaurantId } })

            if (!findAllFoodItems.length)
                return res.status(404).send({ status: 1006, message: "No Food items found...." })

            return res.status(200).send({ status: 1010, data: findAllFoodItems })
        }
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
};

//========================================DELETE/DELETE-A-FOOD-ITEM==========================================================//

const destroy = async function (req, res) {
    try {

        let foodItemId = req.params.foodItemId

        let deleteFoodItem = await FoodItem.destroy({ where: { id: foodItemId } })

        return res.status(200).send({ status: 1010, message: "The foodItem has been deleted Successfully", data: deleteFoodItem })
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
}

//========================================UPLOAD/UPLOAD-A-ITEM-IMAGE==========================================================//

const upload = async function (req, res) {
    try {
        let files = req.files


        if (files && files.length > 0) {

            let uploadedFileURL = await uploadFile(files[0])

            let uploadedImage = {
                itemImageURL: uploadedFileURL
            }

            return res.status(201).send({ status: 1010, message: "The itemImage has been uploaded succesfully", data: uploadedImage })
        }
        else {

            return res.status(422).send({ status: 1006, message: "No itemImage found to upload..." })
        }
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
    destroy,
    upload
}