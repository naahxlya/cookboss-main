import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import api from "../services/api";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await api.get("/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error("Erro ao buscar receitas:", error);
      }
    }

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Todas as receitas</h2>

      <SearchBar search={search} setSearch={setSearch} />

      <div className="d-flex flex-wrap gap-3">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default Recipes;