require("../models/database");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

/**
 *  GET
 *  Homepage
 * */

// This function tells the server what to do when it receives a GET request at "/" (see ./routes/recipeRoutes.js)

exports.homepage = async (req, res) => {
  try {
    //Step 1: get the categories from the server.
    const limitNumber = 5;
    const categories = await Category.find().limit(limitNumber);
    const recipes = await Recipe.find().limit(limitNumber);
    res.render("index", { title: "Cooking Blog: Home", categories, recipes });
    //The above indicates that the homepage is created by rendering the data in the "index" file in the main.ejs file.  I've also specified a page title.   If you look at ./views/layouts/main.js you'll see where it wil be inserted)
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
    // This passes a response with the status code "500" and an error message to display.  An alternative would be to render some sort of "page not found" page.
    console.error(error);
  }
};

/*
GET /categories
*/

exports.exploreCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.render("categories", { title: "Cooking Blog: Categories", categories });
    // This tells the server to return a rendered version of the "categories.ejs" page, which will be slotted into the "main.ejs" template.  The fact that main.ejs is being used was defined over on app.js
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occurred" });
  }
};
