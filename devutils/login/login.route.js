'use strict';
const MODULENAME = 'loginRoute'
const express = require('express');
const loginrouter = express.Router();
const jwt = require('jsonwebtoken');
const loginservice = require('./login.service');
const errorHandler = require('../../errorcodes/errorhandler');
const logger = require('../../config/winston.logger.config');

loginrouter.get('/', (req, res, next) => {
    const taskName = 'Login Get';
    logger.debug(`[${req.evUniqueID}] - ${MODULENAME}(${taskName})- QueryData: Null`);
    res.render('login', { title: "welcome to compumatrice", msg: null });
});

loginrouter.post('/', errorHandler(async (req, res, next) => {
    const taskName = 'logincheck';
    logger.debug(`[${req.evUniqueID}] - ${MODULENAME}(${taskName})- QueryData: ${JSON.stringify(req.body)}`);
    const { username, password } = req.body;

    var checkSignIn = await loginservice.checkLogin(req.evUniqueID, req.body);
    if (checkSignIn[0].count == 1) {
        var token = jwt.sign({ id: username }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.render('main', { title: 'Wel-Come to Compumatrice', msg: 'User Login Successfully!!', jwtToken: token });
    } else {
        res.render('login', { title: 'Wel-Come to Compumatrice', msg: 'User Not Found PLZ Try Again!!' });
    }


}));

module.exports = loginrouter;