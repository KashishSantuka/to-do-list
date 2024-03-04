const mongoose = require('mongoose')

const toDoSchema = new mongoose.Schema({
    text: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        default: false 
    } 
})

module.exports = mongoose.model('ToDo', toDoSchema)