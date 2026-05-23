const db = require("../database/connection");

const bcrypt =
  require("bcrypt");

const transporter =
  require("../utils/mailer");

const maskEmail =
  require("../utils/maskEmail");

exports.forgotPassword = (
  req,
  res
) => {

  const { email } = req.body;

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],

    async (err, user) => {

      if (!user) {

        return res.status(404).json({
          message:
            "Email não encontrado",
        });
      }

      const code = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      db.run(
        `
        INSERT INTO password_resets
        (email, code)
        VALUES (?, ?)
        `,
        [email, code]
      );

      await transporter.sendMail({

        from:
        `"CookBoss 🍳" <${process.env.EMAIL_USER}>`,

        to: email,

        subject:
          "Seu código de verificação CookBoss",

        html: `
          <div style="
            font-family: Arial;
            padding: 20px;
          ">

            <h1 style="
              color: #db8a00;
            ">
              CookBoss 🍳
            </h1>

            <p>
              Seu código de verificação:
            </p>

            <div style="
              font-size: 36px;
              font-weight: bold;
              background: #fff4cf;
              padding: 20px;
              border-radius: 12px;
              text-align: center;
              letter-spacing: 8px;
              color: #db8a00;
            ">
              ${code}
            </div>

            <p style="
              margin-top: 20px;
              color: #777;
            ">
              Se você não solicitou,
              ignore este email.
            </p>

          </div>
        `,
      });

      res.json({
        message:
          "Código enviado",

        maskedEmail:
          maskEmail(email),
      });
    }
  );
};

exports.verifyCode = (
  req,
  res
) => {

  const { email, code } =
    req.body;

  db.get(
    `
    SELECT * FROM password_resets
    WHERE email = ?
    AND code = ?
    ORDER BY id DESC
    LIMIT 1
    `,
    [email, code],

    (err, reset) => {

      if (!reset) {

        return res.status(400).json({
          message:
            "Código inválido",
        });
      }

      const now = new Date();

      if (
        now > new Date(reset.expires_at)
      ) {

        return res.status(400).json({
          message:
            "Código expirado",
        });
      }

      res.json({
        message:
          "Código válido",
      });
    }
  );
};

exports.resetPassword = async (
  req,
  res
) => {

  const {
    email,
    password,
  } = req.body;

  const hashedPassword =
    await bcrypt.hash(password, 10);

  db.run(
    `
    UPDATE users
    SET password = ?
    WHERE email = ?
    `,
    [hashedPassword, email],

    (err) => {

      if (err) {

        return res.status(500).json({
          message:
            "Erro ao redefinir senha",
        });
      }

      res.json({
        message:
          "Senha redefinida",
      });
    }
  );
};