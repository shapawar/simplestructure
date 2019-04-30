'use strict';

/** 
 * Express and third party imports
*/
const SchemaObject = require('schema-object');

/** 
 * Custom imports
*/
const SchemaCustomTypes = require('../shared/types.schemaobject');

/**
 * Error code model
 */
const ErrorCodeModel = new SchemaObject({
    "code": Number,
    "message": SchemaCustomTypes.TrimStringType,
    "description": SchemaCustomTypes.TrimStringType,
    "type": SchemaCustomTypes.TrimUpperCaseStringType,
    "canOverrideMessage": Boolean
});

module.exports = ErrorCodeModel;