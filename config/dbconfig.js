const pg = require('pg');
var constring = 'postgress://postgres:admin2518@localhost:5432/nodees5';
const client = new pg.Client(constring);

client.connect((err, client, data) => {
    if (err) {
        console.log(`Error in connecting db`);
        return console.dir(err);
        
    } else {
        console.log(`Database connection successfully!!`);
    }

});

module.exports = client;