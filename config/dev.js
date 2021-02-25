
module.exports = {
    // server port 
    port: process.env.PORT || 5000,

    // secret 
    secrets: {
        cookie: process.env.COOKIE_SECRET,
        session: process.env.SESSION_SECRET
    },

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
        auth: '/auth'
    },
}

