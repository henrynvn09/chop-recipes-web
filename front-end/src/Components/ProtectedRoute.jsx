import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
    const [message, setMessage] = useState()
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:3001/verify')
        .then(res => {
            if(res.data.valid){
                setMessage(res.data.message)
                console.log(message)
            } else{
                navigate('/')
            }
        })
        .catch(err => console.log(err))
      })
};


export default ProtectedRoute;