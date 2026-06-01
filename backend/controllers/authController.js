const bcrypt =
  require("bcrypt");

const db =
  require("../database/connection");

function normalizeEmail(email) {

  return String(email || "")
    .trim()
    .toLowerCase();
}

exports.register = (req, res) => {

  const email =
    normalizeEmail(
      req.body.email
    );

  const password =
    req.body.password ||
    req.body.senha;

  const confirmPassword =
    req.body.confirmPassword ||
    req.body.confirmarSenha;

  if (!email || !password) {

    return res.status(400).json({
      message:
        "Preencha todos os campos",
    });
  }

  if (
    confirmPassword &&
    password !== confirmPassword
  ) {

    return res.status(400).json({
      message:
        "As senhas não coincidem",
    });
  }

  db.get(

    "SELECT * FROM users WHERE email = ?",

    [email],

    async (error, user) => {

      if (error) {

        console.error(error);

        return res.status(500).json({
          message:
            "Erro ao verificar usuário",
        });
      }

      if (user) {

        return res.status(400).json({
          message:
            "Email já cadastrado",
        });
      }

      try {

        const hashedPassword =
          await bcrypt.hash(
            password,
            10
          );

        db.run(

          `
            INSERT INTO users (
              email,
              password
            )

            VALUES (?, ?)
          `,

          [
            email,
            hashedPassword,
          ],

          function (error) {

            if (error) {

              console.error(error);

              return res.status(500).json({
                message:
                  "Erro ao cadastrar usuário",
              });
            }

            return res.status(201).json({
              message:
                "Usuário cadastrado com sucesso",

              user: {
                id: this.lastID,
                email,
              },
            });
          }
        );

      } catch (error) {

        console.error(error);

        return res.status(500).json({
          message:
            "Erro ao criptografar senha",
        });
      }
    }
  );
};

exports.login = (req, res) => {

  const email =
    normalizeEmail(
      req.body.email
    );

  const password =
    req.body.password ||
    req.body.senha;

  if (!email || !password) {

    return res.status(400).json({
      message:
        "Preencha todos os campos",
    });
  }

  db.get(

    "SELECT * FROM users WHERE email = ?",

    [email],

    async (error, user) => {

      if (error) {

        console.error(error);

        return res.status(500).json({
          message:
            "Erro ao fazer login",
        });
      }

      if (!user) {

        return res.status(401).json({
          message:
            "Email ou senha incorretos",
        });
      }

      const passwordMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!passwordMatch) {

        return res.status(401).json({
          message:
            "Email ou senha incorretos",
        });
      }

      return res.json({
        message:
          "Login realizado com sucesso",

        user: {
          id: user.id,
          email: user.email,
        },
      });
    }
  );
};