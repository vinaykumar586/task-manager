const mongoose = require('mongoose')
const validator= require('validator');

const Tasks = mongoose.model('tasks',{
    description:{
        type: String,
        trim: true,
        required: true,

    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Tasks;