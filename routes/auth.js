// Import express
const express = require("express")
// Instantiate router
const router = express.Router()
// Import user schema
const Person = require("../models/user")

// Create GET route to render auth page.
// In this case, assigning a path of "/" actually gives a path of "/auth/", as the root by default is "/auth".
// This is specified in the server.js file.
router.get("/", async (req, res) => {
    try {
        res.render("auth")
        localStorage.removeItem('loggedUser')
        console.log("localStorage cleared.")
    } catch {
        res.redirect("/")
    }
})

// Export route (make it accessible to other files)
module.exports = router;