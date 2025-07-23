// Import express
const express = require("express")
// Instantiate router
const router = express.Router()
// Import user schema
const User = require("../models/user")

var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

// Create GET route to render signup page.
router.get("/", async (req, res) => {
    try {
        res.render("auth/signup")
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

    // -------------------------------------------
    // try  {
    //     const newUser = await user.save()
    //     localStorage.setItem('loggedUser', user.email)
    //     console.log("The current logged in user is:")
    //     console.log(localStorage.getItem('loggedUser'))

    //     res.redirect("/")
    // } catch {
    //     res.send("Error adding user.")
    // }
    // -------------------------------------------
    try {
        if (usercheck === null) {

            const newUser = await user.save()
            localStorage.setItem('loggedUser', user.email)
            console.log("The current logged in user is:")
            console.log(localStorage.getItem('loggedUser'))

            // res.redirect("/")
            res.render("signupsuccess")
        } else {
            res.send("This email already exists in the database.")
        }

    } catch {
        res.send("Error adding user.")
    }

    // console.log((db.users.findfind({ "email" : req.body.email })))
})   

// Export route (make it accessible to other files)
module.exports = router;