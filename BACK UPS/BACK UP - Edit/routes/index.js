// Import express
const express = require("express")
// Instantiate router
const router = express.Router()
// Import person schema
const Person = require("../models/person")

// Create GET route to show names on index page.
router.get("/", async (req, res) => {
    try {
        const people = await Person.find({})
        console.log(people)
        res.render("index", { people: people })
    } catch {
        res.redirect("/")
    }
})

 // Create CREATE route to add name to DB.
router.post("/", async (req, res) => {
    const person = new Person({
        name: req.body.name
    })
    // ---------------------------------------
    try {
        const newPerson = await person.save()
        // res.send("Person added to database! Check MongoDB cluster.")
        res.redirect("/")
    } catch {
        res.send("Error adding person.")
    }
})   

// Create VIEW route to allow user to see info for one person.
router.get("/:id", async (req, res) => {
    try {
        const person = await Person.findById(req.params.id)
        res.send("View: The ID number for " + person.name + " is " + req.params.id)
    } catch {
        res.redirect("/")
    }
})

// Create EDIT route.
router.get("/:id/edit", async (req, res) => {
    try {
        const person = await Person.findById(req.params.id)
        // res.send("Edit " + person.name + " (ID number " + req.params.id + ").")
        res.render("edit", { person: person })
    } catch {
        res.redirect("/")
    }
})

// Create UPDATE route.
router.put("/:id", async (req, res) => {
    let person
    try {
        person = await Person.findById(req.params.id)
        // Assign the text that is in the input field to person.name (NOTE - body, not params).
        person.name = req.body.name
        await person.save()
        res.render("success", { person: person })
        // res.redirect("/")
        // res.send("Update " + person.name + " (ID number " + req.params.id + ").")
    } catch {
        res.send("Error updating name.")
    }
})

// Create DELETE route.
router.delete("/:id", async (req, res) => {
    try {
        const person = await Person.findById(req.params.id)
        res.send("Delete " + person.name + " (ID number " + req.params.id + ").")
    } catch {
        res.redirect("/")
    }
})

// Export route (make it accessible to other files)
module.exports = router;