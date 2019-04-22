'use strict';

const moment = require('moment');
const SchemaObject = require('schema-object');

const TaskMetadataModel = require('./task.metadata.model');

const ErrorCodeSvc = require('../errorcodes/errorcodes.service');

/**
 * API response metadata object
 */
const APIResponseMetadataModel = new SchemaObject({
  "requestURL": String,
  "evUniqueID": String,
  "requestTS": Date,
  "elapsedTimeInMS": Number,
  "apiServer": String,
  "apiBuildVersion": String,
  "errCode": Number,
  "errMsg": String,
  "tasks": { "type": [TaskMetadataModel], "default": [] }
},
  {
    "methods": {
      "endMetaData": function (evUniqueID, errCode, errMessage) {
        // get error info
        const errInfo = ErrorCodeSvc.getErrorInformation(evUniqueID, errCode, errMessage);

        // set the task information
        this.elapsedTimeInMS = moment(Date.now()).diff(this.requestTS, 'milliseconds');
        this.errCode = errCode;
        this.errMsg =errMessage;
      }
    }
  });

module.exports = APIResponseMetadataModel;
