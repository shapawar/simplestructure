'use strict';

/** 
 * Express and third party imports
*/
const moment = require('moment');
const SchemaObject = require('schema-object');

/**
 * Task metadatamodel
 */
const TaskMetadataModel = new SchemaObject({
    "name": { "type": String, "default": '--NOT SPECIFIED--' },
    "info": { "type": String, "default": '--NOT SPECIFIED--' },
    "startTS": { "type": Date, "default": Date.now() },
    "elapsedTimeInMS": { "type": Number, "default": -1 }
}, {
    "strict": true,
    "constructors": {
        "createTask": function (name, info) {
            this.name = name;
            this.info = info;
            this.startTS = Date.now();
            this.elapsedTimeInMS = -1;
        }
    },
    "methods": {
        "endTask": function() {
            this.elapsedTimeInMS = moment(Date.now()).diff(this.startTS, 'milliseconds');
        }
    }
});

module.exports = TaskMetadataModel;