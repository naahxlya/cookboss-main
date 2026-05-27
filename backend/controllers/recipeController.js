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

  const {
    nome,
    categoria,
    tempo,
    ingredientes,
    modoPreparo,
    user_id,
  } = req.body;

  const imagem = req.file
    ? `/uploads/${req.file.filename}`
    : "";

  db.run(

    `
      INSERT INTO recipes (

        nome,
        categoria,
        tempo,
        ingredientes,
        modo_preparo,
        imagem,
        user_id

      )

      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,

    [
      nome,
      categoria,
      tempo,
      ingredientes,
      modoPreparo,
      imagem,
      user_id,
    ],

    function (error) {

      if (error) {

        return res.status(500).json({
          message:
            "Erro ao adicionar receita",
        });
      }

      res.status(201).json({

        id: this.lastID,

        nome,
        categoria,
        tempo,
        ingredientes,

        modoPreparo,

        imagem,

        user_id,
      });
    }
  );
};

exports.updateRecipe = (req, res) => {

  const id = req.params.id;

  db.get(

    "SELECT * FROM recipes WHERE id = ?",

    [id],

    (error, recipe) => {

      if (error) {

        return res.status(500).json({
          message:
            "Erro ao buscar receita",
        });
      }

      if (!recipe) {

        return res.status(404).json({
          message:
            "Receita não encontrada",
        });
      }

      const updatedRecipe = {

        nome:
          req.body.nome ||
          recipe.nome,

        categoria:
          req.body.categoria ||
          recipe.categoria,

        tempo:
          req.body.tempo ||
          recipe.tempo,

        ingredientes:
          req.body.ingredientes ||
          recipe.ingredientes,

        modoPreparo:
          req.body.modoPreparo ||
          recipe.modo_preparo,

        imagem: req.file
          ? `/uploads/${req.file.filename}`
          : recipe.imagem,
      };

      db.run(

        `
          UPDATE recipes

          SET

            nome = ?,
            categoria = ?,
            tempo = ?,
            ingredientes = ?,
            modo_preparo = ?,
            imagem = ?

          WHERE id = ?
        `,

        [
          updatedRecipe.nome,
          updatedRecipe.categoria,
          updatedRecipe.tempo,
          updatedRecipe.ingredientes,
          updatedRecipe.modoPreparo,
          updatedRecipe.imagem,
          id,
        ],

        function (error) {

          if (error) {

            return res.status(500).json({
              message:
                "Erro ao atualizar receita",
            });
          }

          res.json({

            id,

            ...updatedRecipe,

            modoPreparo:
              updatedRecipe.modoPreparo,
          });
        }
      );
    }
  );
};

exports.deleteRecipe = (req, res) => {

  const id = req.params.id;

  db.run(

    "DELETE FROM recipes WHERE id = ?",

    [id],

    function (error) {

      if (error) {

        return res.status(500).json({
          message:
            "Erro ao remover receita",
        });
      }

      res.json({
        message:
          "Receita removida com sucesso",
      });
    }
  );
};