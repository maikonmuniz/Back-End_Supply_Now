const mongoose = require('mongoose')
require('dotenv').config()
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
let db = 'mongodb://localhost:27017/supply_now'

if(process.env.NODE_ENV == "production"){
    db = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.rn0e1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
}

async function main() {
    await mongoose.connect(db)
    console.log("Conectou ao mongoose!")
}

main().catch((err) => console.log(err))

module.exports = mongoose