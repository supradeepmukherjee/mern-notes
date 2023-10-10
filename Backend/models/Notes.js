const mongoose = require('mongoose')
const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
        default: 'general'
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})
module.exports = mongoose.model('notes', NotesSchema)