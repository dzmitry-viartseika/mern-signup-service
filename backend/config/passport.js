const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require('mongoose');
const User = require('../models/user-model');

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.OAUTH2_GOOGLE_CLIENT_ID,
                clientSecret: process.env.OAUTH2_GOOGLE_CLIENT_SECRET,
                callbackURL: 'auth/google/callback',

            },
            accessToken => {
                console.log("access token: ", accessToken);
            },
            async function (accessToken, refreshToken, profile, done) {
                // done(null, profile);
                const newUser = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    avatar: profile.photos[0].value,
                }

                console.log('newUser', newUser);

                try {
                    let user = await User.findOne({googleId: profile.id})

                    if (user) {
                        done(null, user)
                    } else {
                        // user = await User.create(newUser)
                        await user.save();
                        // done(null, user)
                        return {
                            user,
                        }
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        ),
    );

    passport.use(
        new GithubStrategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: "/auth/github/callback",
            },
            async function (accessToken, refreshToken, profile, done) {
                console.log('profile', profile)
                const newUser = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    avatar: profile.photos[0].value,
                }

                console.log('newUser', newUser);

                try {
                    let user = await User.findOne({googleId: profile.id})

                    if (user) {
                        done(null, user)
                    } else {
                        user = await User.create(newUser)
                        // done(null, user)
                        return {
                            user,
                        }
                    }
                } catch (err) {
                    console.error(err)
                }
            }
        )
    );

    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env.FACEBOOK_APP_ID,
                clientSecret: process.env.FACEBOOK_APP_SECRET,
                callbackURL: "/auth/facebook/callback",
            },
            function (accessToken, refreshToken, profile, done) {
                done(null, profile);
            }
        )
    );


    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
    });
}
