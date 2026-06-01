require("dotenv").config();

const express =
  require("express");

const cors =
  require("cors");

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

function normalizeOrigin(origin) {

  return String(origin || "")
    .replace(/\/$/, "");
}

const allowedOrigins = [
  "http://localhost:5173",
  normalizeOrigin(
    process.env.FRONTEND_URL
  ),
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {

      const normalizedOrigin =
        normalizeOrigin(origin);

      if (
        !origin ||
        allowedOrigins.includes(
          normalizedOrigin
        )
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

app.get("/", (req, res) => {

  res.send(
    "API CookBoss online"
  );
});

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