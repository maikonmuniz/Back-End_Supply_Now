const mongoose = require('../db/conn')
const { Schema } = mongoose

const Car = mongoose.model(
    'Car',
    new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    placa: {
        type: String,
        required: true,
    },

    marca: {
        type: String,
        required: true,
    },

    modelo: {
        type: String,
        required: true,
    },

    cor: {
        type: String,
        required: true,
    },
},

{timestamps: true},

),

)

module.exports = Car