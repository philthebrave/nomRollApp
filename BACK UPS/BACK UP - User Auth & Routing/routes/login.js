// Import express
const express = require("express")
// Instantiate router
const router = express.Router()
// Import user schema
const User = require("../models/user")

// Create GET route to render signup page.
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
        // console.log(err.message)
    }

    // console.log((db.users.findfind({ "email" : req.body.email })))
})

// Export route (make it accessible to other files)
module.exports = router;