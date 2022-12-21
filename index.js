const express = require("express")
require('dotenv').config()
const { adminRouter, customerRouter, customerSupportRouter, deliveryPartnerRouter, restaurantRouter, menuRouter, foodItemRouter, foodCategoryRouter, cartRouter, offerRouter, adminOrderStatusRouter, customerOrderStatus, restaurantOrderStatus, customerSupportOrderStatus, deliveryPartnerOrderStatus } = require('./routes/index')
const app = express()
const Sequelize = require('sequelize');
const multer = require('multer')
const Models = require('./models');


app.use(express.json())
app.use(multer().any())
const port = process.env.PORT
//Sync Database

// Models.Sequelize.sync({
//     force: false,
//     logging: console.log
// }).then(function () {
//     console.log('Nice! Database looks fine')

// }).catch(function (err) {
//     console.log(err, "Something went wrong with the Database Update!")
// });

//Load Routes
app.use("/", adminRouter, customerRouter, customerSupportRouter, deliveryPartnerRouter, restaurantRouter, menuRouter, foodItemRouter, foodCategoryRouter, cartRouter, offerRouter, adminOrderStatusRouter, customerOrderStatus, restaurantOrderStatus, customerSupportOrderStatus, deliveryPartnerOrderStatus)

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})