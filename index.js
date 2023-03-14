require('dotenv').config()
const express = require("express")
const cors = require("cors");
const { adminRouter, customerRouter, customerSupportRouter, deliveryPartnerRouter, restaurantRouter, foodItemRouter, foodCategoryRouter, cartRouter, offerRouter, adminQueryRouter, customerQueryRouter, customerSupportQueryRouter, deliveryPartnerQueryRouter, restaurantQueryRouter, adminOrderRouter, customerOrderRouter, customerSupportOrderRouter, deliveryPartnerOrderRouter, restaurantOrderRouter, adminAddressRouter, customerAddressRouter, customerSupportAddressRouter, deliveryPartnerAddressRouter, restaurantAddressRouter, restaurantMenuRouter, customerMenuRouter, superAdminRouter, adminIssueRouter, customerIssueRouter, customerSupportIssueRouter, restaurantIssueRouter, restaurantLocationRouter, customerLocationRouter } = require('./routes/index')
const app = express()
const multer = require('multer')


app.use(express.json())
app.use(multer().any())

const corsOption = {
    origin: "*",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};

app.use(cors(corsOption));

const port = process.env.PORT


//Load Routes
app.use("/", adminRouter, customerRouter, customerSupportRouter, deliveryPartnerRouter, restaurantRouter, foodItemRouter, foodCategoryRouter, cartRouter, offerRouter, adminQueryRouter, customerQueryRouter, customerSupportQueryRouter, deliveryPartnerQueryRouter, restaurantQueryRouter, adminOrderRouter, customerOrderRouter, customerSupportOrderRouter, deliveryPartnerOrderRouter, restaurantOrderRouter, adminAddressRouter, customerAddressRouter, customerSupportAddressRouter, deliveryPartnerAddressRouter, restaurantAddressRouter, restaurantMenuRouter, customerMenuRouter, superAdminRouter, adminIssueRouter, customerIssueRouter, customerSupportIssueRouter, restaurantIssueRouter, restaurantLocationRouter, customerLocationRouter)


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})