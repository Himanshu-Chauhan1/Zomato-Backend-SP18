const db = require("../../models")
const isValidDate = require("is-valid-birthdate")
const validUrl = require('valid-url')
const { FoodItem, FoodCategory } = db


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

//////////////// -FOR ITEMDESCRIPTION- ///////////////////////
const isValidItemDescription = (itemDescription) => {
    return /^[A-Za-z\s.\(\)0-9]{3,}$/.test(itemDescription);
};

//////////////// -FOR ITEMPRICE- ///////////////////////
const isValidItemPrice = (itemPrice) => {
    return /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/.test(itemPrice);
};

//////////////// -FOR CATEGORYAVILABLE- ///////////////////////
const isActiveItem = (isActive) => {
    return /^(true|false|True|False)$/.test(isActive);
};

//========================================Create-A-FoodItem==========================================================//

const createFoodItem = async function (req, res, next) {
    try {
        const data = req.body

        const { categoryName, itemName, itemDescription, itemPrice, itemImage, dateCreated, isActive } = req.body

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(categoryName)) {
            return res.status(422).send({ status: 1002, message: "categoryId is required" })
        }

        const isRegisteredCategory = await FoodCategory.findOne({ where: { categoryName: categoryName } });

        if (!isRegisteredCategory) {
            return res.status(422).send({ status: 1008, message: "This category is not registered, Please enter a registered category" })
        }

        if (!isValid(itemName)) {
            return res.status(422).send({ status: 1002, message: "itemName is required" })
        }

        const isRegisteredItemName = await FoodItem.findOne({ where: { itemName: itemName } });

        if (isRegisteredItemName) {
            return res.status(422).send({ status: 1008, message: "This itemName is already registered, Please enter a new one" })
        }

        if (!isValid(itemDescription)) {
            return res.status(422).send({ status: 1002, message: "itemName is required" })
        }

        if (!isValidItemDescription(itemDescription)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid itemDescription" })
        }

        if (!isValid(itemPrice)) {
            return res.status(422).send({ status: 1002, message: "itemPrice is required" })
        }

        if (!isValidItemPrice(itemPrice)) {
            return res.status(422).send({ status: 1003, message: "Please provide a valid itemPrice" })
        }

        if (!isValid(itemImage)) {
            return res.status(422).send({ status: 1002, message: "itemImage is required" })
        }

        if (!(validUrl.isWebUri(data.itemImage.trim()))) return res.status(400).send({ status: 1003, message: "Please Provide a valid itemImage Url" })

        if (!isValid(dateCreated)) {
            return res.status(422).send({ status: 1002, message: "Date Created is Required" })
        }

        if (!isValidDate(dateCreated)) {
            return res.status(422).send({ status: 1003, message: "Please enter date created from the today onwards or date from the future" })
        }

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
        // let data = req.query

        // let { itemImage } = data

        // if (Object.keys(data).length !== 0) {
        //     return res.status(422).send({ status: 1002, message: "Please provide image name and file to upload" })
        // }

        // if (!isValid(itemImage)) {
        //     return res.status(422).send({ status: 1002, message: "restaurantName is required" })
        // }

        next()
    }
    catch (err) {
        console.log(err.message);
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};


module.exports = {
    createFoodItem,
    updateFoodItem,
    deleteFoodItem,
    uploadItemImage
}







