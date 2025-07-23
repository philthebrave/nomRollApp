// Import express
const express = require("express")
// Instantiate router
const router = express.Router()
// Import person schema
const Person = require("../models/person")

// Create INDEX & CREATE route - YOU CAN'T HAVE MULTIPLE GETS IN THE SAME FILE / SCRIPT!!!
router.get("/", async (req, res) => {
    try {
        const people = await Person.find({})
        console.log(people)
        res.render("index", { people: people })
    } catch {
        res.redirect("/")
    }
})

// // Create CREATE route LONGWINDED
// router.post("/", (req, res) => {
//     const person = new Person({
//         name: req.body.name
//     })
//     // ---------------------------------------
//     person.save().
//     then((newPerson)=>{
//         res.send("Person added to database! Check MongoDB cluster.")
//     }).
//     catch((err)=>{
//         
//         })
//     })

 // Create CREATE route REFINED
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

// Create VIEW route (probably won't use for this app).
router.get("/:id", async (req, res) => {
    try {
        const person = await Person.findById(req.params.id)
        res.send("View: The ID number for " + person.name + " is " + req.params.id)
    } catch {
        res.redirect("/")
    }
})

// Create EDIT route.
router.get("/:id/edit", (req, res) => {
    res.send("Edit name with ID: " + req.params.id)
})

// Create UPDATE route.
router.put("/:id", (req, res) => {
    res.send("Update name with ID: " + req.params.id)
})

// Create DELETE route.
router.delete("/:id", (req, res) => {
    res.send("Delete name with ID: " + req.params.id)
})

// Export route (make it accessible to other files)
module.exports = router;