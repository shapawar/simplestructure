'use strict';

const SchemaObject = require('schema-object');

const APIResponseMetadataModel = require('./apiresponse.metadata.model');

/**
 * Base response object
 */
const APIResponseModel = new SchemaObject({
    "metadata": APIResponseMetadataModel
});

module.exports = APIResponseModel;