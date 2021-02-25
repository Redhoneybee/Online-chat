
module.exports = {
    // server port 
    port: process.env.PORT || 5000,

    // secret 
    secrets: {
        cookie: process.env.COOKIE_SECRET,
        session: process.env.SESSION_SECRET
    }
}

