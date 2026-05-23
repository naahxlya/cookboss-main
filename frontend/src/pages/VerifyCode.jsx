import { useState } from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import api from "../services/api";

function VerifyCode() {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const {
    email,
    maskedEmail,
  } = location.state || {};

  const [code, setCode] =
    useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      await api.post(
        "/password/verify-code",
        {
          email,
          code,
        }
      );

      navigate(
        "/reset-password",
        {
          state: { email },
        }
      );

    } catch (error) {

      alert(
        error.response?.data
          ?.message ||
        "Código inválido"
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
                  Verificar Código
                </h1>

                <p className="text-muted">

                  Enviamos um código para:

                  <br />

                  <strong>
                    {maskedEmail}
                  </strong>

                </p>

                <p className="text-muted">

                    Verifique também a caixa de spam e lixo eletrônico.
                  <br />

                </p>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="mb-4">

                  <input
                    type="text"
                    className="form-control form-control-lg rounded-4 text-center"
                    placeholder="000000"
                    value={code}
                    maxLength={6}
                    onChange={(e) =>
                      setCode(
                        e.target.value
                      )
                    }
                    required
                  />

                </div>

                <div className="d-grid">

                  <button className="btn btn-warning btn-lg rounded-4 fw-bold">

                    Verificar Código

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

export default VerifyCode;