const UserModel = require('../models/user');

function AuthService() {
    const privateInfo = {
        username: "",
        oauth: {
            provider: "",
            id: ""
        },
        photo: "",
    };

    const accesser = {
        setUser: (user) => {
            privateInfo.username = user.username;
            privateInfo.photo = user.photo;
            privateInfo.oauth.provider = user.oauthprovider;
            privateInfo.oauth.id = user.oauthid;
        },
        getUser: () => privateInfo,
        getProvider: () => privateInfo.oauth.provider,
        getOauthId: () => privateInfo.oauth.id,

        findUserInDB: async function (_provider, _oauthid) {
            try {
                const user = await UserModel.findOne({ oauthprovider: _provider, oauthid: _oauthid });

                if (user === null || user === undefined) {
                    //  not found...
                    return null;
                } else {
                    // found...
                    return user;
                }

            } catch (err) {
                throw new Error("Couldn't find usermodel in mongodb, " + err);
            }
        },


        setUserInDB: async function (user) {
            try {
                const { provider } = user;
                const { sub } = user._json;


                let recode = await this.findUserInDB(provider, sub);

                if (!recode) {
                    // isn't...
                    recode = await UserModel.create({
                        username: user._json.name,
                        oauthprovider: provider,
                        oauthid: sub,
                        photo: user._json.picture,
                    });

                }
                this.setUser(recode);
            } catch (err) {
                throw new Error("Couldn' set User model in mongodb, " + err);
            }
        },

    }

    return accesser;
}

module.exports = () => {
    return AuthService();
}