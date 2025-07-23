// Import express
const express = require("express")
// Instantiate router
const router = express.Router()
// Import user schema
const User = require("../models/user")

// Create GET route to render login page.
// In this case, assigning a path of "/" actually gives a path of "/login/", as the root by default is "/login".
// This is specified in the server.js file.
router.get("/", async (req, res) => {
        try {
        res.render("auth/login")
    } catch {
        res.redirect("/auth")
    }
})    

router.post("/", async (req, res) => {
        const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    const usercheck = await User.findOne({"email" : req.body.email})
    console.log("usercheck:")
    console.log(usercheck)

    try {
        if (usercheck != null) {
            if (usercheck.password === req.body.password) {

            localStorage.setItem('loggedUser', user.email)
            console.log("The current logged in user is:")
            console.log(localStorage.getItem('loggedUser'))

            res.redirect("/")
            } else {
                res.send("Incorrect user password. Please go back and try again.")
            }
        } else {
            res.send("User email not recognised. Please go back and try again.")
        }

    } catch (err) {
        res.send("Error logging in user.")
    }
})

// Export route (make it accessible to other files)
module.exports = router;