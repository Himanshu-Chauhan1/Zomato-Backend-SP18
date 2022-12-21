const db = require("../../models")
const validUrl = require('valid-url')
const { FoodCategory, FoodItem } = db


////////////////////////// -GLOBAL- //////////////////////
const isValid = function (value) {
    if (!value || typeof value != "string" || value.trim().length == 0)
        return false;
    return true;
};

//////////////// -FOR EMPTY BODY- ///////////////////////
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
};

//////////////// -FOR ITEM-DESCRIPTION- ///////////////////////
const isValidItemDescription = (itemDescription) => {
    return /^[A-Za-z\s.\(\)0-9]{3,}$/.test(itemDescription);
};

//////////////// -FOR ITEMPRICE- ///////////////////////
const isValidItemPrice = (itemPrice) => {
    return /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/.test(itemPrice);
};

//////////////// -FOR CATEGORY-AVILABLE- ///////////////////////
const isActiveItem = (isActive) => {
    return /^(true|false|True|False)$/.test(isActive);
};

//========================================Delete-A-Restaurant==========================================================//

const getMenu = async function (req, res, next) {
    try {
        let data = req.query
        
        let { categoryName, itemName, itemPrice, isActive } = data


        if ("categoryName" in data) {

            if (!isValid(categoryName)) {
                return res.status(422).send({ status: 1002, message: "categoryId is required" })
            }

            const isRegisteredCategory = await FoodCategory.findOne({ where: { categoryName: categoryName } });

            if (!isRegisteredCategory) {
                return res.status(422).send({ status: 1008, message: "This category is not registered, Please enter a registered category" })
            }
        }

        if ("itemName" in data) {

            if (!isValid(itemName)) {
                return res.status(422).send({ status: 1002, message: "itemName is required" })
            }

            const isRegisteredItemName = await FoodItem.findOne({ where: { itemName: itemName } });

            if (!isRegisteredItemName) {
                return res.status(422).send({ status: 1008, message: "This itemName is not registered, Please enter a registered one" })
            }

        }

        if ("itemPrice" in data) {

            if (!isValid(itemPrice)) {
                return res.status(422).send({ status: 1002, message: "itemPrice is required" })
            }

            if (!isValidItemPrice(itemPrice)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid itemPrice" })
            }

            const isRegisteredItemPrice = await FoodItem.findOne({ where: { itemPrice: itemPrice } });

            if (!isRegisteredItemPrice) {
                return res.status(422).send({ status: 1008, message: "The itemPrice does not belongs to any of items please enter a another one" })
            }

        }

        if ("isActive" in data) {

            if (!isValid(isActive)) {
                return res.status(422).send({ status: 1002, message: "isActive is required" })
            }

            if (!isActiveItem(isActive)) {
                return res.status(422).send({ status: 1003, message: "Please provide a item isActive like True or false etc" })
            }

        }

        next()
    }
    catch (err) {
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};



module.exports = {
    getMenu
}







