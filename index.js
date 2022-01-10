const cors = require("cors")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()



// config json response
app.use(express.json())

app.use(bodyParser.json())

// config cors
app.use(cors({ credentials: true, origin: "http://localhost:3000"}))

// confid folder for images
app.use(express.static('public'))


//Routes

const productRoutes = require('./routes/productRoutes')
app.use('/products', productRoutes)

const userRoutes = require('./routes/userRoutes')
app.use('/users', userRoutes)

const companyRoutes = require('./routes/companyRoutes')
app.use('/company', companyRoutes)

app.listen(process.env.PORT || 5000)
