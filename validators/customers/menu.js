const db = require("../../models")
const { Customer } = db


////////////////////////// -GLOBAL- //////////////////////
const isValid = function (value) {
    if (!value || typeof value != "string" || value.trim().length == 0)
        return false;
    return true;
};

//////////////// -FOR ITEMPRICE- ///////////////////////
const isValidItemPrice = (itemPrice) => {
    return /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/.test(itemPrice);
};

//////////////// -FOR CATEGORY-AVILABLE- ///////////////////////
const isActiveItem = (isActive) => {
    return /^(true|false|True|False)$/.test(isActive);
};

//========================================Get-Restaurant-Menu==========================================================//

const getMenu = async function (req, res, next) {
    try {

        // const enteredCustomerId = req.params.id

        // let checkCustomerId = enteredCustomerId.split('').length

        // if (checkCustomerId != 36) {
        //     return res.status(422).send({ status: 1003, message: "customer-Id is not valid" })
        // }

        // let paramsCustomerId = enteredCustomerId

        // const checkEnteredCustomerId = await Customer.findOne({ where: { id: paramsCustomerId } });

        // if (!checkEnteredCustomerId) {
        //     return res.status(422).send({ status: 1006, message: "customer-ID does not exists" })
        // }

        let data = req.query

        let { restaurantId,categoryName, itemName } = data


        if ("categoryName" in data) {

            if (!isValid(categoryName)) {
                return res.status(422).send({ status: 1002, message: "categoryId is required" })
            }

        }

        if ("itemName" in data) {

            if (!isValid(itemName)) {
                return res.status(422).send({ status: 1002, message: "itemName is required" })
            }

        }

        next()
    }
    catch (err) {
        console.log(err.message)
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};



module.exports = {
    getMenu
}







