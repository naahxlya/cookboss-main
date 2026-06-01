const db = require("../database/connection");

function formatRecipe(recipe) {

  return {
    ...recipe,

    modoPreparo:
      recipe.modo_preparo,
  };
}

function getImageFromRequest(req) {

  if (!req.file) {

    return null;
  }

  const mimeType =
    req.file.mimetype;

  const base64 =
    req.file.buffer.toString(
      "base64"
    );

  return `data:${mimeType};base64,${base64}`;
}

exports.getRecipes = (req, res) => {

  const { user_id } =
    req.query;

  let sql =
    "SELECT * FROM recipes";

  const params = [];

  if (user_id) {

    sql =
      "SELECT * FROM recipes WHERE user_id = ?";

    params.push(user_id);
  }

  db.all(

    sql,

    params,

    (error, rows) => {

      if (error) {

        console.error(error);

        return res.status(500).json({
          message:
            "Erro ao buscar receitas",
        });
      }

      const formattedRecipes =
        rows.map(formatRecipe);

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

  if (
    !nome ||
    !categoria ||
    !tempo ||
    !ingredientes ||
    !modoPreparo ||
    !user_id
  ) {

    return res.status(400).json({
      message:
        "Preencha todos os campos obrigatórios",
    });
  }

  const imagem =
    getImageFromRequest(req) || "";

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

        console.error(error);

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

  const id =
    req.params.id;

  const { user_id } =
    req.body;

  if (!user_id) {

    return res.status(400).json({
      message:
        "Usuário não informado",
    });
  }

  db.get(

    "SELECT * FROM recipes WHERE id = ?",

    [id],

    (error, recipe) => {

      if (error) {

        console.error(error);

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

      if (
        Number(recipe.user_id) !==
        Number(user_id)
      ) {

        return res.status(403).json({
          message:
            "Você não tem permissão para editar esta receita",
        });
      }

      const removerImagem =
        req.body.removerImagem === "true";

      const newImage =
        getImageFromRequest(req);

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

        imagem: newImage
          ? newImage
          : removerImagem
            ? ""
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

            console.error(error);

            return res.status(500).json({
              message:
                "Erro ao atualizar receita",
            });
          }

          res.json({
            id,
            ...updatedRecipe,
            user_id:
              recipe.user_id,
          });
        }
      );
    }
  );
};

exports.deleteRecipe = (req, res) => {

  const id =
    req.params.id;

  const { user_id } =
    req.query;

  if (!user_id) {

    return res.status(400).json({
      message:
        "Usuário não informado",
    });
  }

  db.get(

    "SELECT * FROM recipes WHERE id = ?",

    [id],

    (error, recipe) => {

      if (error) {

        console.error(error);

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

      if (
        Number(recipe.user_id) !==
        Number(user_id)
      ) {

        return res.status(403).json({
          message:
            "Você não tem permissão para excluir esta receita",
        });
      }

      db.run(

        `
          DELETE FROM favorites
          WHERE recipe_id = ?
        `,

        [id],

        function () {

          db.run(

            "DELETE FROM recipes WHERE id = ?",

            [id],

            function (error) {

              if (error) {

                console.error(error);

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
        }
      );
    }
  );
};