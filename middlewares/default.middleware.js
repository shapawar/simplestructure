'use strict';

const uuidv4 = require('uuid/v4');
const os = require('os');
const crypto = require('crypto');

const logger = require('../config/winston.logger.config');
const APIResponseMetadataModel = require('../models/apiresponse.metadata.model');

/**
 * Hash API server name
 */
function hashAPIServer() {
  try {
    //console.log("os.hostname()", os.hostname())
    const hash = crypto.createHash('sha256');
    hash.update(os.hostname());

    return hash.digest('hex');;
  } catch (e) {
    logger.error('hashAPIServer(): ' + e.message);

    throw e;
  }
};

// function hashAPIServerv2() {
//   try {
//     const hash = crypto.createHash('sha256');

//     hash.update('some data to hash');
//     console.log(hash.digest('hex'));
//   } catch (e) {
//     logger.error('hashAPIServer(): ' + e.message);

//     throw e;
//   }
// };

const apiServerHash = hashAPIServer();
//const apiServerHashv2 = hashAPIServerv2();

/**
 *
 * @param {*} req Express HTTP request object
 * @param {*} res Express HTTP response object
 * @param {*} next Express HTTP pipeline function
 */
module.exports = function (req, res, next) {
  try {
    // assign a unique id to this request and response
    const callGUID = uuidv4();

    req.evUniqueID = callGUID;
    res.locals.evUniqueID = callGUID;

    // create API response metadata object since we can setup initial information
    const respMeta = new APIResponseMetadataModel();

    respMeta.evUniqueID = callGUID;
    respMeta.requestURL = req.originalUrl;
    respMeta.apiServer = apiServerHash;
    respMeta.apiBuildVersion = process.env.npm_package_version || '--NOT AVAILABLE--';
    respMeta.requestTS = Date.now();
    respMeta.tasks = [];

    res.locals.apiMeta = respMeta;

    // pass to next
    logger.debug(`[${callGUID}] ${req.path}`);
    next();
  } catch (e) {
    logger.error('(default-middleware): ' + e.message);
    next(e);
  }
};