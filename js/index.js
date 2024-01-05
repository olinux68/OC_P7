import { recipes } from "../data/recipes.js";
import { displayRecipes } from "./templates/recipeTemplate.js";
import { filtersTemplate } from "./templates/filtersTemplate.js";
import { activeFilterCategory } from "./templates/selectFilter.js";
import { sort } from "./utils/sort.js";

// Recherche principale
let mainResearch = document.querySelector(".research");

// Cette fonction principale est exécutée lorsque la page est chargée.
function main() {
  // Afficher les cartes des recettes
  displayRecipes(recipes);

  // Gérer et afficher les filtres
  filtersTemplate(recipes);

  // Écouter les événements d'entrée de l'utilisateur dans la barre de recherche
  mainResearch.addEventListener("input", (e) => {
    // L'utilisateur a saisi au moins 3 caractères
    if (e.target.value.length >= 3) {
      // Transformer la valeur saisie par l'utilisateur en minuscules
      const value = e.target.value.toLowerCase();
      // Définir la propriété "keyword" avec la valeur saisie par l'utilisateur
      activeFilterCategory.keyword = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    } else {
      // Réinitialiser la propriété "keyword" si la saisie ne comporte pas au moins 3 caractères
      activeFilterCategory.keyword = "";
    }

    // Gérer les recettes recherchées
    sort(activeFilterCategory);
  });
}

// Écouter l'événement de chargement de la page et exécuter la fonction principale.
window.addEventListener("load", () => {
  main();
});
