/**
 * Common types for SchemaObject
 */
const moment = require('moment');

 /**
 * String type to auto trim string
 */
const TrimStringType = { 
    "type": String, 
    "getter": function(val) { 
        val = val || '';
        return val.trim();
    }
};

 /**
 * String type to auto trim string
 */
const TrimUpperCaseStringType = { 
    "type": String, 
    "getter": function(val) { 
        val = val || '';
        return val.trim().toUpperCase();
    }
};

 /**
 * String type to auto trim string
 */
const TrimLowerCaseStringType = { 
    "type": String, 
    "getter": function(val) { 
        val = val || '';
        return val.trim().toLowerCase();
    }
};

/**
 * Date type that only returns the date portion
 */
const DateOnlyType = {
    "type": Date,
    "getter": function(val) {
        if (val) {
            return moment(val).format('YYYY-MM-DD');
        } else {
            return null;
        }
    }
};


/**
 * Date time type rturns datetime in "YYYY-MM-DDTHH:mm:ss.SSSZ" format
 */
const DateTimeType = {
    "type": Date,
    "getter": function(val) {
        if (val) {
            return moment(val).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
        } else {
            return null;
        }
    }
};

/**
 * Number type that only returns the number
 */
const NumberType = {
    "type": Number
};

/**
 * Number type that only returns the number
 */
const BooleanType = {
    "type": Boolean
 }

const SchemaObjectCustomTypes = {
    "TrimStringType": TrimStringType,
    "DateOnlyType": DateOnlyType,
    "DateTimeType": DateTimeType,
    "TrimUpperCaseStringType": TrimUpperCaseStringType,
    "TrimLowerCaseStringType": TrimLowerCaseStringType,
    "NumberType": NumberType,
    "BooleanType": BooleanType
};
  
module.exports = SchemaObjectCustomTypes;