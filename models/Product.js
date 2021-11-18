const mongoose = require('../db/conn')
const { Schema } = mongoose

const Product = mongoose.model(
    'Product',
    new Schema({

        companyId: {
            type: Schema.Type.objectId,
            ref: 'Company',
        },

        name: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        image: {
            type: String,
            required: true
        },



    }, {timestamps: true},
    
    ),

)


module.exports = Product