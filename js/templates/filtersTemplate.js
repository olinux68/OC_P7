import { createElement } from "../utils/createElement.js";
import { selectFilter } from "./selectFilter.js";
import { searchTag } from "../utils/searchTag.js";

// Objets distincts pour chaque catégorie de filtre
export const recipeArr = {
  ingredients: [],
  appliances: [],
  ustensils: [],
};

// Sélectionner les filtres
const filters = document.querySelectorAll(".filter");

export function filtersTemplate(recipes) {
  filters.forEach((filter) => {
    displayFiltersCategories(filter, recipes, displayFilters);

    filter.addEventListener("click", (e) => {
      // Sélectionner le bouton
      let button =
        e.target.value == undefined ? e.target.parentElement : e.target;

      if (
        button.value == "ingredients" ||
        button.value == "appliances" ||
        button.value == "ustensils"
      ) {
        showFilter(filters, filter);
      } else if (button.classList.contains("btn_filter")) {
        selectFilter(button);
      }
    });

    // Recherche de tag
    filter.querySelector(".research_filter").addEventListener("input", (e) => {
      searchTag(filter, e);
    });
  });
}

export function displayFiltersCategories(filter, recipes, displayFilters) {
  const filterMap = {
    ingredients: () => processCategory("ingredients", filter, recipes, displayFilters),
    appliances: () => processCategory("appliances", filter, recipes, displayFilters),
    ustensils: () => processCategory("ustensils", filter, recipes, displayFilters),
  };

  const filterValue = filter.children[0].value;

  if (filterMap.hasOwnProperty(filterValue)) {
    filterMap[filterValue]();
  } else {
    console.log("Cette valeur n'existe pas.");
  }
}

function processCategory(category, filter, recipes, displayFilters) {
  recipeArr[category] = [];

  recipes.forEach((recipe) => {
    if (category === "ingredients") {
      recipe.ingredients.forEach((ingredient) => {
        ingredient = ingredient.ingredient;
        recipeArr.ingredients.push(ingredient.toLowerCase());
      });
    } else if (category === "appliances") {
      recipeArr.appliances.push(recipe.appliance.toLowerCase());
    } else if (category === "ustensils") {
      recipe.ustensils.forEach((ustensil) => {
        recipeArr.ustensils.push(ustensil.toLowerCase());
      });
    }
  });

  // Créer un tableau sans éléments en double
  recipeArr[category] = [...new Set(recipeArr[category])];

  // Afficher les éléments dans le conteneur de filtres ouvert
  displayFilters(recipeArr[category], filter.children[1]);
}


function displayFilters(recipeArrCategory, container) {
  // Afficher les éléments de tags pour chaque filtre
  recipeArrCategory.forEach((element) => {
    const btnElement = createElement("button", {
      class: "btn_filter",
      value: element,
    });

    // Mettre la première lettre en majuscule
    btnElement.innerText = element.replace(/^\w/, (c) => c.toUpperCase());

    container.append(btnElement);
  });
}

function showFilter(filters, filter) {
  filters.forEach((filt) => {
    // Afficher/masquer le filtre cliqué et masquer tous les filtres non sélectionnés
    if (filt == filter) {
      const filterHide = filter.querySelector(".filter_expanded");
      const chevron = filter.querySelector(".fa-chevron-down");

      filterHide.classList.toggle("hidden");

      chevron.classList.toggle("down");
      chevron.classList.toggle("up");

      filter.classList.toggle("show_filter");
    } else {
      filt.classList.remove("show_filter");
      filt.querySelector(".filter_expanded").classList.add("hidden");
      filt.querySelector(".fa-chevron-down").classList.add("down");
      filt.querySelector(".fa-chevron-down").classList.remove("up");
    }
  });
}
