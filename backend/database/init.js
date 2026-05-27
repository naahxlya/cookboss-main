const db = require("./connection");

db.serialize(() => {

  db.run(`

    CREATE TABLE IF NOT EXISTS users (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      email TEXT UNIQUE NOT NULL,

      password TEXT NOT NULL,

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`

    CREATE TABLE IF NOT EXISTS recipes (

      id INTEGER PRIMARY KEY AUTOINCREMENT,

      nome TEXT NOT NULL,

      ingredientes TEXT NOT NULL,

      modo_preparo TEXT NOT NULL,

      categoria TEXT,

      tempo TEXT,

      imagem TEXT,

      user_id INTEGER NOT NULL,

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

      FOREIGN KEY (user_id)
      REFERENCES users(id)

    )
  `);

});

console.log("Banco inicializado");