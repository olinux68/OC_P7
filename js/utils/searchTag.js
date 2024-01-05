import { recipeArr } from "../templates/filtersTemplate.js";

// Tableau des valeurs recherchées
let searchedFilter = [];

// Cette fonction gère la recherche de tags dans la catégorie spécifiée.
export function searchTag(filter, e) {
  // Gérer la recherche pour chaque catégorie de filtre en fonction de la valeur du filtre.
  switch (filter.children[0].value) {
    case "ingredients":
      searchEachFilter(filter, e.target.value, recipeArr.ingredients);
      break;
    case "appliances":
      searchEachFilter(filter, e.target.value, recipeArr.appliances);
      break;
    case "ustensils":
      searchEachFilter(filter, e.target.value, recipeArr.ustensils);
      break;
    default:
      console.log("Cette valeur n'existe pas");
  }
}

// Cette fonction effectue la recherche dans une catégorie de filtre spécifiée.
function searchEachFilter(filter, value, recipeCategory) {
  let filtersContainer = filter.children[1];

  // Si la valeur saisie par l'utilisateur n'est pas vide
  if (value !== "") {
    // Obtenir un tableau de valeurs recherchées en utilisant la valeur saisie
    searchedFilter = recipeCategory.filter((recipe) =>
      // Obtenir tous les tags commençant par la valeur saisie par l'utilisateur
      // ou si la valeur a au moins 3 caractères, obtenir les tags qui incluent la valeur saisie
      recipe.startsWith(value.toLocaleLowerCase()) || value.length >= 3
        ? recipe.includes(value.toLocaleLowerCase())
        : ""
    );

    // Cacher tous les boutons de filtre
    filtersContainer.querySelectorAll(".btn_filter").forEach((btn) => {
      btn.classList.add("hidden");

      // Afficher les boutons des filtres recherchés
      searchedFilter.forEach((filtValue) => {
        if (filtValue == btn.value) {
          btn.classList.remove("hidden");
        }
      });
    });
  } else {
    // Afficher tous les boutons de filtre si la valeur saisie est vide
    filtersContainer.querySelectorAll(".btn_filter").forEach((btn) => {
      recipeCategory.forEach((filt) => {
        if (filt == btn.value) {
          btn.classList.remove("hidden");
        }
      });
    });

    console.log("Aucun filtre recherché");
  }
}
