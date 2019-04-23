'use strict';

/**
 * default configuration
 * 
 */

let config = {
    "development": {
        "connString": 'postgress://postgres:admin2518@localhost:5432/nodees5'
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



