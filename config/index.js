const dotenv = require('dotenv');

const foundDotenv = dotenv.config();

if (foundDotenv.error) {
    throw new Error(`Couldn't find .env file`);
}


// NODE_ENV set 

process.env.NODE_ENV = process.NODE_ENV || 'development';


if (process.env.NODE_ENV === 'development') {
    module.exports = require('./dev');
} else if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
}