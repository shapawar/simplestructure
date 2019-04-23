'use strict';

const { Pool } = require('pg');

// const constring = process.env.connString;
// const client = new pg.Client(constring);


/**
 * Connection pool for MDM database
 */
const dbPool = new Pool({
    "connectionString": process.env.CONSTRING,
    "max": 10
});

//console.log("constring", connString)
// client.connect((err, client, data) => {
//     if (err) {
//         console.log(`Error in connecting db`);
//         return console.dir(err);

//     } else {
//         console.log(`Database connection successfully!!`);
//     }

// });

module.exports = dbPool;