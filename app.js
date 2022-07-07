// This file is the "brains" of the application.
// Here where we include the dependencies and the middleware, and where we create the server.

// Imports
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const mongoose = require("mongoose");

// Static files
app.use(express.static("public"));

// Templating engine
/* app.set("layout", "./layouts/main"); appears to be indicating that the file "main.ejs" will be the template into which the data from the other ejs files will be rendered.  But I admit that I don't fully understand it. */
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layouts/main");

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
