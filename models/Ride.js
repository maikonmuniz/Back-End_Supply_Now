const mongoose = require('../db/conn')
const { Schema } = mongoose

const Ride = mongoose.model(
    'Ride',
    new Schema({

        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        driverID: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        info: {
            type: Object,
            required: true,
        },

        status: {
            type: String,
            enum: ['A', 'C', 'F'],
            default: 'A'
        }


    }, {timestamps: true},
    
    ),

)


module.exports = Ride
