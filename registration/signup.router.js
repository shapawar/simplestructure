const express = require('express');
const signuprouter = express.Router();

const validators = require('../users/user.model');
const authservice = require('./signup.service');
const middlewareHandler = require('../errorcodes/errorhandler');

signuprouter.get('/', (req,res,next) =>{
    res.render('signup', { title: 'Wel-Come to Compumatrice', msg: null });
});

signuprouter.post('/', middlewareHandler(async (req, res, next) => {
    console.log("inside signup Controller: signUp");

    const { username, email, mobile } = req.body;
    var validform = validators.validate({ username, email, mobile });

    if (validform.error == null) {
        
        await authservice.createUser(req.body);
        res.render('signup', { title: 'Wel-Come to Compumatrice', msg: 'data save successfully' });
    } else {
        res.render('signup', { title: 'Wel-Come to Compumatrice', msg: 'Invalid Field Please Check The All Field' });
    }

}));

module.exports = signuprouter;