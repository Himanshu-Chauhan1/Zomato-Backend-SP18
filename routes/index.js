const adminRouter = require("../routes/admin/admin");
const customerRouter = require("../routes/customers/customer");
const customerSupportRouter = require("../routes/customerSupport/customerSupport");
const deliveryPartnerRouter = require("../routes/deliveryPartners/deliveryPartner");
const restaurantRouter = require("../routes/restaurants/restaurant");
const menuRouter=require("../routes/restaurants/menu")


module.exports = {
    adminRouter,
    customerRouter,
    customerSupportRouter,
    deliveryPartnerRouter,
    restaurantRouter,
    menuRouter
}
