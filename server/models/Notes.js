const mongoose = require('mongoose');

const NotesSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    teg: {
        type: String,
        defautl: "General"
    },
    Date: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose.model('notes', NotesSchema);