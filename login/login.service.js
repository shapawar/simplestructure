const dbcon = require('../config/dbconfig');


exports.checkLogin = async (data) => {
    console.log("Inside apiservice : checkLogin");

    const { password, username } = data;
    try {
        let savedata = await dbcon.query("select count(*) from signup where username = '" + username + "' and password = '" + password + "' ");
        return savedata.rows;
    } catch (error) {
        throw error;
    }
}