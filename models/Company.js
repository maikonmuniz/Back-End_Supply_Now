const mongoose = require('../db/conn')
const { Schema } = mongoose

const Company = mongoose.model(
    'Company',
    new Schema({

        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        cnpj: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true
        },


    }, {timestamps: true},
    
    ),

)

module.exports = Company
