const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/recipes.json");

function readRecipes() {
  const data = fs.readFileSync(dataPath);
  return JSON.parse(data);
}

function saveRecipes(recipes) {
  fs.writeFileSync(dataPath, JSON.stringify(recipes, null, 2));
}

exports.getRecipes = (req, res) => {
  const recipes = readRecipes();
  res.json(recipes);
};

exports.addRecipe = (req, res) => {
  const recipes = readRecipes();

  const newRecipe = {
    id: Date.now(),
    ...req.body,
  };

  recipes.push(newRecipe);
  saveRecipes(recipes);

  res.status(201).json(newRecipe);
};

exports.updateRecipe = (req, res) => {
  const recipes = readRecipes();
  const id = Number(req.params.id);

  const index = recipes.findIndex((recipe) => recipe.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Receita não encontrada" });
  }

  recipes[index] = { ...recipes[index], ...req.body };

  saveRecipes(recipes);
  res.json(recipes[index]);
};

exports.deleteRecipe = (req, res) => {
  let recipes = readRecipes();
  const id = Number(req.params.id);

  recipes = recipes.filter((recipe) => recipe.id !== id);

  saveRecipes(recipes);

  res.json({ message: "Receita removida com sucesso" });
};