'use strict';

const MODULENAME = 'userRouter';

const express = require('express');

const paramValidator = require('./user.model');

const userservice = require('./user.service');

const middlewareHandler = require('../../errorcodes/errorhandler');

const logger = require('../../config/winston.logger.config');


const userRoute = express.Router();

/* For user registration */
userRoute.post('/', middlewareHandler(async (req, res, next) => {
  const taskName = 'User Registration';

  logger.debug(`[${req.evUniqueID}] - ${MODULENAME}(${taskName})- QueryData: ${JSON.stringify(req.body)}`);

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

  const taskName = 'Get All Employee List';
  logger.debug(`[${req.evUniqueID}] - ${MODULENAME}(${taskName})- QueryData: ${JSON.stringify(req.body)}`);

  var data = await userservice.getEmployeeList(req.evUniqueID);

  res.status(200).json({ msg: 'Fetch record list successfully', data: data.rows });

}));

/* Fetch  employee details  using username*/
userRoute.get('/:id', middlewareHandler(async (req, res, next) => {
  const taskName = 'Get Employee Deatils';

  logger.debug(`[${req.evUniqueID}] - ${MODULENAME}(${taskName})- QueryData: ${JSON.stringify(req.params)}`);

  const userdata = await userservice.getUserbyID(req.evUniqueID, req.params.id);
  return res.status(200).json({ data: userdata.rows, msg: "user info get successfully" });

}));


/* Delete  employee  */
userRoute.delete('/:id', middlewareHandler(async (req, res, next) => {

  const taskName = 'Delete Employee';
  logger.debug(`[${req.evUniqueID}] - ${MODULENAME}(${taskName})- QueryData: ${JSON.stringify(req.params)}`);

  const deleteuser = await userservice.deleteuserbyID(req.evUniqueID, req.params.id);
  return res.status(200).json({ data: deleteuser.rowCount, msg: "User delete Successfully" });
}));


/* Update  employee  */
userRoute.put('/', middlewareHandler(async (req, res, next) => {
  const taskName = 'Update Employee';

  logger.debug(`[${req.evUniqueID}] - ${MODULENAME}(${taskName})- QueryData: ${JSON.stringify(req.body)}`);

  const update = await userservice.updateUser(req.evUniqueID, req.body);

  return res.status(200).json({ data: update.rowCount, msg: "User data updated successfully" });
}));


module.exports = userRoute;



