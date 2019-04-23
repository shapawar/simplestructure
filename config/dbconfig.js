'use strict';

const { Pool } = require('pg');

/**
 * Connection pool for MDM database
 */
const dbPool = new Pool({
    "connectionString": process.env.CONSTRING,
    "max": 10
});

module.exports = dbPool;