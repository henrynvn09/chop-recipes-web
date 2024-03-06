import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ContactPage from "./Pages/ContactPage";
import ErrorPage from "./Pages/ErrorPage";
import UserPage from "./Pages/UserPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import UploadPage from "./Pages/UploadPage";
import ViewRecipe from "./Pages/viewPage";
import LibraryRecipes from "./Pages/LibraryRecipes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/upload-recipe" element={<UploadPage />} />
          <Route path="/view-recipe/:recipe_id" element={<ViewRecipe />} />
          <Route path="/user/:profile_id" element={<UserPage />} />
          <Route path="/library" element={<LibraryRecipes />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
