

function AuthService() {
    const privateInfo = {
        username: "",
        photo: "",
        token: ""
    };

    const accesser = {
        setUser: (user) => {
            privateInfo.username = user.profile._json.name;
            privateInfo.photo = user.profile._json.picture;
            privateInfo.token = user.accessToken;
        },
        getToken: () => this.token,
        getUser: () => privateInfo
    }

    return accesser;
}

module.exports = () => {
    return AuthService();
}