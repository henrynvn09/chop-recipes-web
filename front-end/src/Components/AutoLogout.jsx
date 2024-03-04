import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AutoLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        axios.post('http://localhost:5000/logout', {}, { withCredentials: true })
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err));
    }, [navigate]);

    // This component does not render anything
    return null;
};

export default AutoLogout;