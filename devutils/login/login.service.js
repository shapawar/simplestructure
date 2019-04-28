
'use strict';
const MODULENAME = 'loginService'
const dbPool = require('../../config/dbconfig');
const logger = require('../../config/winston.logger.config');



/**
 * 
 * @param {*} evUniqueID req unique id
 * @param {*} data req data
 */
exports.checkLogin = async (evUniqueID, data) => {
    const taskName = 'createUser';

    try {

        logger.debug(`[${evUniqueID}] - ${MODULENAME}(${taskName})- QueryData: ${JSON.stringify(data)}`);
        const { username, password } = data;

        return new Promise((resolve, reject) => {

            dbPool.connect((err, client, release) => {

                if (err) {
                    logger.debug(`[${evUniqueID}] - ${MODULENAME}(${taskName})- ${err.stack}`);
                    logger.error(`[${evUniqueID}] - ${MODULENAME}(${taskName}): CONN-ERR: ${err.message}`);
                    return reject(err);
                }

                client.query("select count(*) from signup where username = '" + username + "' and password = '" + password + "' ", (qErr, result) => {
                    release();
                    if (qErr) {
                        logger.debug(`[${evUniqueID}] - ${MODULENAME}(${taskName})- ${qErr.stack}`);
                        logger.error(`[${evUniqueID}] - ${MODULENAME}(${taskName})- ${qErr.message}`);

                        return reject(qErr);
                    }
                    return resolve(result.rows);
                });
            })
        });
    } catch (error) {
        logger.debug(`[${evUniqueID}] - ${MODULENAME}(${taskName})- ${error.stack}`);
        logger.error(`[${evUniqueID}] - ${MODULENAME}(${taskName})- ${error.message}`);
        throw error;
    }
}


