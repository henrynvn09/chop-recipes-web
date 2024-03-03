import React, {useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from '../Components/Navbar';
import axios from 'axios';

const ContactPage = () => {
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
        {message}
      </div>

    </div>
  );
}

export default ContactPage;