'use strict';

const MODULENAME = 'SERVER';

/** 
 * Express and third party imports
*/
const express = require('express');
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const swaggerTools = require('swagger-tools');

/** 
 * Custom imports
*/
const logger = require('./config/winston.logger.config');

const APIResponseModel = require('./models/apiresponse.model');
const TaskMetaDataModel = require('./models/task.metadata.model');

const usersrouter = require('./devutils/users/user.route');
const userlogin = require('./devutils/login/login.route');
const usersignup = require('./devutils/registration/signup.router');
const pingRoute = require('./ping/ping.route');

const swaggerSpec = require('./swagger.json');

const app = express();

const apiRouter = express.Router();

// add new token to morgan
morgan.token('evuniqueid', function (req) {
  return req.evUniqueID || '--NOT AVAILABLE--';
});

// overriding 'combined' to include evUniqueID
app.use(morgan('[:evuniqueid] :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', { stream: logger.stream }));
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
apiRouter.use(`/ping`, pingRoute);

swaggerTools.initializeMiddleware(swaggerSpec, (swaggerMiddleware) => {
  swaggerSpec.basePath = `/${process.env.APIVERSION}`;
  apiRouter.use(swaggerMiddleware.swaggerUi({
    apiDocs: `/api-docs`,
    swaggerUi: `/docs`
  }));

  logger.info(`Swagger UI is serving at: /${process.env.APIVERSION}/docs`);
});

// additional route for development use only
if (process.env.NODE_ENV === 'development') {
  apiRouter.use(`/users`, usersrouter);
  apiRouter.use('/login', userlogin);
  apiRouter.use('/registration', usersignup);
};

/**
 * Trap undefined routes
 */
app.all('*', function (req, res) {
  const taskName = 'undefined-route';
  logger.debug(`[${req.evUniqueID}] (${taskName}) - Endpoint not found`);

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

    logger.error(`[${req.evUniqueID}] (${taskName}): ${e.message}`);
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

  logger.error(`[${req.evUniqueID}] ${MODULENAME}(${debugName}): ${e.message}`);

  res.status(500).send(apiResp);
});

module.exports = app;
