const db = require("../../models")
const validUrl = require('valid-url');
const { FoodItem, FoodCategory, Restaurant } = db
const { Op } = require("sequelize");


////////////////////////// -GLOBAL- //////////////////////
const isValid = function (value) {
    if (!value || typeof value != "string" || value.trim().length == 0)
        return false;
    return true;
};

////////////////////////// -GLOBAL- //////////////////////
const isValidNumber = function (itemPrice) {
    if (!itemPrice || typeof itemPrice != DECIMAL || itemPrice.trim().length == 0)
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

//////////////// -FOR ITEM-AVILABLE- ///////////////////////
const isActiveItem = (isActive) => {
    return /^(true|false|True|False)$/.test(isActive);
};

//////////////// -FOR CATEGORY-AVAILABLE- ///////////////////////
const isValidFutureDate = (dateCreated) => {
    return /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(dateCreated);
};

//========================================Create-A-FoodItem==========================================================//

const createFoodItem = async function (req, res, next) {
    try {

        const enteredRestaurantId = req.params.restaurantId

        let checkRestaurantId = enteredRestaurantId.split('').length

        if (checkRestaurantId != 36) {
            return res.status(422).send({ status: 1003, message: "Restaurant-Id is not valid" })
        }

        let paramsRestaurantId = enteredRestaurantId

        const checkEnteredRestaurantId = await Restaurant.findOne({ where: { id: paramsRestaurantId } });

        if (!checkEnteredRestaurantId) {
            return res.status(422).send({ status: 1006, message: "Restaurant-ID does not exists" })
        }

        const data = req.body

        const { restaurantId, categoryName, itemName, itemDescription, itemPrice, itemImage, isActive } = req.body

        if (!isValid(restaurantId)) {

            return res.status(422).send({ status: 1002, message: "restaurantId is required" })
        }

        if (restaurantId.length != 36) {
            return res.status(422).send({ status: 1003, message: "Please enter restaurantId-Id in a valid format" })
        }

        const isRegisteredRestaurantId = await FoodCategory.findOne({ where: { restaurantId: restaurantId, categoryName: categoryName } });

        if (!isRegisteredRestaurantId) {
            return res.status(422).send({ status: 1008, message: "This restaurantId is not registered under this category, Please enter a registered one" })
        }

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(categoryName)) {
            return res.status(422).send({ status: 1002, message: "categoryId is required" })
        }

        const isRegisteredCategory = await FoodCategory.findOne({ where: { categoryName: categoryName, restaurantId: restaurantId } });

        if (!isRegisteredCategory) {
            return res.status(422).send({ status: 1008, message: "This category is not registered under this restaurant, Please enter a registered category" })
        }

        if (!isValid(itemName)) {
            return res.status(422).send({ status: 1002, message: "itemName is required" })
        }

        const isRegisteredItemName = await FoodItem.findOne({ where: { itemName: itemName, restaurantId: restaurantId } });

        if (isRegisteredItemName) {
            return res.status(422).send({ status: 1008, message: "This itemName is already registered, Please enter a new one" })
        }

        if (!isValid(itemDescription)) {
            return res.status(422).send({ status: 1002, message: "itemName is required" })
        }

        if (!isValidItemDescription(itemDescription)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid itemDescription" })
        }

        // if (!isValidNumber(itemPrice)) {
        //     return res.status(422).send({ status: 1002, message: "itemPrice is required" })
        // }

        if (!isValidItemPrice(itemPrice)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid itemPrice" })
        }

        if (!isValid(itemImage)) {
            return res.status(422).send({ status: 1002, message: "itemImage is required" })
        }

        const isRegisteredItemImage = await FoodItem.findOne({ where: { itemImage: itemImage } });

        if (isRegisteredItemImage) {
            return res.status(422).send({ status: 1008, message: "This itemImage is already registered, Please enter a new one" })
        }

        if (!(validUrl.isWebUri(data.itemImage.trim()))) return res.status(400).send({ status: 1003, message: "Please Provide a valid itemImage Url" })

        if (!isValid(isActive)) {
            return res.status(422).send({ status: 1002, message: "isActive is required" })
        }

        if (!isActiveItem(isActive)) {
            return res.status(422).send({ status: 1003, message: "Please provide a item isActive like True or false etc" })
        }

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Update-A-FoodItem==========================================================//

const updateFoodItem = async function (req, res, next) {
    try {

        const enteredRestaurantId = req.params.restaurantId

        let checkRestaurantId = enteredRestaurantId.split('').length

        if (checkRestaurantId != 36) {
            return res.status(422).send({ status: 1003, message: "Restaurant-Id is not valid" })
        }

        let paramsRestaurantId = enteredRestaurantId

        const checkEnteredRestaurantId = await Restaurant.findOne({ where: { id: paramsRestaurantId } });

        if (!checkEnteredRestaurantId) {
            return res.status(422).send({ status: 1006, message: "Restaurant-ID does not exists" })
        }

        const enteredId = req.params.foodItemId

        let checkFoodItemId = enteredId.split('').length

        if (checkFoodItemId != 36) {
            return res.status(422).send({ status: 1003, message: "FoodItem-Id is not valid" })
        }

        let foodItemId = enteredId

        const enteredFoodItemId = await FoodItem.findOne({ where: { id: foodItemId } })

        if (!enteredFoodItemId) {
            return res.status(422).send({ status: 1006, message: "Provided FoodItem-ID does not exists" })
        }

        const data = req.body

        const { restaurantId, categoryName, itemName, itemDescription, itemPrice, itemImage, isActive } = req.body

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if ("restaurantId" in data) {

            if (!isValid(restaurantId)) {
                return res.status(422).send({ status: 1002, message: "restaurantId is required" })
            }

            if (restaurantId.length != 36) {
                return res.status(422).send({ status: 1003, message: "Please enter restaurantId-Id in a valid format" })
            }

            const isRegisteredRestaurantId = await FoodCategory.findOne({ where: { categoryName: categoryName, restaurantId: paramsRestaurantId } });

            if (!isRegisteredRestaurantId) {
                return res.status(422).send({ status: 1008, message: "This restaurantId is not registered under this category, Please enter a registered one" })
            }

            dataObject['restaurantId'] = restaurantId
        }


        if ("categoryName" in data) {

            if (!isValid(categoryName)) {
                return res.status(422).send({ status: 1002, message: "categoryId is required" })
            }

            const isRegisteredCategory = await FoodCategory.findOne({ where: { categoryName: categoryName } });

            if (!isRegisteredCategory) {
                return res.status(422).send({ status: 1008, message: "This category is not registered, Please enter a registered category" })
            }

            dataObject['categoryName'] = categoryName
        }

        if ("itemName" in data) {

            if (!isValid(itemName)) {
                return res.status(422).send({ status: 1002, message: "itemName is required" })
            }

            const isRegisteredItemName = await FoodItem.findOne({ where: { itemName: itemName } });

            if (isRegisteredItemName) {
                return res.status(422).send({ status: 1008, message: "This itemName is already registered, Please enter a new one" })
            }

            dataObject['itemName'] = itemName
        }

        if ("itemDescription" in data) {

            if (!isValid(itemDescription)) {
                return res.status(422).send({ status: 1002, message: "itemName is required" })
            }

            if (!isValidItemDescription(itemDescription)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid itemDescription" })
            }

            dataObject['itemDescription'] = itemDescription
        }

        if ("itemPrice" in data) {

            if (!isValid(itemPrice)) {
                return res.status(422).send({ status: 1002, message: "itemPrice is required" })
            }

            if (!isValidItemPrice(itemPrice)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid itemPrice" })
            }

            dataObject['itemPrice'] = itemPrice
        }

        if ("itemImage" in data) {

            if (!isValid(itemImage)) {
                return res.status(422).send({ status: 1002, message: "itemImage is required" })
            }

            if (!(validUrl.isWebUri(data.itemImage.trim()))) return res.status(400).send({ status: 1003, message: "Please Provide a valid itemImage Url" })

            const isRegisteredItemImage = await FoodItem.findOne({ where: { itemImage: itemImage } });

            if (isRegisteredItemImage) {
                return res.status(422).send({ status: 1008, message: "This itemImage is already registered, Please enter a new one" })
            }

            dataObject['itemImage'] = itemPrice
        }

        if ("isActive" in data) {

            if (!isValid(isActive)) {
                return res.status(422).send({ status: 1002, message: "isActive is required" })
            }

            if (!isActiveItem(isActive)) {
                return res.status(422).send({ status: 1003, message: "Please provide a item isActive like True or false etc" })
            }

            dataObject['isActive'] = isActive
        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Get-All-FoodItem==========================================================//

const getFoodItem = async function (req, res, next) {
    try {

        const enteredRestaurantId = req.params.restaurantId

        let checkRestaurantId = enteredRestaurantId.split('').length

        if (checkRestaurantId != 36) {
            return res.status(422).send({ status: 1003, message: "Restaurant-Id is not valid" })
        }

        let paramsRestaurantId = enteredRestaurantId

        const checkEnteredRestaurantId = await Restaurant.findOne({ where: { id: paramsRestaurantId } });

        if (!checkEnteredRestaurantId) {
            return res.status(422).send({ status: 1006, message: "There is no restaurant with this Restaurant-ID" })
        }

        if (checkEnteredRestaurantId.id != paramsRestaurantId) {
            return res.status(400).send({ status: 1003, message: 'this category does not belongs to your restaurant! Enter appropriate categoryId' })
        }

        let data = req.query

        const { categoryName, itemName, itemPrice, isActive } = data

        if ("categoryName" in data) {

            if (!isValid(categoryName)) {
                return res.status(422).send({ status: 1002, message: "categoryName is required" })
            }

            if (!isValidCategoryName(categoryName)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid categoryName" })
            }

            const isRegisteredCategory = await FoodItem.findOne({ where: { categoryName: categoryName, restaurantId: paramsRestaurantId } });

            if (!isRegisteredCategory) {
                return res.status(422).send({ status: 1008, message: "There is no category with this name, Please enter a new one" })
            }

        }

        if ("itemName" in data) {

            if (!isValid(itemName)) {
                return res.status(422).send({ status: 1002, message: "itemName is required" })
            }

            const isRegisteredItemName = await FoodItem.findOne({ where: { itemName: itemName, categoryName: categoryName, restaurantId: paramsRestaurantId } });

            if (isRegisteredItemName) {
                return res.status(422).send({ status: 1008, message: "This are no items with this name in this category, Please try a new one" })
            }
        }

        if ("itemPrice" in data) {

            if (!isValidItemPrice(itemPrice)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid itemPrice" })
            }

            // if (!isValid(itemImage)) {
            //     return res.status(422).send({ status: 1002, message: "itemImage is required" })
            // }
        }

        if ("isActive" in data) {

            if (!isValid(isActive)) {
                return res.status(422).send({ status: 1002, message: "isActive is required" })
            }

            if (!isActiveCategory(isActive)) {
                return res.status(422).send({ status: 1003, message: "Please provide a category isActive like True or false etc" })
            }

            const isRegisteredActiveCategory = await FoodItem.findOne({ where: { isActive: isActive, restaurantId: paramsRestaurantId } });

            if (!isRegisteredActiveCategory) {
                return res.status(422).send({ status: 1008, message: "There is no active or inactive items with this name in the category, Please enter a new one" })
            }

        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Delete-A-FoodItem==========================================================//

const deleteFoodItem = async function (req, res, next) {
    try {

        const enteredRestaurantId = req.params.restaurantId

        let checkRestaurantId = enteredRestaurantId.split('').length

        if (checkRestaurantId != 36) {
            return res.status(422).send({ status: 1003, message: "Restaurant-Id is not valid" })
        }

        let paramsRestaurantId = enteredRestaurantId

        const checkEnteredRestaurantId = await Restaurant.findOne({ where: { id: paramsRestaurantId } });

        if (!checkEnteredRestaurantId) {
            return res.status(422).send({ status: 1006, message: "Restaurant-ID does not exists" })
        }

        const enteredId = req.params.foodItemId

        let checkFoodItemId = enteredId.split('').length

        if (checkFoodItemId != 36) {
            return res.status(422).send({ status: 1003, message: "FoodItem-Id is not valid" })
        }

        let foodItemId = enteredId

        const enteredFoodItemId = await FoodItem.findOne({ where: { id: foodItemId } })

        if (!enteredFoodItemId) {
            return res.status(422).send({ status: 1006, message: "Provided FoodItem-ID does not exists" })
        }

        next()
    }
    catch (err) {
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};



module.exports = {
    createFoodItem,
    updateFoodItem,
    getFoodItem,
    deleteFoodItem
}







