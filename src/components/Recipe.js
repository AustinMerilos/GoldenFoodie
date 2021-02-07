import react from "react";
import "./Recipe.css";

const Recipe = ({ title, url, image, ingredients }) => {
  return (
    <div className="recipe">
      <h1 className="recipes-title">{title}</h1>
      <img className="image" src={image} alt=""></img>
      <h1>Ingredients</h1>
      <ul className="ingredient-list">
        {ingredients.map((ingredient) => (
          <li className="ingredient-text">{ingredient.text}</li>
        ))}{" "}
      </ul>
      <a
        className="source-text"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Source
      </a>
    </div>
  );
};

export default Recipe;
