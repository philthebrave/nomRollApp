// Import mongoose (makes it easy for app to interact with mongodb)
const mongoose = require("mongoose")

// Create non-SQL schema (same as table in SQL database)
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Person', personSchema);