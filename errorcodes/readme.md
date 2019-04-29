# This directory only used for setting up error configuration.

### You can use this directory for your POC work and If you don't want to push your POC work in remote repo then you can ignore this by adding into .gitignore file

## Errorcodes component
* errorcode component contain following files for handling syntax error, user defind error etc.
 

1)errorcode.models.js
2)errorcode.service.js
3)errorHandler.js
4)general.errorcodes.config.js

## errorcode.service.js
 * This file contains the error handler functions and exported all functions from this module and call this function in error middleware functions.
 
 
 ## errorHandler.js
 * This file is used for handling try catch error . When async function generate any error /throw any error this file is responsible for handling those error and call error handler middleware.  

## general.errorcodes.config.js 
* This file contain all error code and exported this file from this module.
* We defined the error code as per the error status and assign specific code to that error.









