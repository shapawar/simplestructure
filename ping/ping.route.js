'use strict';

const express = require('express');
//const winston = require('../config/winston.config');

const APIResponseModel = require('../models/apiresponse.model');
const TaskMetaDataModel = require('../models/task.metadata.model');

const pingRoute = express.Router();

// default ping
pingRoute.get('/', (req, res) => {
    const taskName = '/ping';

    let httpRetVal = 200; //default

    // create response and task
    const apiResp = new APIResponseModel();
    let task = TaskMetaDataModel.createTask('/ping', 'HEALTHCHECK');

    try {
        winston.debug(`[${req.evUniqueID}] (${taskName}) - PING`);

        // add metadata task
        apiResp.metadata = res.locals.apiMeta; // from default middleware
        task = apiResp.metadata.tasks[apiResp.metadata.tasks.push(task) - 1]; // SchemaObject array clones the object - so get the reference back

        // end task
        task.endTask();

        apiResp.metadata.endMetaData(req.evUniqueID, 0, 'Success');
        return res.status(httpRetVal).send(apiResp);
    } catch (e) {
        // error
        httpRetVal = 400;
        winston.error(`[${req.evUniqueID}] (${taskName}) - ${e.message}`);

        throw e;
    }
});

module.exports = pingRoute;