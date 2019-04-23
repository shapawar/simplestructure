'use strict';
const MODULENAME = 'userRouter';

const express = require('express');
const paramValidator = require('./user.model');
const userservice = require('./user.service');
const middlewareHandler = require('../errorcodes/errorhandler');
const logger = require('../config/winston.config');
const userRoute = express.Router();

<<<<<<< HEAD
/* For user registration */
userRoute.post('/', middlewareHandler(async (req, res, next) => {
  const taskName = 'User Registration';
  logger.debug(`[${req.evUniqueID}] - ${MODULENAME}(${taskName})- QueryData: ${JSON.stringify(req.body)}`);
=======
const userRoute = express.Router();


userRoute.post('/', middlewareHandler(async (req, res, next) => {

  logger.info(`[${req.evUniqueID}] body: ${JSON.stringify(req.body)} - URL:${req.originalUrl} ,(${req._startTime}): Inside Users Route: create user`);
>>>>>>> 412b24aaa3cca9a05b8b9fe0e9aa42d0fb498b4f

  const { username, email, mobile } = req.body;
  var validform = paramValidator.validate({ username, email, mobile });

  if (validform.error == null) {

    let savedata = await userservice.createUser(req.evUniqueID, req.body);
    res.status(200).json({ msg: 'data save successfully', data: savedata.rowCount });
  } else {
    logger.error(`[${req.evUniqueID}] - ${MODULENAME}(${taskName})- QueryData: ${JSON.stringify(req.body)}`);
    res.status(403).json({ msg: 'Please check the all field' });
  }

}));

/* Fetch all employee details */
userRoute.get('/', middlewareHandler(async (req, res, next) => {

<<<<<<< HEAD
  const taskName = 'Get All Employee List';
  logger.debug(`[${req.evUniqueID}] - ${MODULENAME}(${taskName})- QueryData: ${JSON.stringify(req.body)}`);

  var data = await userservice.getEmployeeList(req.evUniqueID);
  res.status(200).json({ msg: 'Fetch listrecord successfully', data: data.rows });

}));

/* Fetch  employee details  using username*/
userRoute.get('/:id', middlewareHandler(async (req, res, next) => {
  const taskName = 'Get Employee Deatils';
  logger.debug(`[${req.evUniqueID}] - ${MODULENAME}(${taskName})- QueryData: ${JSON.stringify(req.params)}`);

  const userdata = await userservice.getUserbyID(req.evUniqueID, req.params.id);
=======
userRoute.get('/', middlewareHandler(async (req, res, next) => {

  logger.info(`[${req.evUniqueID}] - URL:${req.originalUrl} ,(${req._startTime}): Inside User Ruoter: getEmployee list`);
  const loginfo = {
    evUniqueID: req.evUniqueID,
    originalUrl: req.originalUrl,
    _startTime: req._startTime
  }

  var data = await userservice.getEmployeeList(req.evUniqueID, loginfo);
  res.status(200).json({ msg: 'Fetch listrecord successfully', data: data });

}));

userRoute.get('/:id', middlewareHandler(async (req, res, next) => {

  logger.info(`[${req.evUniqueID}] body: ${JSON.stringify(req.params)} - URL:${req.originalUrl} ,(${req._startTime}): Inside User Route:Get user info by username`);
  const loginfo = {
    evUniqueID: req.evUniqueID,
    originalUrl: req.originalUrl,
    _startTime: req._startTime
  }

  const userdata = await userservice.getUserbyID({ data: req.params.id, loginfo: loginfo });
>>>>>>> 412b24aaa3cca9a05b8b9fe0e9aa42d0fb498b4f
  return res.status(200).json({ data: userdata.rows, msg: "user info get successfully" });

}));

<<<<<<< HEAD
/* Delete  employee  */
userRoute.delete('/:id', middlewareHandler(async (req, res, next) => {
  const taskName = 'Delete Employee';
  logger.debug(`[${req.evUniqueID}] - ${MODULENAME}(${taskName})- QueryData: ${JSON.stringify(req.params)}`);

  const deleteuser = await userservice.deleteuserbyID(req.evUniqueID, req.params.id);
  return res.status(200).json({ data: deleteuser.rowCount, msg: "User delete Successfully" });
}));

=======
userRoute.delete('/:id', middlewareHandler(async (req, res, next) => {
  logger.info(`[${req.evUniqueID}] body: ${JSON.stringify(req.params)} - URL:${req.originalUrl} ,(${req._startTime}): Inside User Route:Delete user by username`);

  const loginfo = {
    evUniqueID: req.evUniqueID,
    originalUrl: req.originalUrl,
    _startTime: req._startTime
  }
  const deleteuser = await userservice.deleteuserbyID({ id: req.params.id, loginfo: loginfo });
  return res.status(200).json({ data: deleteuser.rowCount, msg: "User delete Successfully" });
}));

userRoute.put('/', middlewareHandler(async (req, res, next) => {
>>>>>>> 412b24aaa3cca9a05b8b9fe0e9aa42d0fb498b4f

/* Update  employee  */
userRoute.put('/', middlewareHandler(async (req, res, next) => {
  const taskName = 'Update Employee';
  logger.debug(`[${req.evUniqueID}] - ${MODULENAME}(${taskName})- QueryData: ${JSON.stringify(req.body)}`);

<<<<<<< HEAD
  const update = await userservice.updateUser(req.evUniqueID, req.body);
=======
  logger.info(`[${req.evUniqueID}] body: ${JSON.stringify(req.body)} - URL:${req.originalUrl} ,(${req._startTime}): Inside User Route:Update user by flag`);
  const loginfo = {
    evUniqueID: req.evUniqueID,
    originalUrl: req.originalUrl,
    _startTime: req._startTime
  }

  const update = await userservice.updateUser({ data: req.body, loginfo: loginfo });
>>>>>>> 412b24aaa3cca9a05b8b9fe0e9aa42d0fb498b4f
  return res.status(200).json({ data: update.rowCount, msg: "User data updated successfully" });
}));


module.exports = userRoute;
<<<<<<< HEAD


=======
>>>>>>> 412b24aaa3cca9a05b8b9fe0e9aa42d0fb498b4f

