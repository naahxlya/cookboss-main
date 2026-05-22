const db = require("../database/connection");

const bcrypt = require("bcrypt");

exports.register = async (req, res) => {

  const {
    email,
    password,
    confirmPassword,
  } = req.body;

  if (
    !email ||
    !password ||
    !confirmPassword
  ) {
    return res.status(400).json({
      message:
        "Preencha todos os campos",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      message:
        "As senhas não coincidem",
    });
  }

  try {

    const hashedPassword =
      await bcrypt.hash(password, 10);

    db.run(
      `
      INSERT INTO users (
        email,
        password
      )
      VALUES (?, ?)
      `,
      [email, hashedPassword],

      function (error) {

        if (error) {

          return res.status(400).json({
            message:
              "Email já cadastrado",
          });
        }

        res.status(201).json({
          message:
            "Usuário cadastrado com sucesso",
        });
      }
    );

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Erro interno no servidor",
    });
  }
};

exports.login = (req, res) => {

  const {
    email,
    password,
  } = req.body;

  if (!email || !password) {

    return res.status(400).json({
      message:
        "Preencha todos os campos",
    });
  }

  db.get(
    `
    SELECT * FROM users
    WHERE email = ?
    `,
    [email],

    async (error, user) => {

      if (error) {

        console.error(error);

        return res.status(500).json({
          message:
            "Erro interno no servidor",
        });
      }

      if (!user) {

        return res.status(404).json({
          message:
            "Usuário não encontrado",
        });
      }

      try {

        const passwordMatch =
          await bcrypt.compare(
            password,
            user.password
          );

        if (!passwordMatch) {

          return res.status(401).json({
            message:
              "Senha incorreta",
          });
        }

        return res.status(200).json({

          message:
            "Login realizado com sucesso",

          user: {
            id: user.id,
            email: user.email,
          },
        });

      } catch (compareError) {

        console.error(compareError);

        return res.status(500).json({
          message:
            "Erro ao validar senha",
        });
      }
    }
  );
};