const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const crossOrigin = require("./lib/cross.origin")

module.exports = {
    bodyParser,
    cookieParser,
    compression,
    crossOrigin
}