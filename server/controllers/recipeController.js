require("../models/database");
const Category = require("../models/Category");

/**
 *  GET
 *  Homepage
 * */

exports.homepage = async (req, res) => {
  try {
    //Step 1: get the categories from the server.
    const limitNumber = 5;
    const categories = await Category.find().limit(limitNumber);
    res.render("index", { title: "Cooking Blog: Home", categories });
    //The above indicates that the homepage is created by rendering the data in the "index" file in the main.ejs file.  I've also specified a page title.
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
    // This passes a response with the status code "500" and an error message to display.  An alternative would be to render some sort of "page not found" page.
    console.error(error);
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
      { name: "Indian", image: "indian-food-jpg" },
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
