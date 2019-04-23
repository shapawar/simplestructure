'use strict';

const MODULENAME = 'AuthMiddleware';

const jwt = require('jsonwebtoken');

const logger = require('../config/winston.config');

const APIResponseModel = require('../models/apiresponse.model');
const TaskMetaDataModel = require('../models/task.metadata.model');

/**
 * Allowed paths to skip authorization
 */
const SKIPAUTH = [
    '/ping',
    '/login',
    '/registration',
    '/',
    '/apiutils/',
    'favicon.ico'
];

/**
 * Middleware to validated JWT and get client configurations
 * @param {*} req HTTP request
 * @param {*} res HTTP response
 * @param {*} next middleware NEXT() callback
 */
module.exports = function (req, res, next) {
    const taskName = 'middleware::auth';
    const evUniqueID = req.evUniqueID;

    // create response and task
    const apiResp = new APIResponseModel();
    let task = TaskMetaDataModel.createTask(`${taskName}`, 'Authentication layer');

    try {
        // check if requested path can skip authorization
        const urlPath = req.path.toLowerCase();

        let skipAuth = false;

        skipAuth = SKIPAUTH.find((item) => {
            return (urlPath.indexOf(item) !== -1);
        });

        if (skipAuth) {
            return next();
        }

        // add metadata task
        apiResp.metadata = res.locals.apiMeta; // from default middleware
        task = apiResp.metadata.tasks[apiResp.metadata.tasks.push(task) - 1]; // SchemaObject array clones the object - so get the reference back

        // get bearer token
        var token = null;

        if (req.headers['authorization']) {
            token = req.headers['authorization'];
        }

        if (token) {
            // verify JWT
            jwt.verify(token, process.env.secret, function (err, decoded) {
                // error
                if (err) {
                    logger.error(`[${evUniqueID}] ${MODULENAME}(${taskName}): ${err.message}`);

                    task.endTask();
                    apiResp.metadata.endMetaData(req.evUniqueID, 2, 'Unable to verify JWT');

                    return res.status(401).send(apiResp);
                }

                /* // convert to object
                const authData = new AuthPayloadModel(decoded);
                req.authData = authData;
                res.locals.authData = authData;

                if (authData.apiKey === '') {
                    logger.debug(`[${evUniqueID}] ${MODULENAME}(${taskName}): Missing API key`);

                    task.endTask();
                    apiResp.metadata.endMetaData(req.evUniqueID, 10, 'Missing API key');

                    return res.status(401).send(apiResp);
     */
                    req.decoded = decoded;
                    next();
                 
            });
        } else {
            logger.debug(`[${evUniqueID}] ${MODULENAME}(${taskName}): Missing AUTH BEARER token`);

            task.endTask();
            apiResp.metadata.endMetaData(req.evUniqueID, 14, 'Missing AUTH BEARER token');

            res.status(401).send(apiResp);
        }
    } catch (e) {
        logger.error(`[${evUniqueID}] ${MODULENAME}(${taskName}): ${e.message}`);

        task.endTask();
        apiResp.metadata.endMetaData(req.evUniqueID, 1, 'Unexpected error while authenticating request');

        res.status(500).send(apiResp);
    }
};