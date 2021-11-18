const mongoose = require('../db/conn')
const { Schema } = mongoose

const User = new Schema({

        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        cpf: {
            type: String,
            required: true
        },

        tipo: {
            type: String,
            enum: ['M', 'P'],
            required: true,
        },

        // campo - implementação de api para pagamento 

        // recipientId:{
        //     type: String,
        //     required: function(){
        //         return this.tipo === 'M';
        //     }
        // },

        password: {
            type: String,
            required: true
        },

        image: {
            type: String
        },

        phone: {
            type: String,
            required: true
        },

        location: {
            type: {type: String},
            coordinates: [],
        },
        
        socketId: String

    },

    {timestamps: true},

    )


User.index({ location: '2dsphere' });

module.exports = mongoose.model('User', User)
