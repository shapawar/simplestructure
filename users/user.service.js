'use strict';

const MODULENAME = 'userService';

const dbPool = require('../config/dbconfig');
const logger = require('../config/winston.config');


/**
 * 
 * @param {*} evUniqueID req unique id
 * @param {*} data req data
 */
const createUser = async (evUniqueID, data) => {
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

/**
 * 
 * @param {*} evUniqueID req unique id
 * @param {*} logdata req data
 */
const getEmployeeList = (evUniqueID) => {
    const taskName = 'getEmployeeList';

    try {
        logger.debug(`[${evUniqueID}] - ${MODULENAME}(${taskName})- QueryData: null`);

        return new Promise((resolve, reject) => {
            // query
            dbPool.connect((err, client, release) => {
                // exit if error
                if (err) {
                    logger.debug(`[${evUniqueID}] - ${MODULENAME}(${taskName})- ${qErr.stack}`);
                    logger.error(`[${evUniqueID}] -${MODULENAME}(${taskName}): CONN-ERR: ${err.message}`);
                    return reject(err);
                }

                client.query('select * from GetAllEmployee()', (qErr, res) => {
                    release();

                    if (qErr) {
                        logger.debug(`[${evUniqueID}] - ${MODULENAME}(${taskName})- ${qErr.stack}`);
                        logger.error(`[${evUniqueID}] - ${MODULENAME}(${taskName})- ${qErr.message}`);

                        return reject(qErr);
                    }
                    return resolve(res);
                    //client.end()
                });
            })
        })
    } catch (e) {
        logger.debug(`[${evUniqueID}] - ${MODULENAME}(${taskName})- ${err.stack}`);
        logger.error(`[${evUniqueID}] - ${MODULENAME}(${taskName})- ${err.message}`);
        throw e;
    }
}


/**
 * 
 * @param {*} evUniqueID req unique id
 * @param {*} userid req data
 */
const getUserbyID = async (evUniqueID, userid) => {

    const taskName = "getUserbyID";

    try {
        logger.debug(`[${evUniqueID}]-${MODULENAME} (${taskName}- queryData: ${userid})`);

        return new Promise((resolve, reject) => {
            dbPool.connect((err, client, release) => {
                if (err) {
                    logger.debug(`[${evUniqueID}]- ${MODULENAME} (${taskName}) -${err.stack}`);
                    logger.error(`[${evUniqueID}]- ${MODULENAME} (${taskName}) -${err.message}`);
                    return reject(err);
                }

                client.query("SELECT  * from getemployee('" + userid + "')", (qErr, result) => {
                    release();
                    if (qErr) {
                        logger.debug(`[${evUniqueID}] - ${MODULENAME}(${taskName})- ${qErr.stack}`);
                        logger.error(`[${evUniqueID}] - ${MODULENAME}(${taskName})- ${qErr.message}`);

                        return reject(qErr);
                    }
                    return resolve(result);
                });

            });
        });

    } catch (error) {
        logger.debug(`[${evUniqueID}]- ${MODULENAME} (${taskName}) -${error.stack}`);
        logger.error(`[${evUniqueID}]- ${MODULENAME} (${taskName}) -${error.message}`);
        throw error;
    }
}


/**
 * 
 * @param {*} evUniqueID req unique id
 * @param {*} data is req data
 */
const deleteuserbyID = async (evUniqueID, data) => {

    const taskName = "deleteuserbyID";
    try {
        logger.debug(`[${evUniqueID}]-${MODULENAME} (${taskName}- bodyParams: ${data})`);

        return new Promise((resolve, reject) => {
            dbPool.connect((err, client, release) => {

                if (err) {
                    logger.debug(`[${evUniqueID}]- ${MODULENAME} (${taskName}) -${err.stack}`);
                    logger.error(`[${evUniqueID}]- ${MODULENAME} (${taskName}) -${err.message}`);
                    return reject(err);
                }
                client.query("SELECT public.deleteuserbyid('" + data + "')", (qErr, response) => {
                    release();
                    if (qErr) {
                        logger.debug(`[${evUniqueID}]- ${MODULENAME} (${taskName}) -${qErr.stack}`);
                        logger.error(`[${evUniqueID}]- ${MODULENAME} (${taskName}) -${qErr.message}`);
                        return reject(qErr);
                    }
                    return resolve(response);
                });
            });
        })

    } catch (error) {
        logger.debug(`[${evUniqueID}]- ${MODULENAME} (${taskName}) -${error.stack}`);
        logger.error(`[${evUniqueID}]- ${MODULENAME} (${taskName}) -${error.message}`);
        throw error;
    }

}

/**
 * 
 * @param {*} evUniqueID req unique id
 * @param {*} data is req data
 */
const updateUser = async (evUniqueID, data) => {

    const taskName = 'updateUser';
    try {
        logger.debug(`[${evUniqueID}]-${MODULENAME} (${taskName} - bodyParams: ${JSON.stringify(data)})`);
        return new Promise((resolve, reject) => {

            dbPool.connect((err, client, release) => {
                if (err) {
                    logger.debug(`[${evUniqueID}]- ${MODULENAME} (${taskName}) -${err.stack}`);
                    logger.error(`[${evUniqueID}]- ${MODULENAME} (${taskName}) -${err.message}`);
                    return reject(err);
                }
                client.query("SELECT public.updateuser('" + data.username + "','" + data.address + "')", (qErr, result) => {
                    release();
                    if (qErr) {
                        logger.debug(`[${evUniqueID}]- ${MODULENAME} (${taskName}) -${qErr.stack}`);
                        logger.error(`[${evUniqueID}]- ${MODULENAME} (${taskName}) -${qErr.message}`);
                        return reject(qErr);
                    }
                    return resolve(result);
                });
            });
        })

    } catch (error) {
        logger.debug(`[${evUniqueID}]- ${MODULENAME} (${taskName}) -${error.stack}`);
        logger.error(`[${evUniqueID}]- ${MODULENAME} (${taskName}) -${error.message}`);
        throw error;

    }

};

/** 
 * user service 
*/
const userService = {
    getEmployeeList,
    createUser,
    getUserbyID,
    deleteuserbyID,
    updateUser
}

module.exports = userService;