'use strict';

const MODULENAME = 'userService';

const dbPool = require('../config/dbconfig');
const logger = require('../config/winston.config');



// exports.createUser = async (data) => {
//     if (dbcon._connected === true && dbcon._connectionError === false) {
//         let logdata = data.logger;
//         logger.info(`[${logdata.evUniqueID}]- body: ${data.params} - URL:${logdata.originalUrl} ,(${logdata._startTime}): Inside userservice: create user`);

//         const { username, email, mobile, password, address } = data.params;
//         try {
//             let savedata = await dbcon.query("select register('" + username + "','" + email + "','" + mobile + "','" + password + "','" + address + "')");
//             return savedata;
//         } catch (error) {
//             throw error;
//         }
//     } else {
//         throw { message: "Database Connection Error" }
//     }
// }

/**
 * 
 * @param {*} evUniqueID req unique id
 * @param {*} logdata req data
 */
const getEmployeeList = (evUniqueID, logdata) => {
    const taskName = 'getEmployeeList';

    try {
        logger.debug(`[${evUniqueID}] - ${MODULENAME}(${taskName})- QueryData: ${JSON.stringify(logdata)}`);

        return new Promise((resolve, reject) => {
            // query
            dbPool.connect((err, client, release) => {
                // exit if error
                if (err) {
                    logger.error(`[${evUniqueID}] ${MODULENAME}(${taskName}): CONN-ERR: ${err.message}`);
                    return reject(err);
                }

                client.query('select * from GetAllEmployee()', (qErr, res) => {
                    release();

                    if (qErr) {
                        logger.debug(`[${evUniqueID}] - ${MODULENAME}(${taskName})- ${qErr.stack}`);
                        logger.error(`[${evUniqueID}] - ${MODULENAME}(${taskName})- ${qErr.message}`);

                        return reject(qErr);
                    }

                    resolve(res);
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



// exports.getUserbyID = async (userid) => {

//     if (dbcon._connected === true && dbcon._connectionError === false) {
//         let logdata = userid.loginfo;
//         logger.info(`[${logdata.evUniqueID}] - body: ${userid.data} - URL:${logdata.originalUrl} ,(${logdata._startTime}): inside  userservice: getUserbyID`);
//         try {
//             var userdata = await dbcon.query("SELECT  * from getemployee('" + userid.data + "')");
//             return userdata;
//         } catch (error) {
//             throw error;
//         }
//     } else {
//         throw { message: "Database Connection Error" }
//     }

// }

// exports.deleteuserbyID = async (data) => {

//     if (dbcon._connected === true && dbcon._connectionError === false) {
//         let logdata = data.loginfo;
//         logger.info(`[${logdata.evUniqueID}] - body: ${data.id} - URL:${logdata.originalUrl} ,(${logdata._startTime}): inside userservice: deleteuserbyID`);
//         try {
//             var deleteuser = await dbcon.query("SELECT public.deleteuserbyid('" + data.id + "')");
//             return deleteuser;
//         } catch (error) {
//             throw error;
//         }
//     } else {
//         throw { message: "Database Connection Error" }
//     }
// }

// exports.updateUser = async (data) => {

//     if (dbcon._connected === true && dbcon._connectionError === false) {
//         let logdata = data.loginfo;
//         logger.info(`[${logdata.evUniqueID}] - body: ${data.data.username} - URL:${logdata.originalUrl} ,(${logdata._startTime}): Inside userservice: updateUser`);
//         try {
//             const updateuser = await dbcon.query("SELECT public.updateuser('" + data.data.username + "','" + data.data.info + "')")
//             return updateuser;
//         } catch (error) {
//             throw error;
//         }
//     } else {
//         throw { message: "Database Connection Error" }
//     }

// }

/** 
 * user service 
*/
const userService = {
    getEmployeeList
}

module.exports = userService