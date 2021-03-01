
module.exports = {
    // server port 
    port: process.env.PORT || 5000,

    // secret 
    secrets: {
        cookie: process.env.COOKIE_SECRET,
        session: process.env.SESSION_SECRET
    },


    //  mongo db url
    db_url: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.bd9t4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,

    // Oauth info
    oauths: {
        // google 
        google: {
            id: process.env.GOOGLE_CLIENT_ID,
            secret: process.env.GOOGLE_CLIENT_SECRET,
            callback: process.env.GOOGLE_CALLBACK_URL
        }
    },

    // routes
    routes: {
        index: '/',
        auth: '/auth',
        room: '/room'
    },
}

