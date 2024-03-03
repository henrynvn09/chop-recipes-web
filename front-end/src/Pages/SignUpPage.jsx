import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/Signup.css'
import  AutoLogout  from '../Components/AutoLogout'
const SignUpPage = () => {
    AutoLogout();
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [userExists, setUserExists] = useState(false)
    //for resetting the useEffect
    const [popupKey, setPopupKey] = useState(0);

    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        // Add the fade-in class after the component mounts
        setFadeIn(true);
    }, []);

    useEffect(() => {
        // Set a timeout to reset userExists after 3 seconds (adjust as needed)
        const timer = setTimeout(() => {
            setUserExists(false);
        }, 3000); // 3000 milliseconds (3 seconds)

        // Clean up the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [userExists]);

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/signup', {name,email,password})
        .then(result => {
            if (result.data === "user already exists")
            {
               setUserExists(true)
               setPopupKey(prevKey => prevKey + 1);
            }
            else{
                console.log(result)
                navigate('/')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className={`center-page ${fadeIn ? 'fade-in' : ''}`}>
            <div className= 'signin-setup'>
                <div className = "signup-form">
                    <div className='center-logo'>
                        <img src="/chopLogoBlack.svg" alt="" className='login-logo'/>
                    </div>
                    <form onSubmit={handleSubmit} >
                        <div className='email-password'>
                            <label htmlFor="name">Name</label>
                            <input type="name" placeholder='Enter Name' className="custom-input" onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className='email-password'>
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder='Enter Email' className="custom-input" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className='email-password'>
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder='Enter Password' className="custom-input" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div key={popupKey} className={`popup ${userExists ? 'show' : ''}`}>
                            <p>User already exists!</p>
                        </div>
                        <div className='centered-content'>
                            <button className='login-button'>Register</button>
                        </div>
                    </form>
                </div>
                <div className = "sign-up">
                    <p>Already have an account? <a href="/">Login</a></p>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage