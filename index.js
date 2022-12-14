const express = require("express")
require('dotenv').config()
const { adminRouter,customerRouter,customerSupportRouter,deliveryPartnerRouter,restaurantRouter,menuRouter} = require('./routes/index')
const app = express()


app.use(express.json())
const port = process.env.PORT

//Load Routes
app.use("/", adminRouter, customerRouter, customerSupportRouter, deliveryPartnerRouter, restaurantRouter, menuRouter)

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})