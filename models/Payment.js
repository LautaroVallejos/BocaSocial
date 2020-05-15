const {
    Schema,
    model
} = require('mongoose');

const logSchema = new Schema({
    owner: String,
    date: {
        type: Date,
        default: Date.now()
    },
    error: {
        type: String
    },
    context: String
})

module.exports = model('Logs', logSchema);
