// Import mongoose (makes it easy for app to interact with mongodb)
const mongoose = require("mongoose")

// Create non-SQL schema (same as table in SQL database) NOT ALL VALUES REQUIRED!!!
const staglistSchema = new mongoose.Schema({
    person1: {
        type: String,
    },
    person2: {
        type: String,
    },
    person3: {
        type: String,
    },
    person4: {
        type: String,
    },
    person5: {
        type: String,
    },
    person6: {
        type: String,
    },
    person7: {
        type: String,
    },
    person8: {
        type: String,
    },
    user: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Staglist', staglistSchema);