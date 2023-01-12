const adminRouter = require("../routes/admin/admin");
const customerRouter = require("../routes/customers/customer");
const customerSupportRouter = require("../routes/customerSupport/customerSupport");
const deliveryPartnerRouter = require("../routes/deliveryPartners/deliveryPartner");
const restaurantRouter = require("../routes/restaurants/restaurant");
const foodItemRouter = require("../routes/restaurants/foodItem")
const foodCategoryRouter = require("../routes/restaurants/foodcategory")
const cartRouter = require("../routes/customers/cart")
const offerRouter = require("../routes/restaurants/offer")
const adminQueryRouter = require("../routes/admin/query")
const customerQueryRouter = require("../routes/customers/query")
const customerSupportQueryRouter = require("../routes/customerSupport/query")
const deliveryPartnerQueryRouter = require("../routes/deliveryPartners/query")
const restaurantQueryRouter = require("../routes/restaurants/query")
const adminOrderRouter = require("../routes/admin/order")
const customerOrderRouter = require("../routes/customers/order")
const customerSupportOrderRouter = require("../routes/customerSupport/order")
const deliveryPartnerOrderRouter = require("../routes/deliveryPartners/order")
const restaurantOrderRouter = require("../routes/restaurants/order")
const adminAddressRouter = require("../routes/admin/address")
const customerAddressRouter = require("../routes/customers/address")
const customerSupportAddressRouter = require("../routes/customerSupport/address")
const deliveryPartnerAddressRouter = require("../routes/deliveryPartners/address")
const restaurantAddressRouter = require("../routes/restaurants/address")
const restaurantMenuRouter = require("../routes/restaurants/menu")
const customerMenuRouter = require("../routes/customers/menu")
const superAdminRouter=require("../routes/superAdmin/superAdmin")


module.exports = {
    adminRouter,
    customerRouter,
    customerSupportRouter,
    deliveryPartnerRouter,
    restaurantRouter,
    foodItemRouter,
    foodCategoryRouter,
    cartRouter,
    offerRouter,
    adminQueryRouter,
    customerQueryRouter,
    customerSupportQueryRouter,
    deliveryPartnerQueryRouter,
    restaurantQueryRouter,
    adminOrderRouter,
    customerOrderRouter,
    customerSupportOrderRouter,
    deliveryPartnerOrderRouter,
    restaurantOrderRouter,
    adminAddressRouter,
    customerAddressRouter,
    customerSupportAddressRouter,
    deliveryPartnerAddressRouter,
    restaurantAddressRouter,
    restaurantMenuRouter,
    customerMenuRouter,
    superAdminRouter
}
