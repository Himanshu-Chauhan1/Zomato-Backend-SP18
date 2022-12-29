const express = require("express")
require('dotenv').config()
const { adminRouter, customerRouter, customerSupportRouter, deliveryPartnerRouter, restaurantRouter, menuRouter, foodItemRouter, foodCategoryRouter, cartRouter, offerRouter, adminOrderStatusRouter, customerOrderStatus, restaurantOrderStatus, customerSupportOrderStatus, deliveryPartnerOrderStatus, adminQueryRouter, customerQueryRouter, customerSupportQueryRouter, deliveryPartnerQueryRouter, restaurantQueryRouter, adminOrderRouter, customerOrderRouter, customerSupportOrderRouter, deliveryPartnerOrderRouter, restaurantOrderRouter, adminAddressRouter, customerAddressRouter, customerSupportAddressRouter, deliveryPartnerAddressRouter, restaurantAddressRouter } = require('./routes/index')
const app = express()
const multer = require('multer')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDocument = require('./swagger.json');

app.use(express.json())
app.use(multer().any())
const port = process.env.PORT

const options = {
    swaggerDefinition: {
        info: {
            version: "1.0.0",
            title: "Zomato API",
            description: "All APIs Information",
            contact: {
                name: "Spark Eighteen"
            },
            servers: ["http://localhost:3000"]
        }
    },
    // ['.routes/*.js']
    apis: ["./routes/*.js"]
};

const openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve)
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

//Load Routes
app.use("/", adminRouter, customerRouter, customerSupportRouter, deliveryPartnerRouter, restaurantRouter, menuRouter, foodItemRouter, foodCategoryRouter, cartRouter, offerRouter, adminOrderStatusRouter, customerOrderStatus, restaurantOrderStatus, customerSupportOrderStatus, deliveryPartnerOrderStatus, adminQueryRouter, customerQueryRouter, customerSupportQueryRouter, deliveryPartnerQueryRouter, restaurantQueryRouter, adminOrderRouter, customerOrderRouter, customerSupportOrderRouter, deliveryPartnerOrderRouter, restaurantOrderRouter, adminAddressRouter, customerAddressRouter, customerSupportAddressRouter, deliveryPartnerAddressRouter, restaurantAddressRouter)

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})