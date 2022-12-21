const adminRouter = require("../routes/admin/admin");
const customerRouter = require("../routes/customers/customer");
const customerSupportRouter = require("../routes/customerSupport/customerSupport");
const deliveryPartnerRouter = require("../routes/deliveryPartners/deliveryPartner");
const restaurantRouter = require("../routes/restaurants/restaurant");
const menuRouter=require("../routes/restaurants/menu")
const foodItemRouter=require("../routes/restaurants/foodItem")
const foodCategoryRouter=require("../routes/restaurants/foodcategory")
const cartRouter=require("../routes/customers/cart")
const offerRouter = require("../routes/restaurants/offer")
const adminOrderStatusRouter = require("../routes/admin/orderStatus")
const customerOrderStatus=require("../routes/customerSupport/orderStatus")
const restaurantOrderStatus=require("../routes/restaurants/orderStatus")
const customerSupportOrderStatus=require("../routes/customerSupport/orderStatus")
const deliveryPartnerOrderStatus=require("../routes/deliveryPartners/orderStatus")


module.exports = {
    adminRouter,
    customerRouter,
    customerSupportRouter,
    deliveryPartnerRouter,
    restaurantRouter,
    menuRouter,
    foodItemRouter,
    foodCategoryRouter,
    cartRouter,
    offerRouter,
    adminOrderStatusRouter,
    customerOrderStatus,
    restaurantOrderStatus,
    customerSupportOrderStatus,
    deliveryPartnerOrderStatus
}
