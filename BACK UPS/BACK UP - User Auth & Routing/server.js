// THE ORDER IN WHICH YOU WRITE THESE LINES OF CODE MATTERS!!!
// IF NOT CAREFUL, IT'LL AFFECT RENDERING.

// Check if running in production environment or not
// If running in production environment, pull from .env file
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

// Import express, express-ejs-layouts, and router from index.js
const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const indexRouter = require("./routes/index")
const stagRouter = require("./routes/stags")
const authRouter = require("./routes/auth")
const signupRouter = require("./routes/signup")
const loginRouter = require("./routes/login")

// Instantiate express
const app = express()

// Set view engine, views path and layout path
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
app.set("layout", "layouts/layout")

// Tell the app what to use
app.use(methodOverride("_method"))
// Define the start point for STATIC files.
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))
app.use(express.json())
app.use(expressLayouts)

// Import mongoose (makes it easy for app to interact with mongodb)
const mongoose = require("mongoose")
// Create connection to mongodb (allows both local and web-based servers)
mongoose.connect(process.env.DATABASE_URL, {})
// Access connection and provide error message and connection message
const db = mongoose.connection
db.on("error", error => console.error(error))
// db.createCollection("staglists", { capped : true, size: 10000, max : 10 })
// db.createCollection("staglists")
db.once("open", () => console.log("Connected to Mongoose"))

// Tell the app which routers to use
app.use("/", indexRouter)
app.use("/auth", authRouter)
app.use("/signup", signupRouter)
app.use("/login", loginRouter)
app.use("/stags", stagRouter)

// Tell the app where to listen
app.listen(process.env.PORT || 3000)

