const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
const UserModel = require('./models/Users'); 


const app = express();
//turns it to json file
app.use(express.json());
//access backend from front end
app.use(cors());

//this is just local connection to the database
mongoose.connect('mongodb://localhost:27017/users');

app.post ('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email: email})
    .then(users => {
        if(users){
            if(users.password === password){
                res.json("success")
            }
            else{
                res.json("password incorrect")
            }
        }
        else{
            res.json("user not found")
        }
    }
 )
})

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

app.listen(3001, () => {
    console.log('Server is running...');
});