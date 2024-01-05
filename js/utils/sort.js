// Importation des recettes depuis le module de données recipes.js
import { recipes } from "../../data/recipes.js";

// Importation de fonctions pour l'affichage des filtres et des recettes à partir des modules correspondants
import { displayFiltersCategories } from "../templates/filtersTemplate.js";
import { displayRecipes } from "../templates/recipeTemplate.js";
import { createElement } from "./createElement.js";
import { recipeArr } from "../templates/filtersTemplate.js";

// Déclaration d'un tableau vide pour stocker les recettes qui correspondent aux filtres actifs
let foundRecipes = [];

// Fonction pour trier et afficher les recettes en fonction des filtres actifs
export function sort(activeFilterCategory) {
  // Réinitialisation du tableau des recettes correspondantes
  foundRecipes = [];

  // Recherche des recettes correspondant aux filtres actifs
  foundRecipes = searchRecipe(activeFilterCategory);

  // Réinitialiser l'objet recipeArr en vidant chaque propriété
  Object.keys(recipeArr).forEach((key) =>
    Array.isArray(recipeArr[key])
      ? (recipeArr[key] = [])
      : (recipeArr[key] = "")
  );

  // Sélectionner tous les éléments du DOM ayant la classe .filter
  const filters = document.querySelectorAll(".filter");
  filters.forEach((filter) => {
    // Affichage des catégories de filtres et mise à jour de recipeArr avec les tags restants
    displayFiltersCategories(filter, foundRecipes, displayFilter);

    // Réinitialisation du champ de recherche
    let inputTag = filter.querySelector(".research_filter");
    if (inputTag.value !== "") {
      inputTag.value = "";
    }
  });

  // Afficher les cartes des recettes correspondantes
  displayRecipeCard(foundRecipes);
}

// Fonction pour normaliser les chaînes de caractères
function normalizeString(str) {
  // Vérifier si str est une chaîne et la transformer en minuscules, retirer les accents
  return typeof str === 'string' ? str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : '';
}

// Fonction pour rechercher des recettes correspondant aux filtres actifs
export function searchRecipe(activeFilterCategory) {
  var matchingRecipes = [];
  var recipe, ingredientsMatch, ustensilsMatch, appliancesMatch, keywordMatch;

  var normalizedKeyword = normalizeString(activeFilterCategory.keyword);
  var normalizedIngredients = activeFilterCategory.ingredients.map(normalizeString);
  var normalizedUstensils = activeFilterCategory.ustensils.map(normalizeString);
  var normalizedAppliances = activeFilterCategory.appliances.map(normalizeString);

  for (var i = 0; i < recipes.length; i++) {
    recipe = recipes[i];
    ingredientsMatch = true;
    ustensilsMatch = true;
    appliancesMatch = true;
    keywordMatch = !normalizedKeyword;

    for (var j = 0; j < normalizedIngredients.length && ingredientsMatch; j++) {
      ingredientsMatch = recipe.ingredients.some(recipeIngredient =>
        normalizeString(recipeIngredient.ingredient) === normalizedIngredients[j]
      );
    }

    for (var j = 0; j < normalizedUstensils.length && ustensilsMatch; j++) {
      ustensilsMatch = recipe.ustensils.some(ustensil =>
        normalizeString(ustensil) === normalizedUstensils[j]
      );
    }

    for (var j = 0; j < normalizedAppliances.length && appliancesMatch; j++) {
      appliancesMatch = normalizeString(recipe.appliance) === normalizedAppliances[j];
    }

    if (normalizedKeyword) {
      keywordMatch = 
        normalizeString(recipe.name).includes(normalizedKeyword) ||
        normalizeString(recipe.description).includes(normalizedKeyword) ||
        recipe.ingredients.some(recipeIngredient =>
          normalizeString(recipeIngredient.ingredient).includes(normalizedKeyword)
        );
    }

    if (ingredientsMatch && ustensilsMatch && appliancesMatch && keywordMatch) {
      matchingRecipes.push(recipe);
    }
  }

  return matchingRecipes;
}

// Fonction pour afficher les filtres en fonction de la catégorie de recette
function displayFilter(recipeCategory, filterContainer) {
  // Masquer tous les boutons de filtre
  filterContainer
    .querySelectorAll(".btn_filter")
    .forEach((btn) => btn.classList.add("hidden"));

  // Afficher les boutons de filtre pertinents
  recipeCategory.forEach((element) => {
    filterContainer.querySelectorAll(".btn_filter").forEach((btn) => {
      if (btn.value === element) {
        btn.classList.remove("hidden");
      }
    });
  });
}

// Fonction pour afficher les cartes de recettes correspondantes
function displayRecipeCard(foundRecipes) {
  // Suppression des doublons de recettes
  foundRecipes = [...new Set(foundRecipes)];

  // Effacer le contenu actuel de la section des recettes
  document.querySelector(".recipes_section").innerHTML = "";

  // Afficher les nouvelles cartes de recettes
  displayRecipes(foundRecipes);

  // Afficher un message d'erreur si aucune recette n'est trouvée
  if (foundRecipes.length == 0) {
    const recipeSection = document.querySelector(".recipes_section");
    const typedValue = document.querySelector(".research").value;

    // Création et affichage d'un message d'erreur
    const errorMsg = createElement("p", { class: "no_result" });
    errorMsg.innerHTML = `Aucune recette avec le mot : <br> "${typedValue}"<br>Vous pouvez chercher "Pizza", "Tarte aux pommes", etc.`;

    recipeSection.append(errorMsg);
  }
}
