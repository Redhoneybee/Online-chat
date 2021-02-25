const app = require('../index');
const { createServer } = require('http');
const config = require('../config');

const startServer = async () => {

    // loader
    await require('../loaders/index')(app);

    const server = createServer(app);

    // listen
    server.listen(config.port, () => {
        console.log(`listen...${config.port}`);
    });

    return server
}

const server = startServer();

