// This file is the "brains" of the application.
// Here where we include the dependencies and the middleware, and where we create the server.

// Imports
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const mongoose = require("mongoose");

// Static files
app.use(express.static("public"));

// Templating engine
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layouts/main");

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Flash messages (they are stored in the session, so require session middleware)
app.use(cookieParser("CookingBlogSecure"));
app.use(
  session({
    secret: "CookingBlogSecretSession",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());

// Environmental variables
require("dotenv").config();
let dbString = process.env.DB_STRING;

// Import routes
const routes = require("./server/routes/recipeRoutes.js");
app.use("/", routes);

// Initialize server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
