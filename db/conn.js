const mongoose = require('mongoose')
require('dotenv').config()
const DB_USER = process.env.DB_USER  
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)


async function main(){
    
    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.rn0e1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)

}

main().then(() => {
    console.log("Conectou")
}).catch((err) => console.log(err))

module.exports = mongoose   