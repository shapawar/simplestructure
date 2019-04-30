'use strict';

/** 
 * Express and third party imports
*/
const SchemaObject = require('schema-object');

/** 
 * Custom imports
*/
const APIResponseMetadataModel = require('./apiresponse.metadata.model');

/**
 * Base response object
 */
const APIResponseModel = new SchemaObject({
    "metadata": APIResponseMetadataModel
});

module.exports = APIResponseModel;