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

        let client = await dbPool.connect();
        let inserQuery = await client.query(`select register('${username}','${email}','${mobile}','${password}','${address}')`);
        client.release();
        return inserQuery;

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
const getEmployeeList = async(evUniqueID) => {
    const taskName = 'getEmployeeList';

    try {
        logger.debug(`[${evUniqueID}] - ${MODULENAME}(${taskName})- QueryData: null`);

        let client = await dbPool.connect();
        let userList = await client.query(`select * from GetAllEmployee()`);
        client.release();
        return userList;

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

        let client = await dbPool.connect();
        let findUser = await client.query(`SELECT  * from getemployee('${userid}')`);
        client.release();
        return findUser;

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

        let client = await dbPool.connect();
        let deleteUser = await client.query(`SELECT public.deleteuserbyid('${data}')`);
        client.release();
        return deleteUser;

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

        let client = await dbPool.connect();
        let updateData = await client.query(`SELECT public.updateuser('${data.username}','${data.address}')`)
        client.release();
        return updateData;

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