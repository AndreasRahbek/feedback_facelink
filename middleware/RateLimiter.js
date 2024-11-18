const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
    windowMs: 0.5*60*1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later'
})

module.exports = limiter