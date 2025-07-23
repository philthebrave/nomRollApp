// Import express
const express = require("express")
// Instantiate router
const router = express.Router()
// Import person schema
const Person = require("../models/person")

// The URLs/paths that follow router.get are the paths that the functions below will listen for.
// The URLs/paths are populated in the address bar on button clicks (see "views" ejs files) or when manually typed.
// Therefore, when the address bar URL changes and a get function is listening for that new URL, it activates.

// Create GET route to render index page AND show names on page.
router.get("/", async (req, res) => {
    if (localStorage.getItem('loggedUser')) {
        try {
            const people = await Person.find({ user: localStorage.getItem('loggedUser') })
            res.render("index", { people: people })
        } catch {
            res.redirect("/")
        }
    } else {
        res.render("auth")
    }
})

 // Create CREATE route to add name to DB.
router.post("/", async (req, res) => {
    const person = new Person({
        name: req.body.name,
        user: localStorage.getItem('loggedUser')
    })
    const people = await Person.find({ user: localStorage.getItem('loggedUser') })
    if (people.length < 8) {
        const newPerson = await person.save()
        res.redirect("/")
  } else if (people.length === 8) {
        res.render("max")
  } else {
        res.send("Error adding person.")
  }
})

// Create EDIT route.
router.get("/:id/edit", async (req, res) => {
    try {
        const person = await Person.findById(req.params.id)
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
        res.render("editsuccess", { person: person })
    } catch {
        res.send("Error updating name.")
    }
})

// Create DELETE route.
router.delete("/:id", async (req, res) => {
    let person
    try {
        person = await Person.findById(req.params.id)
        // Assign the text that is in the input field to person.name (NOTE - body, not params).
        await person.deleteOne()
        res.render("deletesuccess", { person: person })
    } catch {
        res.send("Error deleting name.")
    }
})

// Export route (make it accessible to other files)
module.exports = router;