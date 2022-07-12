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
    const recipes = await Recipe.find().sort({ _id: -1 }).limit(limitNumber);
    // Get the most recent 5 recipes (sort will sort them by descending order according to their auto-generated id number; bigger id number = more recent)
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

/* 
GET recipe by ID
*/
exports.exploreRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.find({ _id: req.params.id });
    res.render("recipe", { title: "Cooking Blog: Recipe", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occurred" });
  }
};
