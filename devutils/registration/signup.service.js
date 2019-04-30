
'use strict';

const MODULENAME = 'signupService';

const dbPool = require('../../config/dbconfig');
const logger = require('../../config/winston.logger.config');


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