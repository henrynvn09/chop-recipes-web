import React from "react";
import Navbar from "../Components/Navbar";
import '../Styles/global.css'
import ProtectedRoute from "../Components/ProtectedRoute";



function HomePage(){
    ProtectedRoute();
    return (
        <div>
            <Navbar />
            <div>
                Edmund is the best :)
            </div>
        </div>

    );
}

export default HomePage;