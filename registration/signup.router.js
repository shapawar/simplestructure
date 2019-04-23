'use strict';
const MODULENAME = 'signupRoute';


const express = require('express');
const signuprouter = express.Router();
const validators = require('../users/user.model');
const authservice = require('./signup.service');
const middlewareHandler = require('../errorcodes/errorhandler');
const logger = require('../config/winston.config');

signuprouter.get('/', (req,res,next) =>{
    const taskName = 'Signup Get';
    logger.debug(`[${req.evUniqueID}] - ${MODULENAME}(${taskName})- QueryData: Null`);
    res.render('signup', { title: 'Wel-Come to Compumatrice', msg: null });
});

signuprouter.post('/', middlewareHandler(async (req, res, next) => {


    const taskName='signup check';
    logger.debug(`[${req.evUniqueID}] - ${MODULENAME}(${taskName})- QueryData: ${JSON.stringify(req.body)}`);
    
    const { username, email, mobile } = req.body;
    var validform = validators.validate({ username, email, mobile });

    if (validform.error == null) {
        
        await authservice.createUser(req.evUniqueID,req.body);
        res.render('signup', { title: 'Wel-Come to Compumatrice', msg: 'data save successfully' });
    } else {
        res.render('signup', { title: 'Wel-Come to Compumatrice', msg: 'Invalid Field Please Check The All Field' });
    }

}));

module.exports = signuprouter;