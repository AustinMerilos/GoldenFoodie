import React, { useState } from "react";
import "./Recipe.css";

const Recipe = ({ title, image, url, ingredients }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  const previewIngredients = ingredients.slice(0, 3);
  const extraIngredients = ingredients.slice(3);

  return (
    <div className={`recipe ${expanded ? "expanded-card" : ""}`}>
      <img className="image" src={image} alt={title} />
      <h3 className="recipes-title">{title}</h3>

      <ul className="ingredient-list">
        {previewIngredients.map((ingredient, index) => (
          <li className="ingredient-text" key={index}>
            {ingredient.text}
          </li>
        ))}

        {expanded &&
          extraIngredients.map((ingredient, index) => (
            <li className="ingredient-text" key={index + 3}>
              {ingredient.text}
            </li>
          ))}
      </ul>

      {ingredients.length > 3 && (
        <button className="expand-btn" onClick={toggleExpand}>
          {expanded ? "Show Less" : `+${ingredients.length - 3} More`}
        </button>
      )}

      <a
        className="recipe-link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Full Recipe
      </a>
    </div>
  );
};

export default Recipe;
