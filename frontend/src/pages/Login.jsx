import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import api from "../services/api";

function Login({ setUser }) {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const response =
        await api.post(
          "/auth/login",
          formData
        );

      localStorage.setItem(
        "cookboss_user",

        JSON.stringify(
          response.data.user
        )
      );

      setUser(
        response.data.user
      );

      alert(
        response.data.message
      );

      navigate("/home");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data
          ?.message ||
        "Erro ao fazer login"
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
                  Entrar
                </h1>

                <p className="text-muted">
                  Faça login no CookBoss
                </p>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg rounded-4"
                    placeholder="Digite seu email"
                    value={formData.email}
                    onChange={
                      handleChange
                    }
                    required
                  />

                </div>

                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Senha
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="form-control form-control-lg rounded-4"
                    placeholder="Digite sua senha"
                    value={
                      formData.password
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />

                </div>

                <div className="d-grid mb-4">

                  <button className="btn btn-warning btn-lg fw-bold rounded-4">

                    Entrar

                  </button>

                </div>

              </form>

              <div className="text-center mb-3">

                <Link
                  to="/forgot-password"
                  className="text-decoration-none text-warning fw-bold"
                >
                  Esqueci minha senha
                </Link>

              </div>

              <div className="text-center">

                <span className="text-muted">
                  Não possui conta?
                </span>

                <Link
                  to="/register"
                  className="text-warning fw-bold text-decoration-none ms-2"
                >
                  Criar conta
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Login;