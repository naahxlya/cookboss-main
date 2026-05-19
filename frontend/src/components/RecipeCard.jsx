function RecipeCard({ recipe }) {
  return (
    <div className="card shadow-sm mb-3" style={{ width: "18rem" }}>
      <img
        src={recipe.imagem || "https://via.placeholder.com/300"}
        className="card-img-top"
        alt={recipe.nome}
      />

      <div className="card-body">
        <h5 className="card-title">{recipe.nome}</h5>
        <p>{recipe.categoria}</p>
        <p>⏱ {recipe.tempo}</p>
      </div>
    </div>
  );
}

export default RecipeCard;