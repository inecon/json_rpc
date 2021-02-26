const {Schema, model} = require('mongoose')

const carSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    model : {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
})

module.exports = model('Car', carSchema)