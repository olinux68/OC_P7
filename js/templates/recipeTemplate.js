import { createElement } from "../utils/createElement.js";

// Cette fonction prend un tableau de recettes en entrée et les affiche dans la section des recettes.
export function displayRecipes(recipes) {
  const totalRecipes = document.querySelector(".total_recipes");

  // Afficher le nombre total de recettes
  totalRecipes.innerText = `${recipes.length} recettes`;

  recipes.forEach((recipe) => {
    const recipesSection = document.querySelector(".recipes_section");

    // Créer des éléments DOM et définir leurs attributs (classe, source, etc.)
    const recipeCard = createElement("article", {
      class: "recipe_card",
      "data-id": recipe.id,
    });
    const imgContainer = createElement("div", { class: "img_container" });
    const img = createElement("img", {
      class: "recipe_img",
      src: `../assets/recipes/${recipe.image}`,
      alt: recipe.name,
    });
    const labelTime = createElement("span", { class: "label_time" });
    const descriptionContainer = createElement("div", {
      class: "recipe_description_container",
    });
    const recipeTitle = createElement("h3", { class: "recipe_title" });
    const recipeWrapper = createElement("div", { class: "recipe_wrapper" });
    const recipeTitleDesc = createElement("p", { class: "title_description" });
    const recipeDescription = createElement("p", {
      class: "recipe_description",
    });
    const recipeIngredientWrapper = createElement("div", {
      class: "recipe_wrapper",
    });
    const ingredientTitle = createElement("p", { class: "title_description" });
    const ingredientWrapper = createElement("div", {
      class: "ingredient_wrapper",
    });

    // Définir le texte interne des éléments
    labelTime.innerText = `${recipe.time}min`;
    recipeTitle.innerText = recipe.name;
    recipeTitleDesc.innerText = "recette";
    recipeDescription.innerText = recipe.description;
    ingredientTitle.innerText = "ingrédients";

    // Afficher les éléments DOM
    recipesSection.append(recipeCard);
    recipeCard.append(imgContainer);
    imgContainer.append(img);
    imgContainer.append(labelTime);
    recipeCard.append(descriptionContainer);
    descriptionContainer.append(recipeTitle);
    descriptionContainer.append(recipeWrapper);
    recipeWrapper.append(recipeTitleDesc);
    recipeWrapper.append(recipeDescription);
    descriptionContainer.append(recipeIngredientWrapper);
    recipeIngredientWrapper.append(ingredientTitle);
    recipeIngredientWrapper.append(ingredientWrapper);

    // Afficher la liste des ingrédients de la recette
    recipe.ingredients.forEach((ingredient) => {
      const ingredientContainer = createElement("div", {
        class: "ingredient_container",
      });
      const ingredients = createElement("span", { class: "ingredient" });
      const unit = createElement("span", { class: "unit" });

      ingredients.innerText = ingredient.ingredient;
      unit.innerText = `${ingredient.quantity ? ingredient.quantity : ""}${ingredient.unit ? ingredient.unit : ""
        }`;

      ingredientWrapper.append(ingredientContainer);
      ingredientContainer.append(ingredients);
      ingredientContainer.append(unit);
    });
  });
}
