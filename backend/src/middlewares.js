const ErrorTypes = [
  {
    name: 'ValidationError',
    message: 'ValidationError',
    status: 422,
  },
  {
    name: 'UniqueViolationError',
    message: 'UniqueViolationError',
    status: 422,
  },
];
function getErrorType(ErrorMessage) {
  return ErrorTypes.find((e) => e.name === ErrorMessage);
}

function notFound(req, res, next) {
  const error = new Error('Not found - '.concat(req.originalUrl));
  res.status(404);
  next(error);
}

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  const Error = getErrorType(error.message);
  let statusCode = 500;
  if (Error !== undefined) {
    statusCode = (res.statusCode === 200 ? Error.status : res.statusCode);
  } else {
    statusCode = (res.statusCode === 200 ? 500 : res.statusCode);
  }
  res.status(statusCode);
  res.json({
    status: statusCode,
    message: (error.message === '' ? (Error.message || 'ErrorHandler error') : error.message),
    stack: process.env.NODE_ENV === 'production' ? '' : error.stack,
  });
}

module.exports = {
  notFound,
  errorHandler,
};
