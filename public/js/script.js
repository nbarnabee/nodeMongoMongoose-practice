let addButton = document.getElementById("addIngredientsBtn");
let ingredientList = document.querySelector(".ingredientList");
let firstIngredientDiv = document.querySelectorAll(".ingredientDiv")[0];
addButton.addEventListener("click", addInput);

function addInput() {
  let newIngredient = firstIngredientDiv.cloneNode(true);
  let input = newIngredient.getElementsByTagName("input")[0];
  input.value = "";
  ingredientList.appendChild(newIngredient);
}
