require("dotenv").config();

const express =
  require("express");

const cors =
  require("cors");

const path =
  require("path");

require("./database/init");

const recipeRoutes =
  require("./routes/recipes");

const authRoutes =
  require("./routes/auth");

const passwordRoutes =
  require("./routes/password");

const favoriteRoutes =
  require("./routes/favorites");

const app =
  express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {

      if (
        !origin ||
        allowedOrigins.includes(origin)
      ) {

        callback(null, true);

      } else {

        callback(
          new Error(
            "Origem não permitida pelo CORS"
          )
        );
      }
    },
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  "/uploads",

  express.static(
    path.join(
      __dirname,
      "uploads"
    )
  )
);

app.use(
  "/recipes",
  recipeRoutes
);

app.use(
  "/auth",
  authRoutes
);

app.use(
  "/password",
  passwordRoutes
);

app.use(
  "/favorites",
  favoriteRoutes
);

const PORT =
  process.env.PORT || 3001;

app.listen(PORT, () => {

  console.log(
    `Servidor rodando na porta ${PORT}`
  );

});