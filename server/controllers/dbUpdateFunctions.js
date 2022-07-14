/* This file contains various functions that can be used to manipulate information in the database.  Since we're working with the mongoose models and connecting to the database, we need everything that pertains to the db connection (the database.js file) and the model definitions */

require("../models/database");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");

/*

The following code blocks were used to create initial sets of dummy data in the database.  Pretty neat!

One other thing to note about mongoose is that if no collection is specified, it automatically creates a collection based on the model name; it runs the name through some sort of clever parser that returns a plural version.  So "Recipe" -> "recipes", and "Person" -> "people"

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



async function insertRecipeData() {
  try {
    await Recipe.insertMany([
      {
        name: "Recipe Name Goes Here",
        description: `Recipe Description Goes Here`,
        ingredients: [
          "1 level teaspoon baking powder",
          "1 level teaspoon cayenne pepper",
          "1 level teaspoon hot smoked paprika",
        ],
        category: "American",
        image: "southern-fried-chicken.jpg",
      },
      {
        name: "Recipe Name Goes Here",
        description: `Recipe Description Goes Here`,
        ingredients: [
          "1 level teaspoon baking powder",
          "1 level teaspoon cayenne pepper",
          "1 level teaspoon hot smoked paprika",
        ],
        category: "American",
        image: "southern-fried-chicken.jpg",
      },
    ]);
    console.log("Data inserted");
  } catch (error) {
    console.log("Error" + error);
  }
}

insertRecipeData();

*/

// Note for what's happening here:  it's finding and returning an array with a document in it, so I can't run these methods on doc precisely.  I'm not sure why this is happening, as it's certainly not what the documentation led me to expect.

// However!  This totally freaking works.

// Interesting to consider that this is not being exported anywhere, but it's running regardless.  I guess export only matters if a function is being called elsewhere.  So, in theory, I could build another file that would handle various update functions and such, and bundle the functions in yet a different file and export them to the function handling file.... that's getting complicated!

// According to the MVC model, such files would go into the controllers section.

// But clearly it is being called somewhere when it's in the recipeController file, because once I move these functions to their own location, there's no call.  So it's happening somewhere.

// Possibly in recipeRoutes, which refers to recipeController

async function updateRecipe(query, field, newValue) {
  try {
    const doc = await Recipe.find(query);
    doc[0][field] = newValue;
    await doc[0].save();
    console.log(doc[0]);
  } catch (error) {
    console.log("Error: " + error);
  }
}

/*  For example: 

updateRecipe(
  { name: "Southern Fried Chicken" },
  "description",
  "Battered and fried chicken."
);

*/

async function deleteRecipe(query) {
  try {
    await Recipe.deleteOne(query);
  } catch (error) {
    console.log(error);
  }
}

/* For example

deleteRecipe({name: "Southern Fried Chicken"});

*/
