const express = require("express")
require('dotenv').config()
const { adminRouter, customerRouter, customerSupportRouter, deliveryPartnerRouter, restaurantRouter, menuRouter, foodItemRouter, foodCategoryRouter, cartRouter, offerRouter, adminOrderStatusRouter, customerOrderStatus, restaurantOrderStatus, customerSupportOrderStatus, deliveryPartnerOrderStatus, adminQueryRouter, customerQueryRouter, customerSupportQueryRouter, deliveryPartnerQueryRouter, restaurantQueryRouter } = require('./routes/index')
const app = express()
const multer = require('multer')


app.use(express.json())
app.use(multer().any())
const port = process.env.PORT

//Load Routes
app.use("/", adminRouter, customerRouter, customerSupportRouter, deliveryPartnerRouter, restaurantRouter, menuRouter, foodItemRouter, foodCategoryRouter, cartRouter, offerRouter, adminOrderStatusRouter, customerOrderStatus, restaurantOrderStatus, customerSupportOrderStatus, deliveryPartnerOrderStatus, adminQueryRouter, customerQueryRouter, customerSupportQueryRouter, deliveryPartnerQueryRouter, restaurantQueryRouter)

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})