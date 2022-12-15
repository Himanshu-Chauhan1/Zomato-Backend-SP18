const db = require("../../models")
const { FoodItem } = db


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

//////////////// -FOR FULLNAME- ///////////////////////
const isValidFullName = (fullName) => {
    return /^[a-zA-Z ]+$/.test(fullName);
};

//////////////// -FOR RESTAURANTNAME- ///////////////////////
const isValidRestaurantName = (name) => {
    return /^[A-Za-z\s.\(\)0-9]{3,}$/.test(name);
};

//========================================Create-A-FoodItem==========================================================//

const createFoodItem = async function (req, res, next) {
    try {
        const data = req.body

        const { name, email, phone, landline, ownerFullName, ownerEmail, confirmPassword, password } = req.body

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(name)) {
            return res.status(422).send({ status: 1002, message: "restaurantName is required" })
        }

        if (!isValidRestaurantName(name)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid restaurantName" })
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

        const enteredId = req.params.id;

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

        const { name, email, phone, landline, ownerFullName, ownerEmail, oldPassword, newPassword } = req.body

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if ("name" in data) {

            if (!isValid(name)) {
                return res.status(422).send({ status: 1002, message: "restaurantName is required" })
            }

            if (!isValidRestaurantName(name)) {
                return res.status(422).send({ status: 1003, message: "Please provide a valid restaurantName" })
            }

            dataObject['email'] = email
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

        const enteredId = req.params.id;

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
//========================================Upload-A-ItemImage==========================================================//

const uploadItemImage = async function (req, res, next) {
    try {

        // const data = req.body

        // const { itemImage } = data

        // if (!isValidRequestBody(data)) {
        //     return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        // }

        // if (!isValid(itemImage)) {
        //     return res.status(422).send({ status: 1002, message: "itemImage is required" })
        // }

        next()
    }
    catch (err) {
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};


module.exports = {
    createFoodItem,
    updateFoodItem,
    deleteFoodItem,
    uploadItemImage
}







