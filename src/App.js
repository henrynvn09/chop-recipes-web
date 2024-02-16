import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import NavBar from './components/navBar';
import Homepage from './components/homepage';
import Inventory from './pages/inventory';
import MealPlan from './pages/mealplan';
import UploadRecipe from './pages/uploadRecipe';



function App() {
  return (
    <div className = "App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Homepage />} ></Route>
          <Route path='/inventory' element={<Inventory />} ></Route>
          <Route path='/mealplan' element={<MealPlan />} ></Route>
          <Route path='/uploadRecipe' element={<UploadRecipe />} ></Route>
          <Route path='*' element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
