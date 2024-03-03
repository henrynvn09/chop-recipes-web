// LogoutButton.js
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/logout', {}, { withCredentials: true })
        .then(result => {
            console.log(result);
            if (result.data.Logout) { 
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