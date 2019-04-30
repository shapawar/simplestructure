
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

        const client = await dbPool.connect();

        let loginCheck = await client.query(`select count(*) from signup where username = '${username}' and password = '${password}' `);

        client.release();

        return loginCheck.rows;

    } catch (error) {
        logger.debug(`[${evUniqueID}] - ${MODULENAME}(${taskName})- ${error.stack}`);
        logger.error(`[${evUniqueID}] - ${MODULENAME}(${taskName})- ${error.message}`);

        throw error;
    }
}


