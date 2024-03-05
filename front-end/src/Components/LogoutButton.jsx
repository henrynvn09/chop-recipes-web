// LogoutButton.js
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContent';

const LogoutButton = () => {
    const navigate = useNavigate();
    const { setUserID } = useUser(); // Use the setUserID function from your context
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/logout', {}, { withCredentials: true })
        .then(result => {
            console.log(result);
            if (result.data.Logout) { 
                setUserID(null);
                localStorage.removeItem('userID');
                navigate('/'); 
            }
        })
        .catch(err => console.log(err));
    };

    return (
        <button onClick={handleSubmit}>
            LOG OUT
        </button>
    );
};

export default LogoutButton;