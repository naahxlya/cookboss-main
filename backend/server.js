const express = require("express");

const cors = require("cors");

const path = require("path");

const db = require("./database/connection");

require("./database/init");

const recipeRoutes = require(
  "./routes/recipes"
);

const authRoutes = require(
  "./routes/auth"
);

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
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

const PORT = 3001;

app.listen(PORT, () => {

  console.log(
    `Servidor rodando na porta ${PORT}`
  );

});