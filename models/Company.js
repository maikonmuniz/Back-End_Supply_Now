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


        phone: {
            type: String,
            required: true
        },

        location: object,
        recipient_id: String,

    }, {timestamps: true},
    
    ),

)

module.exports = Company
