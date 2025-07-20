import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";

import "./Search.css";
import Recipe from "./Recipe";
import Logo from "../Logo.png";

import { AuthContext } from "../index";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Search = () => {
  const APP_ID = process.env.REACT_APP_EDAMAM_ID;
  const APP_KEY = process.env.REACT_APP_EDAMAM_KEY;

  const { user, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("random");
  const [error, setError] = useState(null);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await fetch(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        const data = await response.json();

        if (data.hits) {
          setRecipes(data.hits);
          setError(null);
        } else {
          setRecipes([]);
          setError("No recipes found or invalid API response.");
        }
      } catch (err) {
        setError("Failed to fetch recipes. Please try again.");
        setRecipes([]);
      }
    };

    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search || "random");
    setSearch("");
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
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

        <div className="user-info">
          {user && (
            <span className="user-greeting">
              Hello, {user.displayName || user.email}
            </span>
          )}
          <button className="signout-btn" onClick={handleSignOut}>
            <GoSignOut size="20px" />
            <span>Sign Out</span>
          </button>
        </div>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="recipes">
        {recipes.length > 0
          ? recipes.map((recipe) => (
              <Recipe
                key={recipe.recipe.uri}
                title={recipe.recipe.label}
                url={recipe.recipe.url}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
              />
            ))
          : !error && <p>No recipes to display.</p>}
      </div>
    </div>
  );
};

export default Search;
