import React from 'react'
import Navbar from '../Components/Navbar'
import UploadRecipe from '../Components/UploadRecipe'

import ProtectedRoute from '../Components/ProtectedRoute'
const AboutPage = () => {
    ProtectedRoute();
    return (
        <div>
            <Navbar />
            <div>
                <UploadRecipe />
            </div>
            
        </div>
    )
}

export default AboutPage