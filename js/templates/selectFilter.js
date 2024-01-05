import { createElement } from "../utils/createElement.js";
import { sort } from "../utils/sort.js";

// Tableau des valeurs filtrées
export const activeFilterCategory = {
  ingredients: [],
  appliances: [],
  ustensils: [],
  keyword: "",
};

// Sélection de la section des filtres actifs dans le DOM
const activeFiltersSection = document.querySelector(".filters_active_section");

// Tableau des filtres actifs en tant qu'éléments HTML
let activeFiltersArray = [];

// Cette fonction est appelée lorsqu'un filtre est sélectionné ou désélectionné.
export function selectFilter(button) {
  const isActive = button.classList.contains("btn_active");

  if (!isActive) {
    // Activer le filtre
    enableFilter(button);
  } else {
    // Désactiver le filtre
    disableFilter(button, button.parentElement);
  }

  // Afficher les filtres actifs
  displayActiveFilters();
}

// Cette fonction active un filtre
function enableFilter(button) {
  // Activer le bouton sélectionné
  button.classList.add("btn_active");

  // Afficher la section des filtres actifs
  activeFiltersSection.classList.remove("hidden");

  const filterValue = button.innerText.toLowerCase();

  // Afficher le bouton "X" pour désélectionner le filtre
  const xMark = createElement("em", {
    // class: "fa-solid fa-circle-xmark",
    role: "button",
  });
  button.append(xMark);

  // Afficher le filtre actif
  const activeFilter = createElement("span", {
    class: "btn_filter filter_active",
    value: filterValue,
  });
  activeFilter.innerText = button.innerText;
  const removebtn = createElement("button", {
    class: "fa-solid fa-xmark remove_filter",
  });
  activeFilter.append(removebtn);

  // Ajouter le filtre actif au tableau
  activeFiltersArray.push(activeFilter);

  // Ajouter la valeur sélectionnée à activeFilterCategory
  const filter =
    button.parentElement.parentElement.querySelector(".btn_filter").value;
  if (filter == "ingredients") {
    activeFilterCategory.ingredients.push(button.getAttribute("value"));
  } else if (filter == "appliances") {
    activeFilterCategory.appliances.push(button.getAttribute("value"));
  } else if (filter == "ustensils") {
    activeFilterCategory.ustensils.push(button.getAttribute("value"));
  }

  // Supprimer le filtre actif lorsqu'on clique sur le bouton "X"
  removebtn.addEventListener("click", () => {
    disableFilter(button, removebtn.parentElement);
  });

  // Gérer les recettes recherchées en utilisant les valeurs sélectionnées
  sort(activeFilterCategory);
}

// Cette fonction désactive un filtre
function disableFilter(button, filterToRemove) {
  const filterValue = button.value.toLowerCase();

  // Supprimer le filtre actif cliqué du tableau
  activeFiltersArray = activeFiltersArray.filter(
    (filt) => filt.getAttribute("value").toLowerCase() !== filterValue
  );

  // Supprimer le filtre actif
  if (filterToRemove && filterToRemove !== "") {
    filterToRemove.remove();
  }

  // Désactiver le bouton actif dans le menu déroulant
  button.classList.remove("btn_active");
  button.querySelector("em").remove();

  // Masquer la section des filtres actifs si aucun filtre n'est actif
  if (activeFiltersArray.length === 0) {
    activeFiltersSection.classList.add("hidden");
  }

  // Supprimer la valeur sélectionnée de activeFilterCategory
  const filter =
    button.parentElement.parentElement.querySelector(".btn_filter").value;
  if (filter == "ingredients") {
    activeFilterCategory.ingredients = activeFilterCategory.ingredients.filter(
      (ingredient) => ingredient !== button.getAttribute("value")
    );
  } else if (filter == "appliances") {
    activeFilterCategory.appliances = activeFilterCategory.appliances.filter(
      (appliance) => appliance !== button.getAttribute("value")
    );
  } else if (filter == "ustensils") {
    activeFilterCategory.ustensils = activeFilterCategory.ustensils.filter(
      (ustensil) => ustensil !== button.getAttribute("value")
    );
  }

  // Gérer les recettes recherchées en utilisant les valeurs restantes
  sort(activeFilterCategory);
}

// Cette fonction affiche les filtres actifs dans la section des filtres actifs
function displayActiveFilters() {
  // Effacer les filtres actifs précédents
  activeFiltersSection.innerHTML = "";

  // Afficher les filtres actifs
  activeFiltersArray.forEach((filt) => {
    activeFiltersSection.append(filt);
  });

  // Masquer la section des filtres actifs si aucun filtre n'est actif
  if (activeFiltersArray.length === 0) {
    activeFiltersSection.classList.add("hidden");
  }
}
