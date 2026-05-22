import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import {
  useState,
  useEffect,
} from "react";

import Navbar from "./components/Navbar";

import Footer from "./components/Footer";

import Home from "./pages/Home";

import Recipes from "./pages/Recipes";

import AddRecipe from "./pages/AddRecipe";

import EditRecipe from "./pages/EditRecipe";

import RecipeDetails from "./pages/RecipeDetails";

import Register from "./pages/Register";

import Login from "./pages/Login";

function AppContent() {

  const [search, setSearch] =
    useState("");

  const [user, setUser] =
    useState(null);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("");

  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  useEffect(() => {

    const storedUser =
      localStorage.getItem(
        "cookboss_user"
      );

    if (storedUser) {

      setUser(
        JSON.parse(storedUser)
      );
    }

  }, []);

  return (
    <>

      {!hideNavbar && (

        <Navbar
          search={search}
          setSearch={setSearch}
          user={user}
          setUser={setUser}
        />

      )}

      <div className="container mt-4">

        <Routes>

          <Route
            path="/login"
            element={
              <Login
                setUser={setUser}
              />
            }
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/"
            element={
              <Home
                setSelectedCategory={
                  setSelectedCategory
                }
              />
            }
          />

          <Route
            path="/recipes"
            element={
              <Recipes
                search={search}
                selectedCategory={
                  selectedCategory
                }
              />
            }
          />

          <Route
            path="/add"
            element={<AddRecipe />}
          />

          <Route
            path="/edit/:id"
            element={<EditRecipe />}
          />

          <Route
            path="/recipe/:id"
            element={
              <RecipeDetails />
            }
          />

        </Routes>

      </div>

      {!hideNavbar && <Footer />}

    </>
  );
}

function App() {

  return (
    <BrowserRouter>

      <AppContent />

    </BrowserRouter>
  );
}

export default App;