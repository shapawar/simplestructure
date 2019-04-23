const pg = require('pg');
var constring = process.env.connString;
const client = new pg.Client(constring);

console.log("constring", constring)
client.connect((err, client, data) => {
    if (err) {
        console.log(`Error in connecting db`);
        return console.dir(err);

    } else {
        console.log(`Database connection successfully!!`);
    }

});

module.exports = client;