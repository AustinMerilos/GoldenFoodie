import React, { useEffect, useState } from "react";
import "./Search.css";
import Recipe from "./Recipe";

import { Link } from "react-router-dom";
import Logo from "../Logo.png";

import { GoSignOut } from "react-icons/go";

//Add APP_ID and APP_KEY from EDAMAM
const Search = () => {
  const APP_ID = "667c7766";
  const APP_KEY = "ab67ef4dda17f3a86a1aac58f7b16f6c";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("golden");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="Search">
      <form onSubmit={getSearch} className="search-form">
        <img className="search-logo" src={Logo} alt="Logo" />
        <input
          className="search-bar"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
        <div className="signOut-button">
          <Link to="/">
            <h4>
              <GoSignOut size="30px" />
              Sign Out
            </h4>
          </Link>
        </div>
      </form>

      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            url={recipe.recipe.url}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
