const db = require("../../models")
const { FoodCategory, Restaurant } = db

////////////////////////// -GLOBAL- //////////////////////
const isValid = function (value) {
    if (!value || typeof value != "string" || value.trim().length == 0)
        return false;
    return true;
};

//////////////// -FOR EMPTY BODY- ///////////////////////
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
};

//////////////// -FOR CATEGORYNAME- ///////////////////////
const isValidCategoryName = (categoryName) => {
    return /^[a-zA-Z ]+$/.test(categoryName)
};

//////////////// -FOR CATEGORYAVAILABLE- ///////////////////////
const isActiveCategory = (isActive) => {
    return /^(true|false|True|False)$/.test(isActive)
};

//========================================Create-A-FoodCategory==========================================================//

const createFoodCategory = async function (req, res, next) {
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

        const { restaurantId, categoryName, isActive } = req.body

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        data.restaurantId = paramsRestaurantId

        if (!isValid(categoryName)) {
            return res.status(422).send({ status: 1002, message: "categoryName is required" })
        }

        if (!isValidCategoryName(categoryName)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid categoryName" })
        }

        const isRegisteredCategory = await FoodCategory.findOne({ where: { categoryName: categoryName, restaurantId: paramsRestaurantId } });

        if (isRegisteredCategory) {
            return res.status(422).send({ status: 1008, message: "This category is already registered, Please enter a new one" })
        }

        if (!isValid(isActive)) {
            return res.status(422).send({ status: 1002, message: "isActive is required" })
        }

        if (!isActiveCategory(isActive)) {
            return res.status(422).send({ status: 1003, message: "Please provide a category isActive like True or false etc" })
        }

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Update-A-FoodCategory==========================================================//

const updateFoodCategory = async function (req, res, next) {
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

        const enteredId = req.params.categoryId

        let checkFoodCategoryId = enteredId.split('').length

        if (checkFoodCategoryId != 36) {
            return res.status(422).send({ status: 1003, message: "FoodCategory-Id is not valid" })
        }

        let foodCategoryId = enteredId

        const enteredFoodCategoryId = await FoodCategory.findOne({ where: { id: foodCategoryId } })

        if (!enteredFoodCategoryId) {
            return res.status(422).send({ status: 1006, message: "Provided FoodCategory-ID does not exists" })
        }

        const data = req.body

        const { categoryName, isActive } = req.body

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if ("categoryName" in data) {

            if (!isValid(categoryName)) {
                return res.status(422).send({ status: 1002, message: "categoryName is required" })
            }

            if (!isValidCategoryName(categoryName)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid categoryName" })
            }

            const isRegisteredCategory = await FoodCategory.findOne({ where: { categoryName: categoryName, restaurantId: paramsRestaurantId } });

            if (isRegisteredCategory) {
                return res.status(422).send({ status: 1008, message: "This category is already registered, Please enter a new one to update" })
            }

            dataObject['categoryName'] = categoryName
        }

        if ("isActive" in data) {

            if (!isValid(isActive)) {
                return res.status(422).send({ status: 1002, message: "isActive is required" })
            }

            if (!isActiveCategory(isActive)) {
                return res.status(422).send({ status: 1003, message: "Please provide a category isActive like True or false etc" })
            }

            dataObject['isActive'] = isActive
        }


        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Get-All-Foodcategory==========================================================//

const getFoodCategory = async function (req, res, next) {
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

        const { categoryName, isActive } = data

        if ("categoryName" in data) {

            if (!isValid(categoryName)) {
                return res.status(422).send({ status: 1002, message: "categoryName is required" })
            }

            if (!isValidCategoryName(categoryName)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid categoryName" })
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

//========================================Delete-A-FoodCategory==========================================================//

const deleteFoodCategory = async function (req, res, next) {
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

        const enteredId = req.params.categoryId

        let checkFoodCategoryId = enteredId.split('').length

        if (checkFoodCategoryId != 36) {
            return res.status(422).send({ status: 1003, message: "FoodCategory-Id is not valid" })
        }

        let foodCategoryId = enteredId

        const enteredFoodCategoryId = await FoodCategory.findOne({ where: { id: foodCategoryId, restaurantId: paramsRestaurantId } })

        if (!enteredFoodCategoryId) {
            return res.status(422).send({ status: 1006, message: "Provided FoodCategory-ID does not exists" })
        }

        next()
    }
    catch (err) {
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};

module.exports = {
    createFoodCategory,
    updateFoodCategory,
    getFoodCategory,
    deleteFoodCategory
}







