import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddRecipe() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    tempo: "",
    imagem: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.post("/recipes", formData);

      alert("Receita adicionada com sucesso!");

      navigate("/recipes");
    } catch (error) {
      console.error(error);

      alert("Erro ao adicionar receita");
    }
  }

  return (
  <div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-12 col-md-10 col-lg-7">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body p-5">
            <h2 className="text-center fw-bold mb-4 text-warning">
              🍳 Adicionar Receita
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Nome da Receita
                </label>

                <input
                  type="text"
                  name="nome"
                  className="form-control form-control-lg"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Categoria
                </label>

                <input
                  type="text"
                  name="categoria"
                  className="form-control form-control-lg"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Tempo de Preparo
                </label>

                <input
                  type="text"
                  name="tempo"
                  className="form-control form-control-lg"
                  value={formData.tempo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">
                  URL da Imagem
                </label>

                <input
                  type="text"
                  name="imagem"
                  className="form-control form-control-lg"
                  value={formData.imagem}
                  onChange={handleChange}
                />
              </div>

              <div className="d-grid">
                <button className="btn btn-warning btn-lg fw-bold">
                  Adicionar Receita
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default AddRecipe;