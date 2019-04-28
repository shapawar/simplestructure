'use strict';

const MODULENAME = "pingRoutes"

/** 
 * Express and third party imports
*/
const express = require('express');

/** 
 * Custom imports
*/
const logger = require('../config/winston.logger.config');

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
        logger.debug(`[${req.evUniqueID}] (${taskName}) - PING`);

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
        logger.error(`[${req.evUniqueID}] (${taskName}) - ${e.message}`);

        throw e;
    }
});

module.exports = pingRoute;