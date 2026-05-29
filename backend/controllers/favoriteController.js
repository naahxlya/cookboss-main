const db = require("../database/connection");

function formatRecipe(recipe) {

  return {
    ...recipe,

    modoPreparo:
      recipe.modo_preparo,
  };
}

exports.getFavorites = (req, res) => {

  const { user_id } = req.query;

  if (!user_id) {

    return res.status(400).json({
      message:
        "Usuário não informado",
    });
  }

  db.all(

    `
      SELECT recipes.*

      FROM favorites

      INNER JOIN recipes
      ON favorites.recipe_id = recipes.id

      WHERE favorites.user_id = ?
    `,

    [user_id],

    (error, rows) => {

      if (error) {

        console.error(error);

        return res.status(500).json({
          message:
            "Erro ao buscar favoritos",
        });
      }

      const formattedRecipes =
        rows.map(formatRecipe);

      res.json(formattedRecipes);
    }
  );
};

exports.addFavorite = (req, res) => {

  const {
    user_id,
    recipe_id,
  } = req.body;

  if (!user_id || !recipe_id) {

    return res.status(400).json({
      message:
        "Dados incompletos",
    });
  }

  db.run(

    `
      INSERT OR IGNORE INTO favorites (
        user_id,
        recipe_id
      )

      VALUES (?, ?)
    `,

    [
      user_id,
      recipe_id,
    ],

    function (error) {

      if (error) {

        console.error(error);

        return res.status(500).json({
          message:
            "Erro ao favoritar receita",
        });
      }

      res.status(201).json({
        message:
          "Receita adicionada aos favoritos",
      });
    }
  );
};

exports.removeFavorite = (req, res) => {

  const {
    user_id,
    recipe_id,
  } = req.query;

  if (!user_id || !recipe_id) {

    return res.status(400).json({
      message:
        "Dados incompletos",
    });
  }

  db.run(

    `
      DELETE FROM favorites

      WHERE user_id = ?
      AND recipe_id = ?
    `,

    [
      user_id,
      recipe_id,
    ],

    function (error) {

      if (error) {

        console.error(error);

        return res.status(500).json({
          message:
            "Erro ao remover favorito",
        });
      }

      res.json({
        message:
          "Receita removida dos favoritos",
      });
    }
  );
};

exports.checkFavorite = (req, res) => {

  const {
    user_id,
    recipe_id,
  } = req.query;

  if (!user_id || !recipe_id) {

    return res.status(400).json({
      message:
        "Dados incompletos",
    });
  }

  db.get(

    `
      SELECT *

      FROM favorites

      WHERE user_id = ?
      AND recipe_id = ?
    `,

    [
      user_id,
      recipe_id,
    ],

    (error, favorite) => {

      if (error) {

        console.error(error);

        return res.status(500).json({
          message:
            "Erro ao verificar favorito",
        });
      }

      res.json({
        isFavorite:
          !!favorite,
      });
    }
  );
};