import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ContactPage from './Pages/ContactPage';
import ErrorPage from './Pages/ErrorPage';
import UserPage from './Pages/UserPage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import AboutPage from './Pages/AboutPage';  
import UploadPage from './Pages/UploadPage';
import Navbar from "./Components/Navbar";
import ViewRecipe from './Pages/viewPage';




function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar /> { /* Add Navbar component here so that no need to add this for every pages */ }
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/contacts" element={<ContactPage/>} />
          <Route path="/about" element={<AboutPage />} /> 
          <Route path="/upload-recipe" element={<UploadPage/>} />
          <Route path="/view-recipe" element={<ViewRecipe/>} />
          <Route path="/user" element={<UserPage/>} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
