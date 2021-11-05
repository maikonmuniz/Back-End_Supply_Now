const cors = require("cors")
const express = require("express")
const app = express()


// config json response
app.use(express.json())

// config cors
app.use(cors({ credentials: true, origin: "http://localhost:3000"}))

// confid folder for images
app.use(express.static('public'))

//Routes

const userRoutes = require('./routes/userRoutes')

app.use('/users', userRoutes)


app.listen(5000)