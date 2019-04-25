'use strict';

/**
 * default configuration
 * 
 */

let config = {
    "development": {
        "CONSTRING": `postgress://nodees5:admin2518@localhost:5432/nodedapp`
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



