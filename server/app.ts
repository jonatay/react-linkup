import 'reflect-metadata'; // this shim is required
require('dotenv').config();

import { createExpressServer } from 'routing-controllers';
import { RootController } from './RootController';
import { UserController } from './controllers/UserController';

import Rollbar = require('rollbar');
var rollbar = new Rollbar({
  accessToken: process.env.POST_SERVER_ITEM_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true
});

// log a generic message and send to rollbar
// rollbar.log('Hello world!');
// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  routePrefix: '/api',
  controllers: [RootController, UserController]
  // we specify controllers we want to use
});

// app.use(serveStatic('../client/build', { index: 'index.html' }));

// run express application on port 3000
app.listen(3000);
