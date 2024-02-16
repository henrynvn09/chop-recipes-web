import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ContactPage from './Pages/ContactPage';
import ErrorPage from './Pages/ErrorPage';
import UserPage from './Pages/UserPage';
import Navbar from './Components/Navbar';
import LoginPage from './Pages/LoginPage';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/contacts" element={<ContactPage/>} />
          <Route path="/user" element={<UserPage/>} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
