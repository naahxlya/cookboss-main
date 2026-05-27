import {useState, useRef,} from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import categories from "../data/categories";

function AddRecipe() {

  const navigate = useNavigate();

  const fileInputRef =
  useRef(null);

  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    tempo: "",
    imagem: "",
    ingredientes: "",
    modoPreparo: "",
  });

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

    if (fileInputRef.current) {

      fileInputRef.current.value = "";
    }
  }

  const user = JSON.parse(
    localStorage.getItem(
      "cookboss_user"
     )
  );

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const data = new FormData();

      data.append(
        "user_id",
        user.id
      );

      data.append("nome", formData.nome);
      data.append("categoria", formData.categoria);
      data.append("tempo", formData.tempo);

      data.append(
        "ingredientes",
        formData.ingredientes
      );

      data.append(
        "modoPreparo",
        formData.modoPreparo
      );

      if (formData.imagem instanceof File) {
        data.append("imagem", formData.imagem);
      }

      await api.post(
        "/recipes",
        data
      );

      alert("Receita adicionada com sucesso!");

      navigate("/recipes");

    } catch (error) {

      console.error(error);

      alert("Erro ao adicionar receita");
    }
  }

  return (
    <div className="container py-1">

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

                  <select
                    name="categoria"
                    className="form-select form-select-lg"
                    value={formData.categoria}
                    onChange={handleChange}
                    required
                  >

                    <option value="" disabled>
                      Selecione uma categoria
                    </option>

                    {categories.map((category) => (

                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>

                    ))}

                  </select>

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
                    Ingredientes
                  </label>

                  <textarea
                    name="ingredientes"
                    className="form-control form-control-lg"
                    rows="5"
                    value={formData.ingredientes}
                    onChange={handleChange}
                    placeholder="Digite um ingrediente por linha"
                    required
                  />

                </div>

                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Modo de Preparo
                  </label>

                  <textarea
                    name="modoPreparo"
                    className="form-control form-control-lg"
                    rows="6"
                    value={formData.modoPreparo}
                    onChange={handleChange}
                    placeholder="Descreva o passo a passo da receita"
                    required
                  />

                </div>

                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Insira a Imagem
                  </label>

                <input
                  ref={fileInputRef}
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
                        : "https://placehold.co/600x400/f1f1f1/999999?text=CookBoss"
                    }

                    alt="Preview da receita"

                    className="img-fluid rounded-4 shadow-sm"

                    style={{
                      maxHeight: "260px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />

                </div>

                <div className="d-grid gap-3">

                  <button className="btn btn-warning btn-lg fw-bold">
                    Adicionar Receita
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

export default AddRecipe;