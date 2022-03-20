const express = require('express')
const passport = require('passport')
const router = express.Router();

// router.get("/github", passport.authenticate("github", { scope: ["profile", "email"] }));
//
// router.get(
//     "/github/callback",
//     passport.authenticate("github", {
//         successRedirect: 'http://localhost:8080/crm/dashboard',
//         failureRedirect: "/sign-in",
//     })
// );

router.get('/api/getuser', (req, res) => {
    res.send(req.user);
})

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
    '/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: 'http://localhost:8080/crm/dashboard',
        failureRedirect: "/login/failed",
    })
);

module.exports = router
