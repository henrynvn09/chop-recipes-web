import React from 'react'
import Navbar from '../Components/Navbar'
import UploadRecipe from '../Components/UploadRecipe'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const AboutPage = () => {
    const [message, setMessage] = useState()
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/verify')
        .then(res => {
            if(res.data.valid){
                setMessage(res.data.message)
            } else{
                navigate('/')
            }
        })
        .catch(err => console.log(err))
      })
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