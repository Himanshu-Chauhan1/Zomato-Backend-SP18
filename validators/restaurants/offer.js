const db = require("../../models")
const { Offer, Restaurant, FoodCategory } = db
const isValidBirthDate = require("is-valid-birthdate")


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

//////////////// -FOR CATEGORY-AVILABLE- ///////////////////////
const isActiveItem = (isActive) => {
    return /^(true|false|True|False)$/.test(isActive);
};

//////////////// -FOR CATEGORY-AVAILABLE- ///////////////////////
const isValidDateFormat = (dateCreated) => {
    return /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/.test(dateCreated);
};

//========================================Create-A-Offer==========================================================//

const createOffer = async function (req, res, next) {
    try {
        const data = req.body

        const { restaurantId, categoryName, offerName, dateActiveFrom, dateActiveTo, isActive } = req.body

        if (!isValidRequestBody(data)) {
            return res.status(422).send({ status: 1002, message: "Please Provide Details" })
        }

        if (!isValid(restaurantId)) {
            return res.status(422).send({ status: 1002, message: "restaurantId is required" })
        }

        const isRegisteredRestaurant = await Restaurant.findOne({ where: { id: restaurantId } });

        if (!isRegisteredRestaurant) {
            return res.status(422).send({ status: 1008, message: "This restaurantId is not registered, Please enter a registered one" })
        }

        if (!isValid(categoryName)) {
            return res.status(422).send({ status: 1002, message: "categoryId is required" })
        }

        const isRegisteredCategory = await FoodCategory.findOne({ where: { categoryName: categoryName } });

        if (!isRegisteredCategory) {
            return res.status(422).send({ status: 1008, message: "This category is not registered, Please enter a registered category" })
        }

        if (!isValid(offerName)) {
            return res.status(422).send({ status: 1002, message: "offerName is required" })
        }

        const isRegisteredOfferName = await Offer.findOne({ where: { offerName: offerName } });

        if (isRegisteredOfferName) {
            return res.status(422).send({ status: 1008, message: "This offerName is already registered, Please enter a new one" })
        }

        if (!isValid(dateActiveFrom)) {
            return res.status(422).send({ status: 1002, message: "dateActiveFrom is required" })
        }

        if (!isValidDateFormat(dateActiveFrom)) {
            return res.status(422).send({ status: 1002, message: "dateActiveFrom can only be in a format like mm/dd/yyyy or mm-dd-yyyy or mm.dd.yyyy format" })
        }

        function isPastDate(idate) {
            var today = new Date().getTime(),
                idate = idate.split("/");

            idate = new Date(idate[2], idate[1] - 1, idate[0]).getTime();
            return (today - idate) > 0;
        }

        if (!isPastDate(dateActiveFrom)) {
            return res.status(422).send({ status: 1002, message: "dateActiveFrom cannot be greater than today you must provide either current date or date from the past" })
        }

        if (!isValid(dateActiveTo)) {
            return res.status(422).send({ status: 1002, message: "dateActiveTo is required" })
        }

        function isFutureDate(idate) {
            var today = new Date().getTime(),
                idate = idate.split("/");

            idate = new Date(idate[2], idate[1] - 1, idate[0]).getTime();
            return (today - idate) < 0;
        }

        if (!isValidDateFormat(dateActiveTo)) {
            return res.status(422).send({ status: 1002, message: "dateActiveTo can only be in a format like mm/dd/yyyy or mm-dd-yyyy or mm.dd.yyyy format" })
        }

        if (!isFutureDate(dateActiveTo)) {
            return res.status(422).send({ status: 1002, message: "dateActiveTo cannot be less than today you must provide either current date or date from the future" })
        }

        if (!isValid(isActive)) {
            return res.status(422).send({ status: 1002, message: "isActive is required" })
        }

        if (!isActiveItem(isActive)) {
            return res.status(422).send({ status: 1003, message: "Please provide a offer isActive like True or false etc" })
        }

        next()

    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Update-A-Offer==========================================================//

const updateOffer = async function (req, res, next) {
    try {

        const enteredId = req.params.id;

        let checkOfferId = enteredId.split('').length

        if (checkOfferId != 36) {
            return res.status(422).send({ status: 1003, message: "Offer-Id is not valid" })
        }

        let offerId = enteredId

        const enteredOfferId = await Offer.findOne({ where: { id: offerId } })

        if (!enteredOfferId) {
            return res.status(422).send({ status: 1006, message: "Provided Offer-ID does not exists" })
        }

        const data = req.body

        const { restaurantId, categoryName, offerName, dateActiveFrom, dateActiveTo, isActive } = req.body

        const dataObject = {};

        if (!Object.keys(data).length && typeof files === 'undefined') {
            return res.status(422).send({ status: 1002, msg: " Please provide some data to update" })
        }

        if ("restaurantId" in data) {

            if (!isValid(restaurantId)) {
                return res.status(422).send({ status: 1002, message: "restaurantId is required" })
            }

            const isRegisteredRestaurant = await Restaurant.findOne({ where: { id: restaurantId } });

            if (!isRegisteredRestaurant) {
                return res.status(422).send({ status: 1008, message: "This restaurantId is not registered, Please enter a registered one" })
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

        if ("offerName" in data) {

            if (!isValid(offerName)) {
                return res.status(422).send({ status: 1002, message: "offerName is required" })
            }

            const isRegisteredOfferName = await Offer.findOne({ where: { offerName: offerName } });

            if (isRegisteredOfferName) {
                return res.status(422).send({ status: 1008, message: "This offerName is already registered, Please enter a new one" })
            }

            dataObject['offerName'] = offerName
        }

        if ("dateActiveFrom" in data) {

            if (!isValid(dateActiveFrom)) {
                return res.status(422).send({ status: 1002, message: "dateActiveFrom is required" })
            }

            if (!isValidDateFormat(dateActiveFrom)) {
                return res.status(422).send({ status: 1002, message: "dateActiveFrom can only be in a format like mm/dd/yyyy or mm-dd-yyyy or mm.dd.yyyy format" })
            }

            function isPastDate(idate) {
                var today = new Date().getTime(),
                    idate = idate.split("/");

                idate = new Date(idate[2], idate[1] - 1, idate[0]).getTime();
                return (today - idate) > 0;
            }

            if (!isPastDate(dateActiveFrom)) {
                return res.status(422).send({ status: 1002, message: "dateActiveFrom cannot be greater than today you must provide either current date or date from the past" })
            }

            dataObject['dateActiveFrom'] = dateActiveFrom
        }

        if ("dateActiveTo" in data) {

            function isFutureDate(idate) {
                var today = new Date().getTime(),
                    idate = idate.split("/");

                idate = new Date(idate[2], idate[1] - 1, idate[0]).getTime();
                return (today - idate) < 0;
            }

            if (!isValidDateFormat(dateActiveTo)) {
                return res.status(422).send({ status: 1002, message: "dateActiveTo can only be in a format like mm/dd/yyyy or mm-dd-yyyy or mm.dd.yyyy format" })
            }

            if (!isFutureDate(dateActiveTo)) {
                return res.status(422).send({ status: 1002, message: "dateActiveTo cannot be less than today you must provide either current date or date from the future" })
            }

            dataObject['dateActiveTo'] = dateActiveTo
        }

        if ("isActive" in data) {

            if (!isValid(isActive)) {
                return res.status(422).send({ status: 1002, message: "isActive is required" })
            }

            if (!isActiveItem(isActive)) {
                return res.status(422).send({ status: 1003, message: "Please provide a offer isActive like True or false etc" })
            }

            dataObject['isActive'] = isActive
        }

        next()


    } catch (error) {
        console.log(error.message);
        return res.status(422).send({ status: 1001, msg: "Something went wrong Please check back again" })
    }
}

//========================================Delete-A-Offer==========================================================//

const deleteOffer = async function (req, res, next) {
    try {

        const enteredId = req.params.id;

        let checkOfferId = enteredId.split('').length

        if (checkOfferId != 36) {
            return res.status(422).send({ status: 1003, message: "Offer-Id is not valid" })
        }

        let offerId = enteredId

        const enteredOfferId = await Offer.findOne({ where: { id: offerId } })

        if (!enteredOfferId) {
            return res.status(422).send({ status: 1006, message: "Provided Offer-ID does not exists" })
        }

        next()
    }
    catch (err) {
        return res.status(422).send({ status: 1001, message: "Something went wrong Please check back again" })
    }
};



module.exports = {
    createOffer,
    updateOffer,
    deleteOffer
}






