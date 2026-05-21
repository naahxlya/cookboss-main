import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditRecipe() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    tempo: "",
    imagem: "",
  });

  useEffect(() => {
    loadRecipe();
  }, []);

  async function loadRecipe() {

    try {

      const response = await api.get("/recipes");

      const recipe = response.data.find(
        (item) => item.id === Number(id)
      );

      if (recipe) {
        setFormData(recipe);
      }

    } catch (error) {

      console.error(error);
    }
  }

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleImageChange(e) {

    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 500 * 1024) {
      alert("Escolha uma imagem menor que 500KB");
      return;
    }

    setFormData({
      ...formData,
      imagem: file,
    });
  }

  function removeImage() {

    setFormData({
      ...formData,
      imagem: "",
    });
  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const data = new FormData();

      data.append("nome", formData.nome);
      data.append("categoria", formData.categoria);
      data.append("tempo", formData.tempo);

      if (formData.imagem instanceof File) {
        data.append("imagem", formData.imagem);
      }

      await api.put(
        `/recipes/${id}`,
        data
      );

      alert("Receita atualizada!");

      navigate("/recipes");

    } catch (error) {

      console.error(error);

      alert("Erro ao atualizar");
    }
  }

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-12 col-md-10 col-lg-7">

          <div className="card shadow-lg border-0 rounded-4">

            <div className="card-body p-5">

              <h2 className="text-center fw-bold mb-4 text-warning">
                ✏️ Editar Receita
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Nome
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
                    Tempo
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
                    Alterar Imagem
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    className="form-control form-control-lg"
                    onChange={handleImageChange}
                  />

                </div>

                <div className="text-center mb-4">

                  <img
                    src={
                      formData.imagem instanceof File
                        ? URL.createObjectURL(formData.imagem)
                        : formData.imagem
                          ? `http://localhost:3001${formData.imagem}`
                          : "https://placehold.co/600x400/f1f1f1/999999?text=CookBoss"
                    }

                    alt="Preview da receita"

                    className="img-fluid rounded-4 shadow-sm"

                    style={{
                      maxHeight: "260px",
                      width: "100%",
                      objectFit: "cover",
                    }}

                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/600x400/f1f1f1/999999?text=CookBoss";
                    }}
                  />

                </div>

                <div className="d-grid gap-3">

                  <button className="btn btn-warning btn-lg fw-bold">
                    Salvar Alterações
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={removeImage}
                  >
                    Remover Imagem
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

export default EditRecipe;