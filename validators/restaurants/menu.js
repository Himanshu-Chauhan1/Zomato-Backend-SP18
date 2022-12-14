const db = require("../../models")
const { Restaurant } = db


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

//========================================Create-A-Restaurant==========================================================//

const createMenu = async function (req, res, next) {
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

//========================================Update-A-Restaurant==========================================================//

const updateMenu = async function (req, res, next) {
    try {


        const enteredId = req.params.id;

        let checkMenuId = enteredId.split('').length

        if (checkMenuId != 36) {
            return res.status(422).send({ status: 1003, message: "Menu-Id is not valid" })
        }

        let menuId = enteredId

        const enteredMenuId = await Restaurant.findOne({ where: { id: menuId } })

        if (!enteredMenuId) {
            return res.status(422).send({ status: 1006, message: "Provided Menu-ID does not exists" })
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

//========================================Delete-A-Restaurant==========================================================//

const deleteMenu = async function (req, res, next) {
    try {


        const enteredId = req.params.id;

        let checkMenuId = enteredId.split('').length

        if (checkMenuId != 36) {
            return res.status(422).send({ status: 1003, message: "Menu-Id is not valid" })
        }

        let menuId = enteredId

        const enteredMenuId = await Restaurant.findOne({ where: { id: menuId } })

        if (!enteredMenuId) {
            return res.status(422).send({ status: 1006, message: "Provided Menu-ID does not exists" })
        }

        next()
    }
    catch (err) {

        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};


module.exports = {
    createMenu,
    updateMenu,
    deleteMenu
}







