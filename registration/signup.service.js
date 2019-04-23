var dbcon = require('../config/dbconfig');

exports.createUser = async (data) => {
    console.log("Inside signup service : create user");

    const { username, email, mobile, password, address } = data;
    try {
        let savedata = await dbcon.query("select register('" + username + "','" + email + "','" + mobile + "','" + password + "','" + address + "')");
        return savedata;
    } catch (error) {
        throw error;
    }
}