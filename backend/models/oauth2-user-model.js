const { Schema, model } = require('mongoose');

const oauthUser = new Schema({
    googleId: {
        required: false,
        type: String
    },
    twitterId: {
        required: false,
        type: String
    },
    githubId: {
        required: false,
        type: String
    },
    facebookId: {
        required: false,
        type: String
    },
    username: {
        required: true,
        type: String
    },
    avatar: {
        required: false,
        type: String
    }
});

module.exports = model('Oauth2User', oauthUser);
