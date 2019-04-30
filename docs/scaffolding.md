## `Node Express Scoffolding for compumatrice's projects`

```
Node-Express-Scaffolding
├── www                       # Entry file
│   |──   bin                 
├── config                    # configuration files
    ├── config.json           
    ├── dbconfig.js  
    ├── winston.logger.config.js        
    └── ...                   
├── dbscript                  # DB scripts
├── devutils                  # For DEV utility(Only for development) 
    └──  ...               
├── docs                      # Docs files
├── errorcodes                # For custom error codes and messages configuration
    ├── errorcode.model.js  
    ├── errorcode.service.js 
    ├── general.errorcode.config.js       
    └── ...   
├── logs
    ├── all.logs.log          # Logging files
    └──  ... 
├── middleware                # Middleware files
    ├── authmiddleware       
    └──  ...                
├── models                    # Shared models directory
    ├──  apiresponse.metadata.model   
    └── ...                 
├──  ping                     # Ping route for helth check
    ├──  ping.route.js  
    ├──  ping.test.js 
    └── ...  
├── public                    # Store static images
├── secured                   # For security files       
├── shared                    # For shared files
├── package.json              # package.json files
├── README.md                 # README file
└── server.js                 # Server files where all required files imported 

```

## `Scaffolding in details`


## www: 
* This is the app entry file where create server and allow app to run on a port.

## config:
* This directory includes all config files related to application.

## dbscript:
* This dirctory used for store appilication tables query, functions, stored procedures, triggers function and more information about application database.

## devutils:
 * This directory only used for development purpose to build and unit test block code quickly to minimize errors if any while developing main functionalities.

## docs:
* This directory includes all docs file with .md extention and app design documentation.

## errorcodes:
 * This file contains the error handler functions and also used for setting up error configuration that are used for handling error in whole applications.

## logs:
 * This file contains all auto generated log files by winston.

## middleware:
* It includes all middlewares that will usefull in whole application e.g. auth.middleware.js, default.middleware.js 

## model:
* This directory includes shared model that are used in whole application.

## ping:
* This directory includes ping route and that will be usefull for app helth check 

## public:
* This directory includes all static files , javascript files and css files that files are used in whole application. 

## secured:
* All security related stuff will go here.

## shared: 
* This directory includes shared files that will be used in whole application.

## package.json:
* This file includes dependencies, devDependencies, scripts to run app, and more.

## server.js:
* This file is useful for initializ component based routing, modules,  .
custom and default middlewares.










