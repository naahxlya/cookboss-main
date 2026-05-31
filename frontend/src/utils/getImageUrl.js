const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3001";

export function getImageUrl(imagePath) {

  if (!imagePath) {

    return "https://placehold.co/600x400/f1f1f1/999999?text=CookBoss";
  }

  if (imagePath.startsWith("http")) {

    return imagePath;
  }

  return `${API_URL}${imagePath}`;
}