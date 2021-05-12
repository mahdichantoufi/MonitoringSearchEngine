const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const mw = require('expressjs-mw');
const upload = require('express-fileupload');

const middlewares = require('./middlewares');
const project = require('./constants/project');
const api = require('./api');

const app = express();
const allowList = [/\.*/];
app.use(mw.crossOrigin.allowedOrigin(allowList));
app.use(helmet());
app.use(compression());
app.use(morgan('tiny'));
app.use(express.json());
app.use(upload());

app.get('/', (req, res) => {
  res.json({
    message: project.message,
  });
});

app.use('/'.concat(project.apiUrl), api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
