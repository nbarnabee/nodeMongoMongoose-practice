require("../models/database");
const Category = require("../models/Category");

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
    res.render("index", { title: "Cooking Blog: Home", categories });
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

The following code block was used to create an initial set of dummy categories in the database.  Pretty neat!

*/

/*
async function insertCategoryData() {
  try {
    await Category.insertMany([
      { name: "Thai", image: "thai-food.jpg" },
      { name: "American", image: "american-food.jpg" },
      { name: "Indian", image: "indian-food.jpg" },
      { name: "Chinese", image: "chinese-food.jpg" },
      { name: "Spanish", image: "spanish-food.jpg" },
      { name: "Mexican", image: "mexican-food.jpg" },
    ]);
  } catch (error) {
    console.log("Error:" + error);
  }
}

insertCategoryData();

*/
