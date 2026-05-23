import { useState } from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import api from "../services/api";

function ResetPassword() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const { email } =
    location.state || {};

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    if (
      password !==
      confirmPassword
    ) {

      return alert(
        "As senhas não coincidem"
      );
    }

    try {

      await api.post(
        "/password/reset-password",
        {
          email,
          password,
        }
      );

      alert(
        "Senha redefinida com sucesso"
      );

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data
          ?.message ||
        "Erro ao redefinir senha"
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
                  Nova Senha
                </h1>

                <p className="text-muted">
                  Digite sua nova senha.
                </p>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="mb-4">

                  <input
                    type="password"
                    className="form-control form-control-lg rounded-4"
                    placeholder="Nova senha"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

                <div className="mb-4">

                  <input
                    type="password"
                    className="form-control form-control-lg rounded-4"
                    placeholder="Confirmar senha"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

                <div className="d-grid">

                  <button className="btn btn-warning btn-lg rounded-4 fw-bold">

                    Redefinir Senha

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

export default ResetPassword;