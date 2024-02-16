import React from 'react';
import {Link} from 'react-router-dom';

export default function NavBar() {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {/* <ul> */}
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/inventory">Recipes Inventory</Link>
                </li>
                <li>
                    <Link to="/mealplan">Meal Plan</Link>
                </li>
                <li>
                    <Link to="/uploadRecipe">Upload a Recipe</Link>
                </li>
            {/* </ul> */}
        </div>
    );
}