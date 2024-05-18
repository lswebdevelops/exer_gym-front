const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const UserSchema = new Schema( {
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true       
    },
    currentExerciseIndex: {
        type: Number,
        default: 0
    }
    
   
})

module.exports = mongoose.model('User', UserSchema)