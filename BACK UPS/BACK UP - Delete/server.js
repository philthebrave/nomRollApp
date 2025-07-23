// Check if running in production environment or not
// If running in production environment, pull from .env file
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

// Import express, express-ejs-layouts, and router from index.js
const bodyParser = require("body-parser")
const indexRouter = require("./routes/index")
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const methodOverride = require("method-override")

// Instantiate express
const app = express()

// Set view engine, views path and layout path
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")
app.use(methodOverride("_method"))

// Tell the app what to use
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}))
app.use(expressLayouts)
app.use(express.static("public"))
app.use("/", indexRouter)
app.use(express.json())

// Import mongoose (makes it easy for app to interact with mongodb)
const mongoose = require("mongoose")
// Create connection to mongodb (allows both local and web-based servers)
mongoose.connect(process.env.DATABASE_URL, {})
// Access connection and provide error message and connection message
const db = mongoose.connection
db.on("error", error => console.error(error))
db.once("open", () => console.log("Connected to Mongoose"))

// Tell the app where to listen
app.listen(process.env.PORT || 3000)