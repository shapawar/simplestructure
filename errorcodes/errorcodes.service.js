'use strict';

const MODULENAME = 'ErrorCodesService';

/** 
 * Custom imports
*/
const logger = require('../config/winston.logger.config');
const GeneralErrors = require('./general.errorcodes.config');
const ErrorCodeModel = require('./errorcode.model');

let Errors = [];

/**
 * Initializes errors collection
 */
function initErrors() {
    const taskName = 'initErrors';

    try {

        Errors = Errors.concat(GeneralErrors);

        logger.debug(`[INIT] ${MODULENAME}(${taskName}): Errors.length=${Errors.length}`);
    } catch (e) {
        logger.error(`[INIT] ${MODULENAME}(${taskName}): ${e.message}`);
    }
};

// initiaize errors
initErrors();

/**
 * Returns error information
 * @param {*} evUniqueID EV unique request ID
 * @param {*} errCode Error code
 * @param {*} errMessage Error message that caller would like to use
 */
function getErrorInformation(evUniqueID, errCode, errMsg) {
    const taskName = 'getErrorInformation';

    try {
        // convert to int just in case errCode is not
        const eCode = parseInt(errCode);

        // get error info
        const filtered = Errors.filter((item) => {
            return (item.code === eCode);
        });

        if (filtered.length > 0) {
            const filteredItem = filtered[0];

            if (filteredItem.canOverrideMessage) {
                errMsg = errMsg || filteredItem.message;

                if (errMsg === '') {
                    errMsg = filteredItem.message;
                }
            } else {
                // use default message
                errMsg = filteredItem.message;
            }

            // build using model so that we can clone before making changes
            const errInfo = new ErrorCodeModel(filteredItem);
            errInfo.message = errMsg;

            return errInfo;
        } else {
            throw new Error(`Unknown error code: ${errCode}`);
        }
    } catch (e) {
        logger.error(`[${evUniqueID}] ${MODULENAME}(${taskName}): ${e.message}`);
        return { "code": 1, "message": 'Internal Error', "description": e.message, "type": 'ERROR' };
    }
};

/**
 * ErrorCodes service
 */
const ErrorCodesService = {
    "getErrorInformation": getErrorInformation
};

module.exports = ErrorCodesService;