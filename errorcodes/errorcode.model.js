'use strict';

const SchemaObject = require('schema-object');

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