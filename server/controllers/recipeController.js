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
    res.render("categories", {
      title: "Cooking Blog: Categories",
      path: "categories",
      categories,
    });
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
    const recipe = await Recipe.findById(req.params.id);
    // key difference between generic find() and findById() : find() returns an array and findById() returns a single object
    console.log(recipe);
    res.render("recipe", { title: `Cooking Blog: ${recipe.name}`, recipe });
  } catch (error) {
    console.log(error);
    res.render("error", { title: "Cooking Blog: Recipe Not Found" });
  }
};

/*
POST search
*/

exports.searchRecipe = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchResults = await Recipe.find({
      $text: { $search: searchTerm },
    });
    res.render("search", {
      title: "Cooking Blog: Search Results",
      heading: "Search Results",
      path: "recipe",
      searchResults,
    });
  } catch (error) {
    console.log(error);
    res.render("error", { title: "Cooking Blog: Recipe Not Found" });
  }
};

/*

GET latest

*/

exports.latest = async (req, res) => {
  try {
    const limit = 10;
    const searchResults = await Recipe.find().sort({ _id: -1 }).limit(limit);
    res.render("search", {
      title: "Cooking Blog: Latest Recipes",
      heading: "Latest Recipes",
      path: "recipe",
      searchResults,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message || "Error occurred" });
  }
};

/*

GET random

*/

exports.random = async (req, res) => {
  try {
    let count = await Recipe.countDocuments();
    let random = Math.floor(Math.random() * count);
    let recipe = await Recipe.findOne().skip(random).exec();
    res.render("recipe", { title: `Cooking Blog: ${recipe.name}`, recipe });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message || "Error occurred" });
  }
};

/* 

GET submit

*/

exports.submitRecipe = async (req, res) => {
  try {
    const infoErrorObj = req.flash("infoErrors");
    const infoSuccessObj = req.flash("infoSuccess");
    // Here we are using the flash middleware to build up some messages that will be shown to the user upon a submission
    res.render("submit", {
      title: "Cooking Blog: Submit Your Recipe",
      infoErrorObj,
      infoSuccessObj,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error occurred" });
  }
};

/*  
POST submit recipe
*/

exports.submitRecipeOnPost = async (req, res) => {
  try {
    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("No files were uploaded.");
    } else {
      imageUploadFile = req.files.image;
      newImageName = Date.now() + imageUploadFile.name;
      uploadPath =
        require("path").resolve("./") + "/public/img/" + newImageName;
      imageUploadFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
      });
    }

    const newRecipe = new Recipe({
      name: req.body.recipe,
      description: req.body.description,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: newImageName,
    });
    await newRecipe.save();
    // console.log(req.body);
    req.flash("infoSuccess", "Recipe added.  Thank you for your submission!");
    res.redirect("/submit");
    // this will refresh the page and display the success message
  } catch (error) {
    req.flash("infoError", error);
    res.redirect("/submit");
  }
};
