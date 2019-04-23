'use strict';

/**
 * Array of error codes (in the future, we can introduce localizations)
 *
 * code                 := Error code
 * message              := Default error message
 * description          := Default error description or hint
 * type                 := Error type ERROR, WARNING, INFO
 * canOverrideMessage   := True if caller can override the message, False otherwise
 */
const ErrorCodes = [
    { "code": 0, "message": 'OK', "description": 'Success', "type": 'SUCCESS', "canOverrideMessage": false },
    { "code": 1, "message": 'Internal Error', "description": 'Unexpected error encountered', "type": 'ERROR', "canOverrideMessage": true },
    { "code": 2, "message": 'Missing Input', "description": 'Missing one or more required parameters', "type": 'ERROR', "canOverrideMessage": true },
    { "code": 3, "message": 'Invalid Input', "description": 'Invalid input value(s)', "type": 'ERROR', "canOverrideMessage": true },
    { "code": 4, "message": 'Invalid URL', "description": 'URL not found', "type": 'ERROR', "canOverrideMessage": true },
    { "code": 5, "message": 'Invalid Configuration', "description": 'Invalid configuration value(s)', "type": 'ERROR', "canOverrideMessage": false }
];

module.exports = ErrorCodes;