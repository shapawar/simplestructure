const dbcon = require('../config/dbconfig');
const logger = require('../config/winston.config');

exports.createUser = async (data) => {
    if (dbcon._connected === true && dbcon._connectionError === false) {
        let logdata = data.logger;
        logger.info(`[${logdata.evUniqueID}]- body: ${data.params} - URL:${logdata.originalUrl} ,(${logdata._startTime}): Inside userservice: create user`);

        const { username, email, mobile, password, address } = data.params;
        try {
            let savedata = await dbcon.query("select register('" + username + "','" + email + "','" + mobile + "','" + password + "','" + address + "')");
            return savedata;
        } catch (error) {
            throw error;
        }
    } else {
        throw { message: "Database Connection Error" }
    }
}

exports.getEmployeeList = async (logdata) => {

    /* We handling database conection error when database is not connected and you have try to hit api */

    if (dbcon._connected === true && dbcon._connectionError === false) {
        logger.info(`[${logdata.evUniqueID}] - URL:${logdata.originalUrl} ,(${logdata._startTime}): Inside userservice: getEmployeeList`);
        let resultList = await dbcon.query('select * from GetAllEmployee()');
        return resultList.rows;
    } else {
        throw { message: "Database Connection Error" }
    }
}

exports.getUserbyID = async (userid) => {

    if (dbcon._connected === true && dbcon._connectionError === false) {
        let logdata = userid.loginfo;
        logger.info(`[${logdata.evUniqueID}] - body: ${userid.data} - URL:${logdata.originalUrl} ,(${logdata._startTime}): inside  userservice: getUserbyID`);
        try {
            var userdata = await dbcon.query("SELECT  * from getemployee('" + userid.data + "')");
            return userdata;
        } catch (error) {
            throw error;
        }
    } else {
        throw { message: "Database Connection Error" }
    }

}

exports.deleteuserbyID = async (data) => {

    if (dbcon._connected === true && dbcon._connectionError === false) {
        let logdata = data.loginfo;
        logger.info(`[${logdata.evUniqueID}] - body: ${data.id} - URL:${logdata.originalUrl} ,(${logdata._startTime}): inside userservice: deleteuserbyID`);
        try {
            var deleteuser = await dbcon.query("SELECT public.deleteuserbyid('" + data.id + "')");
            return deleteuser;
        } catch (error) {
            throw error;
        }
    } else {
        throw { message: "Database Connection Error" }
    }
}

exports.updateUser = async (data) => {

    if (dbcon._connected === true && dbcon._connectionError === false) {
        let logdata = data.loginfo;
        logger.info(`[${logdata.evUniqueID}] - body: ${data.data.username} - URL:${logdata.originalUrl} ,(${logdata._startTime}): Inside userservice: updateUser`);
        try {
            const updateuser = await dbcon.query("SELECT public.updateuser('" + data.data.username + "','" + data.data.info + "')")
            return updateuser;
        } catch (error) {
            throw error;
        }
    } else {
        throw { message: "Database Connection Error" }
    }

}