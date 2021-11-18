const mongoose = require('../db/conn')
const { Schema } = mongoose

const paymentMethod = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    cardId: {
        type: String,
        required: true,
    }

}, {timestamps: true}, )

module.exports = mongoose.model('PaymentMethod', paymentMethod)