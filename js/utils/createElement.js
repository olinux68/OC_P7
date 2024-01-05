// Cette fonction crée un élément DOM avec les attributs spécifiés et renvoie cet élément.
export function createElement(elementType, attributes) {
  // Créer un nouvel élément DOM du type spécifié (par exemple, "div", "span", "button").
  const element = document.createElement(elementType);

  // Transformer l'objet 'attributes' en tableau contenant des tableaux de paires clé-valeur.
  for (const [attr, value] of Object.entries(attributes)) {
    // Vérifier si la valeur de l'attribut n'est pas nulle (pour éviter les attributs non définis).
    if (value !== null) {
      // Définir l'attribut sur l'élément DOM avec la clé (attr) et la valeur (value) spécifiées.
      element.setAttribute(attr, value);
    }
  }

  // Renvoyer l'élément DOM créé avec les attributs spécifiés.
  return element;
}
