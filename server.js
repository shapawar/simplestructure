'use strict';

const MODULENAME = 'SERVER';

const express = require('express');
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const ejs = require('ejs');
const app = express();

const winston = require('./config/winston.config');

const APIResponseModel = require('./models/apiresponse.model');
const TaskMetaDataModel = require('./models/task.metadata.model');

const usersrouter = require('./users/user.route');
const userlogin = require('./login/login.route');
const usersignup = require('./registration/signup.router');

const apiRouter = express.Router();

// add new token to morgan
morgan.token('evuniqueid', function (req) {
  return req.evUniqueID || '--NOT AVAILABLE--';
});

// overriding 'combined' to include evUniqueID
app.use(morgan('[:evuniqueid] :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', { stream: winston.stream }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');

//middlewares
app.use(require('./middlewares/default.middleware'));
app.use(require('./middlewares/auth.middleware'));

// root route
app.use(`/${process.env.APIVERSION}`, apiRouter);
apiRouter.use(`/errorcodes`, apiRouter);
apiRouter.use(`/users`, usersrouter);
apiRouter.use('/login',userlogin);
app.use('/',userlogin);
apiRouter.use('/registration',usersignup);

// default ping
apiRouter.get('/ping', (req, res) => {
  const taskName = '/ping';

  let httpRetVal = 200; //default

  // create response and task
  const apiResp = new APIResponseModel();
  let task = TaskMetaDataModel.createTask('/ping', 'HEALTHCHECK');

  try {
    winston.debug(`[${req.evUniqueID}] (${taskName}) - PING`);

    // add metadata task
    apiResp.metadata = res.locals.apiMeta; // from default middleware
    task = apiResp.metadata.tasks[apiResp.metadata.tasks.push(task) - 1]; // SchemaObject array clones the object - so get the reference back

    // end task
    task.endTask();

    apiResp.metadata.endMetaData(req.evUniqueID, 0, 'OK');
  } catch (e) {
    // error
    httpRetVal = 400;
    winston.error(`[${req.evUniqueID}] (${taskName}) - ${e.message}`);

    apiResp.metadata.endMetaData(req.evUniqueID, 1, e.message);
  } finally {
    res.status(httpRetVal).send(apiResp);
  }
});

// additional route for development use only
if (process.env.NODE_ENV === 'development') {
};

/**
 * Trap undefined routes
 */
app.all('*', function (req, res) {
  const taskName = 'undefined-route';
  winston.debug(`[${req.evUniqueID}] (${taskName}) - Endpoint not found`);

  let httpCode = 200;

  // response object
  const apiResp = new APIResponseModel();

  try {
    apiResp.metadata = res.locals.apiMeta;
    apiResp.metadata.endMetaData(req.evUniqueID, 4, 'Endpoint not found');

    httpCode = 404;
  } catch (e) {
    apiResp.metadata.endMetaData(req.evUniqueID, 1, e.message);

    httpCode = 500;

    winston.error(`[${req.evUniqueID}] (${taskName}): ${e.message}`);
  } finally {
    res.status(httpCode).send(apiResp);
  }
});

/**
 * Error handler
 */
app.use(function (e, req, res, next) {
  const debugName = 'Error-Middleware';

  // response object
  const apiResp = new APIResponseModel();

  apiResp.metadata = res.locals.apiMeta;
  apiResp.metadata.endMetaData(req.evUniqueID, 1, e.message);

  winston.error(`[${req.evUniqueID}] ${MODULENAME}(${debugName}): ${e.message}`);
  res.status(500).send(apiResp);
});

module.exports = app;
