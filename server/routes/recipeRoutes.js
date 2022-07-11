const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController.js");

/*
 *  App Routes
 */

// See what is happening here:  when a request comes onto a certain path, the server looks to the functions defined in the recipeController.js file to see what to do.

router.get("/", recipeController.homepage);
router.get("/categories", recipeController.exploreCategories);

module.exports = router;

// The router and all of its assigned properties are being exported and will be imported into the app.js file.  So, really, this is just a middleman.

// app.js ==looks to==> recipeRoutes.js ==looks to==> recipeController.js
// recipeController goes to the DB, gets the data, and directs the rendering of the .ejs files using the data and the .ejs templates
// then the rendered page is sent off to the client, whew!
