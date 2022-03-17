const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require('mongoose');
const Oauth2User = require('../models/oauth2-user-model');

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: '12221857987-tiubpde8hs8ee34bo4phceo141ph3lq7.apps.googleusercontent.com',
                clientSecret: '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',
                callbackURL: '/auth/google/callback',
            },
            // accessToken => {
            //     console.log("access token: ", accessToken);
            // },
            function (accessToken, refreshToken, profile, cb) {
                Oauth2User.findOne({ googleId: profile.id }, async (err, doc) => {
                    if (err) {
                        return cb(err, null);
                    }

                    if (doc) {
                        return cb(null, doc);
                    }

                    if (!doc) {
                        const newUser = new Oauth2User({
                            googleId: profile.id,
                            username: profile.name.givenName
                        }).save()
                        return cb(newUser);
                    }
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
                    let user = await Oauth2User.findOne({googleId: profile.id})

                    if (user) {
                        done(null, user)
                    } else {
                        user = await Oauth2User.create(newUser)
                        done(null, user)
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
