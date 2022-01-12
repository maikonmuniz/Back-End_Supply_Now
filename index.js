const cors = require("cors")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()



// config json response
app.use(express.json())

app.use(bodyParser.json())

// config cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// confid folder for images
app.use(express.static('public'))

// app.use(timeout('15s'))
//Routes

const productRoutes = require('./routes/productRoutes')
app.use('/products', productRoutes)

const userRoutes = require('./routes/userRoutes')
app.use('/users', userRoutes)

const companyRoutes = require('./routes/companyRoutes')
app.use('/company', companyRoutes)

app.listen(process.env.PORT || 5000)
