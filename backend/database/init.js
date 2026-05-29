const db = require("./connection");

db.serialize(() => {

  db.run(`

    CREATE TABLE IF NOT EXISTS users (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      email TEXT UNIQUE NOT NULL,

      password TEXT NOT NULL,

      avatar TEXT,

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`

    CREATE TABLE IF NOT EXISTS recipes (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      nome TEXT NOT NULL,

      categoria TEXT,

      tempo TEXT,

      ingredientes TEXT NOT NULL,

      modo_preparo TEXT NOT NULL,

      imagem TEXT,

      user_id INTEGER NOT NULL,

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (user_id)
      REFERENCES users(id)

    )
  `);

  db.run(`

    CREATE TABLE IF NOT EXISTS password_resets (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      email TEXT NOT NULL,

      code TEXT NOT NULL,

      expires_at DATETIME NOT NULL
    )
  `);

  db.run(`

    CREATE TABLE IF NOT EXISTS favorites (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      user_id INTEGER NOT NULL,

      recipe_id INTEGER NOT NULL,

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

      UNIQUE(user_id, recipe_id),

      FOREIGN KEY (user_id)
      REFERENCES users(id),

      FOREIGN KEY (recipe_id)
      REFERENCES recipes(id)
    )
  `);

});

console.log("Banco inicializado");