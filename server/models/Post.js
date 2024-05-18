const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const PostSchema = new Schema( {
    title: {
        type: String,
        required: true
    },
    exercise1: {
        type: String,
        required: false
    },
    exercise2: {
        type: String,
        required: false
    },
    exercise3: {
        type: String,
        required: false
    },
    exercise4: {
        type: String,
        required: false
    },
    exercise5: {
        type: String,
        required: false
    },
    exercise6: {
        type: String,
        required: false
    },
    exercise7: {
        type: String,
        required: false
    },
    exercise8: {
        type: String,
        required: false
    },
    exercise9: {
        type: String,
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', PostSchema)