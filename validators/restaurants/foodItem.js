const db = require("../../models")
const validUrl = require('valid-url');
const { FoodItem, FoodCategory, Restaurant } = db

////////////////////////// -GLOBAL- //////////////////////
const isValid = function (value) {
    if (!value || typeof value != "string" || value.trim().length == 0)
        return false;
    return true;
};

////////////////////////// -GLOBAL- //////////////////////
const isValidNumber = function (value) {
    if (!value || typeof value != "number")
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
    return /^((100)|(\d{1,2}(.\d*)?))$/.test(itemPrice);
};

//////////////// -FOR ITEM-AVILABLE- ///////////////////////
const isActiveItem = (isActive) => {
    return /^(true|false|True|False)$/.test(isActive);
};

//========================================Create-A-FoodItem==========================================================//

const createFoodItem = async function (req, res, next) {
    try {

        const enteredRestaurantId = req.params.id

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

        const { categoryName, itemName, itemDescription, itemPrice, itemImage, isActive } = req.body

        data.restaurantId = paramsRestaurantId

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(categoryName)) {
            return res.status(422).send({ status: 1002, message: "categoryId is required" })
        }

        const isRegisteredCategory = await FoodCategory.findOne({ where: { categoryName: categoryName, restaurantId: paramsRestaurantId } });

        if (!isRegisteredCategory) {
            return res.status(422).send({ status: 1008, message: "This category is not registered under this restaurant, Please enter a registered category" })
        }

        if (!isValid(itemName)) {
            return res.status(422).send({ status: 1002, message: "itemName is required" })
        }

        const isRegisteredItemName = await FoodItem.findOne({ where: { itemName: itemName, restaurantId: paramsRestaurantId } });

        if (isRegisteredItemName) {
            return res.status(422).send({ status: 1008, message: "This itemName is already registered, Please enter a new one" })
        }

        if (!isValid(itemDescription)) {
            return res.status(422).send({ status: 1002, message: "itemName is required" })
        }

        if (!isValidItemDescription(itemDescription)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid itemDescription" })
        }

        if (!isValidNumber(itemPrice)) {
            return res.status(422).send({ status: 1002, message: "itemPrice is required" })
        }

        if (!isValidItemPrice(itemPrice)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid itemPrice" })
        }

        if (!isValid(itemImage)) {
            return res.status(422).send({ status: 1002, message: "itemImage is required" })
        }

        const isRegisteredItemImage = await FoodItem.findOne({ where: { itemImage: itemImage, restaurantId: paramsRestaurantId } });

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

        const enteredRestaurantId = req.params.id

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

        const enteredRestaurantId = req.params.id

        let checkRestaurantId = enteredRestaurantId.split('').length

        if (checkRestaurantId != 36) {
            return res.status(422).send({ status: 1003, message: "Restaurant-Id is not valid" })
        }

        let paramsRestaurantId = enteredRestaurantId

        const checkEnteredRestaurantId = await Restaurant.findOne({ where: { id: paramsRestaurantId } });

        if (!checkEnteredRestaurantId) {
            return res.status(422).send({ status: 1006, message: "There is no restaurant with this Restaurant-ID" })
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

        }

        if ("itemName" in data) {

            if (!isValid(itemName)) {
                return res.status(422).send({ status: 1002, message: "itemName is required" })
            }
        }

        if ("itemPrice" in data) {
            
            if (!isValidNumber(itemPrice)) {
                return res.status(422).send({ status: 1002, message: "itemPrice is required" })
            }

            if (!isValidItemPrice(itemPrice)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid itemPrice" })
            }

        }

        if ("isActive" in data) {

            if (!isValid(isActive)) {
                return res.status(422).send({ status: 1002, message: "isActive is required" })
            }

            if (!isActiveCategory(isActive)) {
                return res.status(422).send({ status: 1003, message: "Please provide a category isActive like True or false etc" })
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

        const enteredRestaurantId = req.params.id

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

        const enteredFoodItemId = await FoodItem.findOne({ where: { id: foodItemId, restaurantId: paramsRestaurantId } })

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







