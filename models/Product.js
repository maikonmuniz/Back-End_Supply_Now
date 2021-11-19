const mongoose = require('../db/conn')
const { Schema } = mongoose

const Product = mongoose.model(
    'Product',
    new Schema({

        companyId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
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

        images: {
            type: Array
            
        },



    }, {timestamps: true},
    
    ),

)


module.exports = Product