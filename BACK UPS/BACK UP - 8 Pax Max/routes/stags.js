// Import express
const express = require("express")
// Instantiate router
const router = express.Router()
// Import person schema
const Person = require("../models/person")
// Import staglist schema
const Staglist = require("../models/staglist")

// Create GO TO STAG LIST route.
router.get("/", async (req, res) => {
        try {
                const people = await Person.find({})
                const staglists = await Staglist.find({})
                res.render("stags/index", { people: people , staglists: staglists})
        } catch {
                res.send("Error rendering stag list.")
        }
})

// Create CREATE route. IF statement mitigates first instance creation issue.
router.post("/", async (req, res) => {
    const staglist = new Staglist({
        person1: req.body.person1,
        person2: req.body.person2,
        person3: req.body.person3,
        person4: req.body.person4,
        person5: req.body.person5,
        person6: req.body.person6,
        person7: req.body.person7,
        person8: req.body.person8
    })
    // ---------------------------------------
    try {
        const newStaglist = await staglist.save()
        // res.send("Person added to database! Check MongoDB cluster.")
        res.redirect("/stags")
    } catch {
        res.send("Error adding staglist.")
    }
})   

// Export route (make it accessible to other files)
module.exports = router;