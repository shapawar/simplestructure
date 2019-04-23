const express = require('express');
const loginrouter = express.Router();
const jwt = require('jsonwebtoken');
const loginservice = require('./login.service');
const errorHandler = require('../errorcodes/errorhandler');
const secret = process.env.secret;

loginrouter.get('/', (req, res, next) => {
    res.render('login', { title: "welcome to compumatrice", msg: null });
});

loginrouter.post('/', errorHandler(async (req, res, next) => {
    console.log("inside user.js: sign in post");

    const { username, password } = req.body;

    var checkSignIn = await loginservice.checkLogin(req.body);
    if (checkSignIn[0].count == 1) {
        var token = jwt.sign({ id: username }, secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.render('main', { title: 'Wel-Come to Compumatrice', msg: 'User Login Successfully!!', jwtToken: token });
    } else {
        res.render('login', { title: 'Wel-Come to Compumatrice', msg: 'User Not Found PLZ Try Again!!' });
    }


}));

module.exports = loginrouter;