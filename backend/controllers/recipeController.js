const db = require("../database/connection");

exports.getRecipes = (req, res) => {

  db.all(

    "SELECT * FROM recipes",

    [],

    (error, rows) => {

      if (error) {

        return res.status(500).json({
          message:
            "Erro ao buscar receitas",
        });
      }

      const formattedRecipes =
        rows.map((recipe) => ({

          ...recipe,

          modoPreparo:
            recipe.modo_preparo,
        }));

      res.json(
        formattedRecipes
      );
    }
  );
};

exports.addRecipe = (req, res) => {

  const recipes = readRecipes();

  const newRecipe = {
    id: Date.now(),

    nome: req.body.nome,
    categoria: req.body.categoria,
    tempo: req.body.tempo,

    ingredientes: req.body.ingredientes,
    modoPreparo: req.body.modoPreparo,

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

    nome:
      req.body.nome ||
      recipes[index].nome,

    categoria:
      req.body.categoria ||
      recipes[index].categoria,

    tempo:
      req.body.tempo ||
      recipes[index].tempo,

    ingredientes:
      req.body.ingredientes ||
      recipes[index].ingredientes,

    modoPreparo:
      req.body.modoPreparo ||
      recipes[index].modoPreparo,

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