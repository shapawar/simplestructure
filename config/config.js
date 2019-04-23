'use strict';

/**
 * default configuration
 * 
 */

let config = {
    "development": {
        "CONSTRING": `postgress://${process.env.dbuser}:${process.env.dbpass}@${process.env.dbhost}:${process.env.dbport}/${process.env.dbname}`
    },
    "staging": {

    },
    "production": {

    }
}

let envConfig = config[process.env.NODE_ENV] || 'development';

Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key]
});



