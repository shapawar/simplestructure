#### This directory only used for development purpose to build new middleware.

## You can use this directory for your POC work and If you don't want to push your POC work in remote repo then you can ignore this by adding into .gitignore file


### Middleware
* Execute default and auth middleware before start any method execution. 
* middlewares are introduce  for initialize req parameter, error parameter and URL authentication etc.  before execution of any middleware.
* For every request are gone through this middleware.

##Default Middleware
* This middleware are userd for intialized error parameter like environment unique id, request URL, API version before execution of any methods. After successfull execution we are execute next middleware.

##Auth Middleware
* This middleware is used for handling api security.
* JWT configuration conde and token verify code are written by in this file.
* After default middleware we execute this middleware immediately.




