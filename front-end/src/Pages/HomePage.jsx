import React from "react";
import Navbar from "../Components/Navbar";
import '../Styles/global.css'
import ProtectedRoute from "../Components/ProtectedRoute";
import { useUser } from "../contexts/UserContent";


function HomePage(){
    const {userID} = useUser(); 
    ProtectedRoute();
    return (
        <div>
            <Navbar />
            <div>
                Edmund is the best :) {userID}
            </div>
        </div>

    );
}

export default HomePage;