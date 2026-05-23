import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import api from "../services/api";

function ForgotPassword() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const response =
        await api.post(
          "/password/forgot-password",
          { email }
        );

      navigate(
        "/verify-code",
        {
          state: {
            email,
            maskedEmail:
              response.data.maskedEmail,
          },
        }
      );

    } catch (error) {

      alert(
        error.response?.data
          ?.message ||
        "Erro ao enviar código"
      );
    }
  }

  return (
    <main className="container py-1">

      <div className="row justify-content-center">

        <div className="col-12 col-md-8 col-lg-5">

          <div className="card border-0 shadow-lg rounded-5">

            <div className="card-body p-5">

              <div className="text-center mb-4">

                <h1 className="fw-bold text-warning">
                  Recuperar Senha
                </h1>

                <p className="text-muted">
                  Digite seu email para
                  receber o código.
                </p>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="mb-4">

                  <input
                    type="email"
                    className="form-control form-control-lg rounded-4"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

                <div className="d-grid">

                  <button className="btn btn-warning btn-lg rounded-4 fw-bold">

                    Enviar Código

                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default ForgotPassword;