import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import api from "../services/api";

import logo from "../assets/logo-bg.svg";

function Register() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
      confirmPassword: "",
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

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      return alert(
        "As senhas não coincidem"
      );
    }

    try {

      const response =
        await api.post(
          "/auth/register",
          {
            email:
              formData.email,
            password:
              formData.password,
          }
        );

      alert(
        response.data.message
      );

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data
          ?.message ||
        "Erro ao cadastrar"
      );
    }
  }

  return (
    <main className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-2">

      <div className="row w-100 justify-content-center">

        <div className="col-12 col-lg-10">

          <div className="card border-0 shadow-lg rounded-5 overflow-hidden">

            <div className="row g-0">

              <div className="col-lg-6 d-none d-lg-flex flex-column justify-content-center p-5 card-footer bg-opacity-25">

                <div className="text-center">

                  <img
                    src={logo}
                    alt="CookBoss"

                    style={{
                      width: "180px",
                      marginBottom: "12px",
                    }}
                  />

                  <h1 className="fw-bold text-warning mb-4">

                    Bem-vindo ao CookBoss 

                  </h1>

                  <p
                    className="fs-5"
                    style={{
                      lineHeight: "1.8",
                    }}
                  >

                    Organize suas receitas favoritas,
                    descubra novas ideias e monte
                    seu próprio livro culinário digital.

                  </p>

                  <p
                    className="mt-4 text-muted"
                  >

                    Salve ingredientes, modo de preparo,
                    imagens e tenha tudo acessível
                    em qualquer lugar ✨

                  </p>

                </div>

              </div>

              <div className="col-12 col-lg-6">

                <div className="card-body p-5">

                  <div className="text-center mb-4">

                    <h2 className="fw-bold text-warning">

                      Criar Conta

                    </h2>

                    <p className="text-muted">

                      Faça parte do CookBoss 😄

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
                        value={
                          formData.email
                        }
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
                        placeholder="Crie uma senha"
                        value={
                          formData.password
                        }
                        onChange={
                          handleChange
                        }
                        required
                      />

                    </div>

                    <div className="mb-4">

                      <label className="form-label fw-semibold">

                        Confirmar Senha

                      </label>

                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control form-control-lg rounded-4"
                        placeholder="Repita sua senha"
                        value={
                          formData.confirmPassword
                        }
                        onChange={
                          handleChange
                        }
                        required
                      />

                    </div>

                    <div className="d-grid mb-4">

                      <button className="btn btn-warning btn-lg fw-bold rounded-4">

                        Criar Conta

                      </button>

                    </div>

                  </form>

                  <div className="text-center">

                    <span className="text-muted">

                      Já possui conta?

                    </span>

                    <Link
                      to="/login"
                      className="text-warning fw-bold text-decoration-none ms-2"
                    >
                      Entrar
                    </Link>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Register;