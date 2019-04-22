const express = require('express');
const userroute = express.Router();
const paramValidator = require('./user.model');
const userservice = require('./user.service');
const middlewareHandler = require('../errorcodes/errorhandler');
const logger = require('../config/winston.config');

userroute.post('/', middlewareHandler(async (req, res, next) => {

  logger.info(`[${req.evUniqueID}] body: ${JSON.stringify(req.body)} - URL:${req.originalUrl} ,(${req._startTime}): Inside Users Route: create user`);

  const { username, email, mobile } = req.body;
  var validform = paramValidator.validate({ username, email, mobile });

  if (validform.error == null) {
    const loginfo = {
      evUniqueID: req.evUniqueID,
      originalUrl: req.originalUrl,
      _startTime: req._startTime
    }


    let savedata = await userservice.createUser({ params: req.body, logger: loginfo });
    res.status(200).json({ msg: 'data save successfully', data: savedata.rowCount });
  } else {
    res.status(403).json({ msg: 'Please check the all field' });
  }
}));


userroute.get('/', middlewareHandler(async (req, res, next) => {

  logger.info(`[${req.evUniqueID}] - URL:${req.originalUrl} ,(${req._startTime}): Inside User Ruoter: getEmployee list`);
  const loginfo = {
    evUniqueID: req.evUniqueID,
    originalUrl: req.originalUrl,
    _startTime: req._startTime
  }
  var data = await userservice.getEmployeeList(loginfo);
  res.status(200).json({ msg: 'Fetch listrecord successfully', data: data });

}));

userroute.get('/:id', middlewareHandler(async (req, res, next) => {

  logger.info(`[${req.evUniqueID}] body: ${JSON.stringify(req.params)} - URL:${req.originalUrl} ,(${req._startTime}): Inside User Route:Get user info by username`);
  const loginfo = {
    evUniqueID: req.evUniqueID,
    originalUrl: req.originalUrl,
    _startTime: req._startTime
  }

  const userdata = await userservice.getUserbyID({data:req.params.id,loginfo:loginfo});
  return res.status(200).json({ data: userdata.rows, msg: "user info get successfully" });
}));

userroute.delete('/:id', middlewareHandler(async (req, res, next) => {
  logger.info(`[${req.evUniqueID}] body: ${JSON.stringify(req.params)} - URL:${req.originalUrl} ,(${req._startTime}): Inside User Route:Delete user by username`);
 
  const loginfo = {
    evUniqueID: req.evUniqueID,
    originalUrl: req.originalUrl,
    _startTime: req._startTime
  }
  const deleteuser = await userservice.deleteuserbyID({id:req.params.id, loginfo:loginfo});
  return res.status(200).json({ data: deleteuser.rowCount, msg: "User delete Successfully" });
}));

userroute.put('/', middlewareHandler(async (req, res, next) => {


  logger.info(`[${req.evUniqueID}] body: ${JSON.stringify(req.body)} - URL:${req.originalUrl} ,(${req._startTime}): Inside User Route:Update user by flag`);
 const loginfo = {
    evUniqueID: req.evUniqueID,
    originalUrl: req.originalUrl,
    _startTime: req._startTime
  }

  const update = await userservice.updateUser({data:req.body,loginfo:loginfo});
  return res.status(200).json({ data: update.rowCount, msg: "User data updated successfully" });
}));


module.exports = userroute;

