// Import mongoose (makes it easy for app to interact with mongodb)
const mongoose = require("mongoose")

// Create non-SQL schema (same as table in SQL database)
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema);