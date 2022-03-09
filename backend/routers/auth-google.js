const express = require('express')
const passport = require('passport')
const router = express.Router();


router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
    "/github/callback",
    passport.authenticate("github", {
        successRedirect: 'http://localhost:8080/crm/dashboard',
        failureRedirect: "/login/failed",
    })
);

router.get('/api/getuser', (req, res) => {
    res.send(req.user);
})

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: 'http://localhost:8080/crm/dashboard',
        failureRedirect: "/login/failed",
    })
);

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))
router.get(
    '/google/callback',
    passport.authenticate('google', { session: true, failureRedirect: '/sign-in', successRedirect: 'http://localhost:8080/crm/dashboard' }),
    (req, res) => {
        res.redirect('http://localhost:8080/crm/dashboard')
    }
)
router.get("/login/success", (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: "successfull",
            user: req.user,
            cookies: req.cookies
        });
    }
});
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/sign-in')
})

module.exports = router
