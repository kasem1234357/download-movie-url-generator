const logger = require('./logger')
const requestTime =require('./requestTime') 
const globalHandleError = require('./errorController')

module.exports = {
    logger,
    requestTime,
    globalHandleError,
}