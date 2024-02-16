import React from 'react'
import  '../Styles/Login.css'
const LoginPage = () => {
  return (
    <div className = "login-page">
        <img className = "macbook" src="/macbook.svg" alt=""/>
        <div className='login-setup'>
            <div className = "login-form">
                <div className='center-logo'>
                    <img src="/chopLogoBlack.svg" alt="" className='login-logo'/>
                </div>
                <form action="" >
                    <div className='email-password'>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='Enter Email' className="custom-input" />
                    </div>
                    <div className='email-password'>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='Enter Password' className="custom-input" />
                    </div>
                    <div className='centered-content'>
                        <button className='login-button'>Login</button>
                    </div>
                </form>
            </div>
            <div className = "sign-up">
                <p>Don't have an account? <a href="/signup">Sign up</a></p>
            </div>
        </div>
    </div>
  )
}

export default LoginPage