
'use strict';

const MODULENAME = 'signupService';

const dbPool = require('../config/dbconfig');
const logger = require('../config/winston.config');


/**
 * 
 * @param {*} evUniqueID req unique id
 * @param {*} data req data
 */
exports.createUser = async (evUniqueID, data) => {
    const taskName = 'createUser';

    try {

        logger.debug(`[${evUniqueID}] - ${MODULENAME}(${taskName})- QueryData: ${JSON.stringify(data)}`);
        const { username, email, mobile, password, address } = data;

        return new Promise((resolve, reject) => {

            dbPool.connect((err, client, release) => {

                if (err) {
                    logger.debug(`[${evUniqueID}] - ${MODULENAME}(${taskName})- ${err.stack}`);
                    logger.error(`[${evUniqueID}] - ${MODULENAME}(${taskName}): CONN-ERR: ${err.message}`);
                    return reject(err);
                }

                client.query("select register('" + username + "','" + email + "','" + mobile + "','" + password + "','" + address + "')", (qErr, result) => {
                    release();
                    if (qErr) {
                        logger.debug(`[${evUniqueID}] - ${MODULENAME}(${taskName})- ${qErr.stack}`);
                        logger.error(`[${evUniqueID}] - ${MODULENAME}(${taskName})- ${qErr.message}`);

                        return reject(qErr);
                    }
                    return resolve(result);
                });
            })
        });
    } catch (error) {
        logger.debug(`[${evUniqueID}] - ${MODULENAME}(${taskName})- ${error.stack}`);
        logger.error(`[${evUniqueID}] - ${MODULENAME}(${taskName})- ${error.message}`);
        throw error;
    }
}