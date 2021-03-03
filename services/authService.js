const UserModel = require('../models/user');

class AuthService {
    // private member
    #user;

    constructor() {
        this.#user = {
            _id: "",
            oauth: {
                provider: "",
                id: ""
            },
            photo: ""
        };
    }

    setUser(user) {
        this.#user._id = user._id;
        this.#user.username = user.username;
        this.#user.oauth.provider = user.oauthprovider;
        this.#user.oauth.id = user.oauthid;
        this.#user.photo = user.photo;
    };

    getUser = () => this.#user;
    getProvider = () => this.#user.oauth.provider;
    getOauthId = () => this.#user.oauth.id;

    async searchOauthInDB(_provider, _oauthid) {
        try {
            const user = await UserModel.findOne({ oauthprovider: _provider, oauthid: _oauthid });

            if (user === null || user === undefined) {
                //  not found...
                return false;
            } else {
                // found...
                this.setUser(user);
                return true;
            }

        } catch (err) {
            throw err;
        }
    };
    async searchIdInDB(_id) {
        try {
            const user = await UserModel.findOne({ _id });
            if (user === null || user === undefined) {
                //  not found...
                return false;
            } else {
                // found...
                this.setUser(user);
                return true;
            }
        } catch (err) {
            throw err;
        }
    };

    async create(user) {
        try {
            const { provider } = user;
            const { name, picture, sub } = user._json;


            const result = await this.searchOauthInDB(provider, sub);
            let recode = undefined;

            if (!result) {
                // isn't...
                recode = await UserModel.create({
                    username: name,
                    oauthprovider: provider,
                    oauthid: sub,
                    photo: picture,
                });
                this.setUser(recode);
            }
        } catch (err) {
            throw err;
        }
    };
}

module.exports = AuthService;