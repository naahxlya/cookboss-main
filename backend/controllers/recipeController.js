const fs = require("fs");
const path = require("path");

const dataPath = path.join(
  __dirname,
  "../data/recipes.json"
);

function readRecipes() {

  const data = fs.readFileSync(dataPath);

  return JSON.parse(data);
}

function saveRecipes(recipes) {

  fs.writeFileSync(
    dataPath,
    JSON.stringify(recipes, null, 2)
  );
}

exports.getRecipes = (req, res) => {

  const recipes = readRecipes();

  res.json(recipes);
};

exports.addRecipe = (req, res) => {

  const recipes = readRecipes();

  const newRecipe = {
    id: Date.now(),

    nome: req.body.nome,
    categoria: req.body.categoria,
    tempo: req.body.tempo,

    imagem: req.file
      ? `/uploads/${req.file.filename}`
      : "",
  };

  recipes.push(newRecipe);

  saveRecipes(recipes);

  res.status(201).json(newRecipe);
};

exports.updateRecipe = (req, res) => {

  const recipes = readRecipes();

  const id = Number(req.params.id);

  const index = recipes.findIndex(
    (recipe) => recipe.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Receita não encontrada",
    });
  }

  const updatedRecipe = {
    ...recipes[index],

    nome: req.body.nome || recipes[index].nome,

    categoria:
      req.body.categoria ||
      recipes[index].categoria,

    tempo:
      req.body.tempo ||
      recipes[index].tempo,

    imagem: req.file
      ? `/uploads/${req.file.filename}`
      : recipes[index].imagem,
  };

  recipes[index] = updatedRecipe;

  saveRecipes(recipes);

  res.json(updatedRecipe);
};

exports.deleteRecipe = (req, res) => {

  let recipes = readRecipes();

  const id = Number(req.params.id);

  recipes = recipes.filter(
    (recipe) => recipe.id !== id
  );

  saveRecipes(recipes);

  res.json({
    message: "Receita removida com sucesso",
  });
};