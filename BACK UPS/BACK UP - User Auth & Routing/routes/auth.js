// Import express
const express = require("express")
// Instantiate router
const router = express.Router()
// Import user schema
const Person = require("../models/user")

// Create GET route to render auth page.
router.get("/", async (req, res) => {
    try {
        res.render("auth")
    } catch {
        res.redirect("/")
    }
})

// Export route (make it accessible to other files)
module.exports = router;