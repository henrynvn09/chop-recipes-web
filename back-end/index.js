const express = require('express');
const cors = require("cors");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const UserModel = require('./models/Users'); 

require("dotenv").config({ path: "./config.env"});



const app = express();
//turns it to json file
app.use(express.json());

//access backend from front end
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true
    }
));
app.use(cookieParser());

MONGODB = process.env.MONGODB_URI

// const mongoose = require('mongoose');
mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected…'))
  .catch(err => console.log(err));


app.post ('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(users => {
        if(users){
            if(users.password === password){
                const accessToken = jwt.sign({email: email}, "jwt-access-token-secret-key", {expiresIn: "1m"})
                const refreshToken = jwt.sign({email: email}, "jwt-refresh-token-secret-key", {expiresIn: "2m"})
                res.cookie('accessToken',accessToken,{maxAge:60000})
                res.cookie('refreshToken',refreshToken,{maxAge:300000, httpOnly: true, secure: true, sameSite: 'strict'})
                return res.json({Login: true})
            }
            else{
                res.json({Login: false, message: "password incorrect"})
            }
        }
        else{
            res.json("user not found")
        }
    }
 )
})

app.post('/logout', (req, res) => { // Make sure to include both req and res here
    // Clear the accessToken cookie
    res.clearCookie('accessToken', {httpOnly: true, secure: true, sameSite: 'strict'});
    // Clear the refreshToken cookie
    res.clearCookie('refreshToken', {httpOnly: true, secure: true, sameSite: 'strict'});

    return res.json({Logout: true, message: "Successfully logged out"});
});

//req.body is the data that is being sent to the server
app.post('/signup', (req, res) => {
    UserModel.findOne({email: req.body.email})
    .then(users => {
        if(users){
            res.json("user already exists")
        }
        else{
            UserModel.create(req.body)
            .then(users => res.json(users))
            .catch(err => res.json(err))
        }
    })
})

const verifyUser = (req, res, next) => {
    const accessToken = req.cookies.accessToken
    if(!accessToken){
        if(renewToken(req,res)){
            next();
        }
    } else{
        jwt.verify(accessToken, "jwt-access-token-secret-key", (err,decoded) => {
            if(err){
                return res.json({valid: false, message: "user not authorized"})
            }
            else{
                req.email=decoded.email;
                next();
            }
        })
    }
}


const renewToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken
    let exist = false;
    if(!refreshToken){
        return res.json({valid: false, message: "user not authorized"})
    } else{
        jwt.verify(refreshToken, "jwt-refresh-token-secret-key", (err,decoded) => {
            if(err){
                return res.json({valid: false, message: "Invalid Refresh"})
            }
            else{
                const accessToken = jwt.sign({email: decoded.email}, "jwt-access-token-secret-key", {expiresIn: "1m"})
                res.cookie('accessToken',accessToken,{maxAge:60000})
                exist = true;  
            }
        })
    }
    return exist;
}

app.get('/verify', verifyUser, (req, res) => {
    return res.json({valid: true, message: "auhorized"})
});

app.listen(3001, () => {
    console.log('Server is running...');
});

