const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  category: {
    type: String,
    enum: ["Thai", "American", "Chinese", "Mexican", "Indian", "Spanish"],
    // Only the above values are valid entries; if the category type is an array, it must be specifically defined as [String] or [Number] and not merely "Array" for this to work
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

recipeSchema.index({ name: "text", description: "text" });
// The above will create an associated index which is what MongoDB search queries will look at (rather than looking through ALL properties of the objects)

module.exports = mongoose.model("Recipe", recipeSchema);
