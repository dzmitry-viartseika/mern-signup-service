const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require('mongoose');
const Oauth2User = require('../models/oauth2-user-model');

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: '306249750576-0p5omh8fvab00voahj67l3qhq4rak7vc.apps.googleusercontent.com',
                clientSecret: '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',
                callbackURL: '/auth/google/callback',
            },
            accessToken => {
                console.log("access token: ", accessToken);
            },
            function (accessToken, refreshToken, profile, cb) {

                Oauth2User.findOne({ googleId: profile.id }, async (err, doc) => {

                    if (err) {
                        return cb(err, null);
                    }

                    if (!doc) {
                        const newUser = new Oauth2User({
                            googleId: profile.id,
                            username: profile.name.givenName
                        });

                        await newUser.save();
                        cb(null, newUser);
                    }
                    cb(null, doc);
                })


                // const newUser = {
                //     googleId: profile.id,
                //     displayName: profile.displayName,
                //     username: profile.name.givenName,
                //     avatar: profile.photos[0].value,
                // }
                //
                // console.log('newUser', newUser);
                //
                // try {
                //     let user = await Oauth2User.findOne({googleId: profile.id})
                //
                //     if (user) {
                //         done(null, user)
                //     } else {
                //         await newUser.save();
                //         done(null, newUser);
                //     }
                // } catch (err) {
                //     console.error(err)
                // }
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
        Oauth2User.findById(id, (err, user) => done(err, user))
    });
}
