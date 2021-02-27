const mongoose = require('mongoose');
const config = require('../config');

module.exports = async () => {
    try {
        const connection = await mongoose.connect(config.db_url, {
            useCreateIndex: true,
            useFindAndModify: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'Online-chat'
        });

        console.log("Successed connect mongoose")

    } catch (err) {
        throw new Error("Error : Coulnd't connect mongoose");
    }
}